from flask import Blueprint, render_template

ForgotMyPasswordBP = Blueprint(
    'ForgotMyPassword',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/ForgotMyPassword'
)

@ForgotMyPasswordBP.route('/forgot-my-password')
def gpa_calculator():
    return render_template('ForgotMyPassword.html')