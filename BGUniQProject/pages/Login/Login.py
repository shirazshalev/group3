from flask import Blueprint, render_template

loginBP = Blueprint(
    'Login',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/Login'
)

@loginBP.route('/login')
def gpa_calculator():
    return render_template('Login.html')