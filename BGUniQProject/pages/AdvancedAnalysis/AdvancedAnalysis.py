from flask import Blueprint, render_template, session, jsonify
from BGUniQProject.DBconnector import get_user_by_email
from BGUniQProject.pages.AcademicPerformanceAnalysis.AcademicPerformanceAnalysis import is_enrollments_empty

advancedAnalysisBP = Blueprint(
    'AdvancedAnalysis',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/AdvancedAnalysis'
)

@advancedAnalysisBP.route('/advanced-analysis')
def advanced_analysis():
    return render_template('AdvancedAnalysis.html')

@advancedAnalysisBP.route('/get-enrollments-to-advanced-analysis', methods=['GET'])
def get_enrollments_to_advanced_analysis():
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
            "enrollments_advanced": enrollments,
            "message": "טרם הזנת קורסים! כדי להתחיל הוסף קורסים במחשבון נק״ז ולאחר מכן תוכל לצפות בביצועים שלך כאן! :) "
        })

    return jsonify({
        "success": True,
        "enrollments_advanced": enrollments,
        "message": "Data from the DB retrieved successfully"
    })

