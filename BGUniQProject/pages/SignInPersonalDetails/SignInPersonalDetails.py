from flask import Blueprint, render_template

signInPersonalBP = Blueprint(
    'SignInPersonalDetails',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/SignInPersonalDetails'
)

@signInPersonalBP.route('/signin-personal')
def signin_personal():
    return render_template('SignInPersonalDetails.html')

