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
        student_id= data.get('studentID')
        if check_if_signed(email):
            user = get_user_by_email(email)
            if user['studentID'] == student_id and user['Password'] == password:
                session['email'] = email
                session['first_name'] = user['FirstName']
                session['logged_in'] = True
                return jsonify({'success': True, 'redirect': url_for('Index.index')})
            else:
                return jsonify({'success': False, 'message': 'מספר ת.ז או סיסמה שגויים, אנא נסה שנית :)'})
        else:
            return jsonify({'success': False, 'message': 'המשתמש אינו קיים, יש ליצור חשבון על מנת להתחבר :)'})

