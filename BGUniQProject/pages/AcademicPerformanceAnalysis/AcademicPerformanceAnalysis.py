from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify

from BGUniQProject.DBconnector import get_user_by_email

academicPerformanceAnalysisBP = Blueprint(
    'AcademicPerformanceAnalysis',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/AcademicPerformanceAnalysis'
)

@academicPerformanceAnalysisBP.route('/academic-performance-analysis')
def academic_performance_analysis():
    return render_template('AcademicPerformanceAnalysis.html')

# using session flask
# @academicPerformanceAnalysisBP.route('/get-enrollments', methods=['GET'])
# def get_enrollments():
#     enrollments = session.get("enrollments", {})
#     return jsonify({
#         "success": bool(enrollments),
#         "enrollments": enrollments,
#         "message": "No enrollment data found in session" if not enrollments else "Data retrieved successfully"
#     })

# function to check if the user add courses or not yet
def is_enrollments_empty(enrollments):
    for year in enrollments.values():
        for semester in year.values():
            if semester:
                return False
    return True

# using mongoDB
@academicPerformanceAnalysisBP.route('/get-enrollments', methods=['GET'])
def get_enrollments():
    email = session.get("email")
    if not email:
        return jsonify({"success": False, "message": "No email found in session"}), 400

    user = get_user_by_email(email)
    if not user:
        return jsonify({"success": False, "message": "User not found in database"}), 404

    enrollments = user.get("Enrollments", {})
    if is_enrollments_empty(enrollments): #the user doesn't add courses yet in gpacalculator
        return jsonify({
            "success": True,
            "enrollments": enrollments,
            "message": "טרם הזנת קורסים! כדי להתחיל הוסף קורסים במחשבון נק״ז ולאחר מכן תוכל לצפות בביצועים שלך כאן! :) "
        })

    return jsonify({
        "success": True,
        "enrollments": enrollments,
        "message": "Data from the DB retrieved successfully"
    })


