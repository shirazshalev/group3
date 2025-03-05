import traceback
from flask import Flask, request, jsonify, session, Blueprint, render_template
from BGUniQProject.DBconnector import StudentsCol, StudyTemplatesCol
import random
import string

gpaCalculatorBP = Blueprint(
    'GPACalculator',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/GPACalculator'
)


def get_list_of_courses_id_from_template_collection(study_template_document):
    courses_id_from_template = []
    for year, semesters in study_template_document.get("years", {}).items():
        for semester, courses in semesters.items():
            for course in courses:
                if "courseID" in course and "courseName" in course:
                    courses_id_from_template.append({"courseID": course["courseID"], "courseName": course["courseName"]})
    return courses_id_from_template

def get_list_of_courses_id_from_user_previous_courses(user):
    courses_id_from_user = []
    for year, semesters in user.get("Enrollments", {}).items():
        for semester, studentCourses in semesters.items():
            for studentCourse in studentCourses:
                if "courseID" in studentCourse and "courseName" in studentCourse:
                    courses_id_from_user.append({"courseID": studentCourse["courseID"], "courseName": studentCourse["courseName"]})
    return courses_id_from_user

def generate_unique_course_id(existing_ids):
    while True:
        new_id = str(random.randint(10000000, 99999999)) # 8-digit random ID
        if new_id not in existing_ids:
            return new_id
        # newID = ''.join(random.choices(string.digits, k = 8))  # 8-digit random ID

# map {"id number" : "course name",...}
def map_course_names_to_ids(study_template):
    course_map = {}
    for year, semesters in study_template.get("years", {}).items():
        for semester, courses in semesters.items():
            for course in courses:
                course_map[course["courseName"]] = course["courseID"]
    return course_map

# Adding an ID number according to the study template
# Retrieving courseID from the template, if the NOT exists entering a fictitious number
def assign_course_ids_to_user_courses(user_courses, study_template, student):
    course_map = map_course_names_to_ids(study_template)
    existing_ids = set(course_map.values()) # All the id numbers
    student_courses = get_list_of_courses_id_from_user_previous_courses(student)

    existing_student_courses_map = {c["courseName"]: c["courseID"] for c in student_courses}

    for course in user_courses:
        course_name = course.get("courseName") # name is the course's name from Frontend

        if course_name in existing_student_courses_map:
            course["courseID"] = existing_student_courses_map[course_name]
        elif course_name in course_map:
            course["courseID"] = course_map[course_name]
        else:
            course["courseID"] = generate_unique_course_id(existing_ids)
            existing_ids.add(course["courseID"]) # To prevent duplication of the random numbers

    return user_courses


@gpaCalculatorBP.route("/gpa-calculator", methods=['GET'])
def gpa_calculator_page():
    # loading GPA page from Index
    return render_template('GPACalculator.html')


@gpaCalculatorBP.route("/get-study-template", methods=['GET'])
def get_study_template():
    try:
        if "email" not in session:
            return jsonify({"success": False, "message": "User is not logged in"})

        student_email = session["email"]
        student = StudentsCol.find_one({"Email": student_email})

        if not student:
            return jsonify({"success": False, "message": "User not found in the database"})

        study_template_name = student.get("StudyTemplate")
        if not study_template_name:
            return jsonify({"success": False, "message": "Study template not found"})

        study_template_document = StudyTemplatesCol.find_one({"_id": study_template_name})

        if not study_template_document:
            return jsonify({"success": False, "message": "Study template not found in the database"})

        return jsonify({"success": True, "study_template": study_template_document})

    except Exception as e:
        print("Error occurred:", str(e))
        traceback.print_exc()
        return jsonify({"success": False, "message": "Internal server error"}), 500


@gpaCalculatorBP.route("/gpa-calculator/<string:selectedYear>/<string:selectedSemester>", methods=['GET', 'POST'])
def gpa_calculator(selectedYear, selectedSemester):
    if request.method == 'GET':
        return render_template('GPACalculator.html')
    elif request.method == 'POST':
        # Ensure user is logged in before saving data
        print("session details:", session)  # debugging check
        try:
            if "email" not in session:
                return jsonify({"success": False, "message": "User is not logged in"})

            data = request.get_json() # Retrieve the data sent from the frontend
            print(" הנתונים שהתקבלו מהלקוח:", data) # debugging check
            student_email = session["email"]
            studentCoursesToDB = data.get("courses", [])

            # Validate received data
            if not selectedYear or not selectedSemester or not studentCoursesToDB:
                return jsonify({"success": False, "message": "Missing data"})

            # Retrieve the student's record from the database
            student = StudentsCol.find_one({"Email": student_email})
            if not student:
                return jsonify({"success": False, "message": "User not found in the database"})

            # Ensure student has a study template assigned
            study_template_name = student.get("StudyTemplate")
            if not study_template_name:
                return jsonify({"success": False, "message": "Study template not found in the database"})

            # Retrieve the study template from the database
            study_template_document = StudyTemplatesCol.find_one({"_id": study_template_name})
            if not study_template_document:
                return jsonify({"success": False, "message": "Student's template is not found in the templatesCol (Flexible)"})

            # Ensure Enrollments structure exists in the student's document
            if "Enrollments" not in student:
                student["Enrollments"] = {}

            # Get the student's Enrollment data
            enrollments = student.get("Enrollments", {})

            updated = False

            # Extract all courses names and IDs from the template the student belongs
            courses_id_from_template = get_list_of_courses_id_from_template_collection(study_template_document)
            # Extract all course names and IDs from the user's enrollments
            existing_student_course_ids = get_list_of_courses_id_from_user_previous_courses(student)

            student_courses_to_db_with_id = assign_course_ids_to_user_courses(studentCoursesToDB, study_template_document, student)

            # Iterate over studentCoursesToDB to validate and process
            for course in student_courses_to_db_with_id:
                print("רשימת הקורסים שהזין הסטודנט במחשבון נק״ז:", student_courses_to_db_with_id) # debugging check
                print("בדיקת ההקורס:", course) # debugging check
                if not isinstance(student_courses_to_db_with_id, list):  # debugging check
                    return jsonify({"success": False, "message": "Invalid course data format"})  # debugging check
                if "courseName" not in course: # debugging check
                    return jsonify({"success": False, "message": "Missing course name"})  # debugging check

                course_id = course["courseID"]  # The unique course ID
                course_name = course["courseName"]  # The course name
                credits = course["courseCredits"]  # The number of credits
                grade = course["finalGrade"]  # The final grade

                # Variables to store existing course data (if found)
                existing_course = None
                existing_year = None
                existing_semester = None

                # Check if the course is already in the student's Enrollment
                for year, semesters in enrollments.items():
                    for semester, courses in semesters.items():
                        for existing in courses:
                            if existing["courseID"] == course_id and existing["courseName"] == course_name:
                                existing_course = existing
                                existing_year = year
                                existing_semester = semester
                                print("הקורס קיים כבר")
                                break  # Exit the loop once the course is found

                # If the course is already in the selected year and semester, update if necessary
                if existing_course and existing_year == selectedYear and existing_semester == selectedSemester:
                    # Check if the credits or grade need updating
                    if existing_course["courseCredits"] != credits or existing_course["finalGrade"] != grade:
                        existing_course["courseCredits"] = credits  # Update credits
                        existing_course["finalGrade"] = grade  # Update grade
                        print("יש את הקורס הזה כבר בשנה ובסמסטר- עידכון")
                        updated = True  # Mark as updated

                # If the course exists but in a different year/semester, return an error message
                elif existing_course and (existing_year != selectedYear or existing_semester != selectedSemester):
                    print("יש את הקורס הזה בשנה או סמסטר אחרים ולא נזין שוב")
                    return jsonify({
                        "success": False,
                        "conflict": True,
                        "existing_course": course_name,
                        "existing_year": existing_year,
                        "existing_semester": existing_semester,
                        "message": f"The course '{course_name}' is already registered under year {existing_year} and semester {existing_semester}. Please delete or choose another course."
                    })

                # If the course is not found in the enrollment, add it to the selected year and selected semester
                else:
                    if selectedYear not in enrollments:
                        enrollments[selectedYear] = {}  # Create the year entry if it doesn't exist
                    if selectedSemester not in enrollments[selectedYear]:
                        enrollments[selectedYear][selectedSemester] = []  # Create the semester entry if it doesn't exist

                    # Add the new course to the selected year and semester
                    # enrollments[selectedYear][selectedSemester].append(course)
                    # updated = True  # Mark as updated
                    if course_id not in [c["courseID"] for c in enrollments.get(selectedYear, {}).get(selectedSemester, [])]:
                        enrollments[selectedYear][selectedSemester].append(course)
                        print("נתוני קורס חדשים לגמרי")
                        updated = True  # Mark as updated
                    else:
                        print(
                            f"הקורס {course_name} כבר קיים בשנה {selectedYear} ובסמסטר {selectedSemester}, לא נוסף שוב")

            # If updates were made, save everything at once
            if updated:
                StudentsCol.update_one(
                    {"Email": student_email},
                    {"$set": {"Enrollments": enrollments}}
                )
                print("הכנסת נתונים לבסיס נתונים ישששש")
                return jsonify({"success": True, "message": "Courses saved/updated successfully!"})

            print("לא אמורים להכניס את הנתונים לבסיס נתונים")
            return jsonify({"success": True, "message": "No changes detected, nothing to update."})

        except Exception as e:
            print("Error occurred:", str(e))
            traceback.print_exc()
            return jsonify({"success": False, "message": "Internal server error"}), 500


@gpaCalculatorBP.route("/gpa-calculator/<string:selectedYear>/<string:selectedSemester>", methods=['DELETE'])
def delete_course(selectedYear, selectedSemester):
    try:
        if "email" not in session:
            return jsonify({"success": False, "message": "User is not logged in"})

        data = request.get_json()
        course_name = data.get("courseName")

        if not course_name:
            return jsonify({"success": False, "message": "Missing course name"}), 400

        student_email = session["email"]
        student = StudentsCol.find_one({"Email": student_email})

        if not student:
            return jsonify({"success": False, "message": "User not found in the database"})

        enrollments = student.get("Enrollments", {})

        if selectedYear not in enrollments or selectedSemester not in enrollments[selectedYear]:
            return jsonify({"success": False, "message": "Year or semester not found"})

        original_length = len(enrollments[selectedYear][selectedSemester])
        enrollments[selectedYear][selectedSemester] = [
            course for course in enrollments[selectedYear][selectedSemester] if course["courseName"] != course_name
        ]

        if len(enrollments[selectedYear][selectedSemester]) == original_length:
            return jsonify({"success": False, "message": "Course not found in the selected semester"})

        if not enrollments[selectedYear][selectedSemester]:
            enrollments[selectedYear][selectedSemester] = []

        StudentsCol.update_one(
            {"Email": student_email},
            {"$set": {"Enrollments": enrollments}}
        )

        return jsonify({"success": True, "message": f"Course '{course_name}' deleted successfully from {selectedYear} {selectedSemester}."})

    except Exception as e:
        print("Error occurred while deleting course:", str(e))
        traceback.print_exc()
        return jsonify({"success": False, "message": "Internal server error"}), 500
