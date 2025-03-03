from flask import Blueprint, render_template, session, request, jsonify, url_for
from BGUniQProject.DBconnector import *

signInPersonalBP = Blueprint(
    'SignInPersonalDetails',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/SignInPersonalDetails'
)

@signInPersonalBP.route('/signin-personal', methods=['GET', 'POST'])
def signin_personal():
    print("Received POST request at /signin-personal")

    if request.method == 'GET':
        return render_template('SignInPersonalDetails.html')
    elif request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        studentID = data.get('studentID')
        firstName = data.get('firstName')
        lastName = data.get('lastName')
        password = data.get('password')
        if not check_if_signed(email):
            session['email'] = email
            session['studentID'] = studentID
            session['firstName'] = firstName
            session['lastName'] = lastName
            session['password'] = password
            return jsonify({'success': True, 'redirect': url_for('SignIn.signin')})
        else:
            return jsonify({'success': False, 'message': 'כתובת המייל כבר שמורה במערכת תחת משתמש קיים :)'})

