from flask import Blueprint, render_template, session, request, jsonify, url_for
from BGUniQProject.DBconnector import *

binaryPassCalculatorBP = Blueprint(
    'BinaryPassCalculator',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/BinaryPassCalculator'
)

@binaryPassCalculatorBP.route('/binary-pass-calculator')
def binary_pass_calculator():
    if "email" not in session:
        return "Unauthorized", 401

    # Retrieving student data from the database
    student = StudentsCol.find_one({"Email": session["email"]})
    if not student:
        return "Student not found", 404

    enrollments = student.get("Enrollments", {})

    # Converting the data to a format that fits the template
    courses = []
    for year, semesters in enrollments.items():
        for semester, courses_list in semesters.items():
            for course in courses_list:
                courses.append({
                    "year": year,
                    "semester": semester,
                    "courseName": course["courseName"],
                    "courseCredits": course["courseCredits"],
                    "finalGrade": course["finalGrade"]
                })

    return render_template('BinaryPassCalculator.html',
                           GPAIndicator="{:.2f}".format(session.get("GPAIndicator", 0)),
                           courses=courses)