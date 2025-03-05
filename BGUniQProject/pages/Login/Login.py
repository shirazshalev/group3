from flask import Blueprint, render_template, session, request, jsonify, url_for
from BGUniQProject.DBconnector import *

loginBP = Blueprint(
    'Login',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/Login'
)

@loginBP.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('Login.html')
    elif request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        studentID = data.get('studentID')
        if check_if_signed(email):
            user = get_user_by_email(email)
            if user['StudentID'] == studentID and user['Password'] == password:
                session['email'] = email
                session['firstName'] = user['FirstName']
                session['loggedIn'] = True

                session['studyTemplateName'] = user.get('StudyTemplate')
                study_template = StudyTemplatesCol.find_one({"_id": session['studyTemplateName']})
                if study_template:
                    session['studyTemplate'] = study_template
                else:
                    session['studyTemplate'] = {}

                session['enrollments'] = user.get('Enrollments', {})

                return jsonify({'success': True, 'redirect': url_for('Index.index')})
            else:
                return jsonify({'success': False, 'message': 'מספר ת.ז או סיסמה שגויים, אנא נסה שנית :)'})
        else:
            return jsonify({'success': False, 'message': 'המשתמש אינו קיים, יש ליצור חשבון על מנת להתחבר :)'})

