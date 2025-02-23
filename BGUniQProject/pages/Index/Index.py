from flask import Blueprint, render_template

indexBP = Blueprint(
    'Index',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/Index'
)
@indexBP.route('/homepage')
@indexBP.route('/home')
@indexBP.route('/index')
def index():
    return render_template('Index.html')
