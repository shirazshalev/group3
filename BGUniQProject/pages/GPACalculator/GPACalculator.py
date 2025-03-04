import traceback

from flask import Flask, request, jsonify, session, Blueprint, render_template
from BGUniQProject.DBconnector import StudentsCol, StudyTemplatesCol
import random
import string

gpaCalculatorBP = Blueprint(
    'GPACalculator',
    __name__,
    template_folder='Templates',
    static_folder='Static',
    static_url_path='/GPACalculator'
)


def generate_unique_course_id(existingIDs):
    while True:
        newID = ''.join(random.choices(string.digits, k=8))  # 8-digit random ID
        if newID not in existingIDs:
            return newID

def get_existing_student_course_ids(student):
    existing_student_course_ids = set()
    for year, semesters in student.get("Enrollments", {}).items():
        for semester, studentCourses in semesters.items():
            for studentCourse in studentCourses:
                if "courseID" in studentCourse:
                    existing_student_course_ids.add(studentCourse["courseID"])
    return existing_student_course_ids


def get_existing_template_course_ids(studytemplatedoc):
    existing_template_course_ids = set()
    for templateYear, templateSemesters in studytemplatedoc.get("years", {}).items():
        for templateSemester, templateCourses in templateSemesters.items():
            for templateCourse in templateCourses:
                if "courseID" in templateCourse:
                    existing_template_course_ids.add(templateCourse["courseID"])
    return existing_template_course_ids


@gpaCalculatorBP.route("/gpa-calculator", methods=['GET', 'POST'])
def gpa_calculator():
    if request.method == 'GET':
        return render_template('GPACalculator.html')
    elif request.method == 'POST':
        # Ensure user is logged in before saving data
        print("session details:", session)  # debugging check
        try:
            if "email" not in session:
                return jsonify({"success": False, "message": "User is not logged in"})

            data = request.get_json()
            print(" נתונים שהתקבלו מהלקוח:", data) # debugging check
            studentEmail = session["email"]
            selectedYear = data.get("year")
            selectedSemester = data.get("semester")
            studentCoursesToDB = data.get("courses", [])

            # Validate received data
            if not selectedYear or not selectedSemester or not studentCoursesToDB:
                return jsonify({"success": False, "message": "there is no selected year or semester"})

            # Find the student in the database
            student = StudentsCol.find_one({"Email": studentEmail})
            if not student:
                return jsonify({"success": False, "message": "User not found in the database"})

            # Ensure student has a study template assigned
            studyTemplateName = student.get("StudyTemplate")
            if not studyTemplateName:
                return jsonify({"success": False, "message": "Flexible study template not exists"})

            # Retrieve the study template from the database
            studyTemplateDoc = StudyTemplatesCol.find_one({"_id": studyTemplateName})
            if not studyTemplateDoc:
                return jsonify({"success": False, "message": "Study template not found in the database"})
            # Extract all course IDs in the template the student belongs
            existing_template_course_ids = get_existing_template_course_ids(studyTemplateDoc)

            # Ensure Enrollments structure exists in the student's document
            if "Enrollments" not in student:
                student["Enrollments"] = {}

            # Extract all course IDs in the student enrollments
            existing_student_course_ids = get_existing_student_course_ids(student)

            # Iterate over studentCoursesToDB to validate and process
            for course in studentCoursesToDB:
                print("רשימת הקורסים שהזין הסטודנט במחשבון נק״ז:", studentCoursesToDB) # debugging check
                print("בדיקת ההקורס:", course) # debugging check
                if not isinstance(studentCoursesToDB, list):  # debugging check
                    return jsonify({"success": False, "message": "Invalid course data format"})  # debugging check
                if "name" not in course: # debugging check
                    return jsonify({"success": False, "message": "Missing course name"})  # debugging check
                # courseName = course["name"]
                courseFound = False
                # courseID = None

                # Check if the course exists in the student's study template
                # for year, semesters in studyTemplateDoc.get("years", {}).items():
                #     for semester, studentCourses in semesters.items():
                #         for course in studentCourses:
                #             if course["courseName"] == courseName:
                #                 courseFound = True
                #                 currentCourseID = course["courseID"]
                #                 break
                #     if courseFound:
                #         break
                # if courseFound:
                #     break

                # If the course is not found in the template, generate a new unique ID
                if not courseFound:
                    courseID = generate_unique_course_id(existing_template_course_ids)
                    # Add the course ID to the course details
                    course["courseID"] = courseID

                    # Check if the course already exists in the student's enrollments
                    for existingYear, semesters in student["Enrollments"].items():
                        for existingSemester, enrolledCourses in semesters.items():
                            for enrolledCourse in enrolledCourses:
                                if enrolledCourse["name"] == courseName:
                                    if existingYear == selectedYear and existingSemester == selectedSemester:
                                        # Update existing course with new data
                                        # **Update only specific fields** of the existing course
                                        update_fields = {
                                            "Enrollments.{}.{}.{}.credits".format(selectedYear, selectedSemester,
                                                                                  enrolledCourses.index(
                                                                                      enrolledCourse)):
                                                course["credits"],
                                            "Enrollments.{}.{}.{}.grade".format(selectedYear, selectedSemester,
                                                                                enrolledCourses.index(enrolledCourse)):
                                                course["grade"],
                                            "Enrollments.{}.{}.{}.components".format(selectedYear, selectedSemester,
                                                                                     enrolledCourses.index(
                                                                                         enrolledCourse)): course.get(
                                                "components", {})
                                        }

                                        print("Updating student record with:", update_fields) #debugging check
                                        # Perform the MongoDB update
                                        StudentsCol.update_one(
                                            {"Email": studentEmail},
                                            {"$set": update_fields}
                                        )
                                        return jsonify({"success": True, "message": "Course updated successfully"})
                                    else:
                                        # Course exists in a different semester or year, return an error message
                                        return jsonify({
                                            "success": False,
                                            "conflict": True,
                                            "course": courseName,
                                            "existingYear": existingYear,
                                            "existingSemester": existingSemester
                                        })

                # If the course does not exist, add it under the correct year and semester
            if selectedYear not in student["Enrollments"]:
                student["Enrollments"][selectedYear] = {}
            if selectedSemester not in student["Enrollments"][selectedYear]:
                student["Enrollments"][selectedYear][selectedSemester] = []

            student["Enrollments"][selectedYear][selectedSemester].extend(studentCoursesToDB)
            StudentsCol.update_one({"Email": studentEmail}, {"$set": {"Enrollments": student["Enrollments"]}})

            return jsonify({"success": True, "message": "Courses saved successfully"})

        except Exception as e:
            print("Error occurred:", str(e))
            traceback.print_exc()
            return jsonify({"success": False, "message": "Internal server error"}), 500
