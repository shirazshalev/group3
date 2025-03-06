from flask import Blueprint, render_template, session, request, jsonify, url_for
from BGUniQProject.DBconnector import *

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
    return render_template('Index.html',
                           firstName=session.get("firstName", ""),
                           totalCredits=session.get("totalCredits", 0),
                           GPAIndicator="{:.2f}".format(session.get("GPAIndicator", 0)),
                           targetGPA="{:.2f}".format(session.get("targetGPA", 85.00)),
                           numberOfCourses=session.get("numberOfCourses", 0))
