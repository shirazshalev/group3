from flask import Blueprint, render_template, session, request, jsonify, url_for
from BGUniQProject.DBconnector import *

whatIfCalculatorBP = Blueprint(
    'WhatIfCalculator',
    __name__,
    template_folder='Templates',
    static_folder='Static',
    static_url_path='/WhatIfCalculator'
)

@whatIfCalculatorBP.route('/what-if-calculator')
def what_if_calculator():
    # Retrieving the student's courses from the session
    student_courses = []
    enrollments = session.get("enrollments", {})

    for year, semesters in enrollments.items():
        for semester, courses in semesters.items():
            for course in courses:
                student_courses.append({
                    "id": course.get("courseID"),
                    "name": course.get("courseName"),
                    "credits": course.get("courseCredits"),
                    "grade": course.get("finalGrade")
                })

    return render_template('WhatIfCalculator.html',
                           GPAIndicator="{:.2f}".format(session.get("GPAIndicator", 0)),
                           studentCourses=student_courses)

@whatIfCalculatorBP.route('/get-student-courses', methods=['GET'])
def get_student_courses():
    if "email" not in session:
        return jsonify({"success": False, "message": "User is not logged in"}), 401

    student_courses = []
    enrollments = session.get("enrollments", {})

    for year, semesters in enrollments.items():
        for semester, courses in semesters.items():
            for course in courses:
                student_courses.append({
                    "id": course.get("courseID"),
                    "name": course.get("courseName"),
                    "credits": course.get("courseCredits"),
                    "grade": course.get("finalGrade")
                })

    return jsonify({"success": True, "courses": student_courses})