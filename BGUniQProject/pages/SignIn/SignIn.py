from flask import Blueprint, render_template

signInBP = Blueprint(
    'SignIn',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/SignIn'
)

@signInBP.route('/signin', methods = ['GET', 'POST'])
def signin():
    return render_template('SignIn.html')
