from flask import Blueprint, render_template, session, request, jsonify, url_for
from BGUniQProject.DBconnector import *

yearSemesterSelectionBP = Blueprint(
    'YearSemesterSelection',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/YearSemesterSelection'
)

@yearSemesterSelectionBP.route('/year-semester-selection', methods = ['GET', 'POST'])
def year_semester_selection():
    if request.method == 'GET':
        return render_template('YearSemesterSelection.html')
    elif request.method == 'POST':
        data = request.get_json()

        session['contractYear'] = data.get('contractYear')
        session['currentSemester'] = data.get('currentSemester')

        # Trying to create a new user
        try:
            create_student_user(session.get('studentID'), session.get('firstName'), session.get('lastName'),
                                session.get('password'), session.get('email'), session.get('degree'), session.get('department'),
                                session.get('template'), session.get('contractYear'), session.get('currentSemester')
            )
            # session.clear()
            keys_to_remove = ['studentID', 'firstName', 'lastName', 'password', 'degree', 'department', 'template', #delete everything except the email
                              'contractYear', 'currentSemester']
            for key in keys_to_remove:
                session.pop(key, None)

            return jsonify({'success': True, 'redirect': url_for('GPACalculator.gpa_calculator')})
        except Exception as e:
            return jsonify({'success': False, 'message': f"שגיאה ביצירת החשבון: {str(e)}"})
