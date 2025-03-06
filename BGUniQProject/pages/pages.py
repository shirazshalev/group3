from flask import jsonify, session, Blueprint
from BGUniQProject.DBconnector import *

metricsBP = Blueprint('metrics', __name__)

@metricsBP.route('/get-student-metrics', methods=['GET'])
def get_student_metrics():
    if "email" not in session:
        return jsonify({"error": "User not logged in"}), 401

    update_student_enrollments(session["email"])

    update_student_metrics(session["email"])

    return jsonify({
        "totalCredits": session.get("totalCredits", 0),
        "GPAIndicator": "{:.2f}".format(session.get("GPAIndicator", 0)),
        "targetGPA": "{:.2f}".format(session.get("targetGPA", 85.00)),
        "numberOfCourses": session.get("numberOfCourses", 0)
    })

