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


@gpaCalculatorBP.route("/gpa-calculator", methods=['GET', 'POST'])
def gpa_calculator():
    if request.method == 'GET':
        return render_template('GPACalculator.html')
    elif request.method == 'POST':
        # Ensure user is logged in before saving data
        if "email" not in session:
            return jsonify({"success": False, "message": "User is not logged in"})

        data = request.get_json()
        studentEmail = session["email"]
        selectedYear = data.get("year")
        selectedSemester = data.get("semester")
        courses = data.get("courses", [])

        # Validate received data
        if not selectedYear or not selectedSemester or not courses:
            return jsonify({"success": False, "message": "Missing data"})

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

        # Extract all course IDs in the template
        existing_template_course_ids = set()
        for year, semesters in studyTemplateDoc.get("years", {}).items():
            for semester, courses in semesters.items():
                for course in courses:
                    existing_template_course_ids.add(course["courseID"])

        # Ensure Enrollments structure exists in the student's document
        if "Enrollments" not in student:
            student["Enrollments"] = {}

        # Iterate over courses to validate and process
        for course in courses:
            courseName = course["name"]
            courseFound = False
            courseID = None

            # Check if the course exists in the student's study template
            for year, semesters in studyTemplateDoc.get("years", {}).items():
                for semester, courses in semesters.items():
                    for course in courses:
                        if course["courseName"] == courseName:
                            courseFound = True
                            courseID = course["courseID"]
                            break
                if courseFound:
                    break
            if courseFound:
                break

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
                                        "Enrollments.{}.{}.{}.credits".format(selectedYear, selectedSemester,enrolledCourses.index(enrolledCourse)): course["credits"],
                                        "Enrollments.{}.{}.{}.grade".format(selectedYear, selectedSemester,enrolledCourses.index(enrolledCourse)): course["grade"],
                                        "Enrollments.{}.{}.{}.components".format(selectedYear, selectedSemester, enrolledCourses.index(enrolledCourse)): course.get("components", {})
                                    }

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

        student["Enrollments"][selectedYear][selectedSemester].extend(courses)
        StudentsCol.update_one({"Email": studentEmail}, {"$set": {"Enrollments": student["Enrollments"]}})

        return jsonify({"success": True, "message": "Courses saved successfully"})
