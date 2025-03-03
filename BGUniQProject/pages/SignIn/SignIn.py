from flask import Blueprint, render_template, session, request, jsonify, url_for
from BGUniQProject.DBconnector import *

signInBP = Blueprint(
    'SignIn',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/SignIn'
)

@signInBP.route('/signin', methods = ['GET', 'POST'])
def signin():
    if request.method == 'GET':
        return render_template('SignIn.html')
    elif request.method == 'POST':
        data = request.get_json()

        degree = data.get('degree')
        department = data.get('department')
        template = data.get('template')
        academicYear = data.get('academicYear')
        currentSemester = data.get('currentSemester')

        session['degree'] = degree
        session['department'] = department
        session['template'] = template
        session['academicYear'] = academicYear
        session['currentSemester'] = currentSemester

        return jsonify({'success': True, 'redirect': url_for('YearSemesterSelection.year_semester_selection')})
