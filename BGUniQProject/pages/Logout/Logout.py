from flask import Blueprint, session, url_for, redirect

logoutBP = Blueprint(
    'Logout',
    __name__,
    template_folder='Templates',
    static_folder='Static',
    static_url_path='/Logout'
)

@logoutBP.route('/logout', methods=['GET', 'POST'])
def logout():
    session.clear()
    return redirect(url_for('Login.login'))
