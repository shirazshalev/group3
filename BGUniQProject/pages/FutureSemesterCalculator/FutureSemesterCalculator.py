from flask import Blueprint, render_template, session, request, jsonify, url_for
from BGUniQProject.DBconnector import *

futureSemesterCalculatorBP = Blueprint(
    'FutureSemesterCalculator',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/FutureSemesterCalculator'
)

@futureSemesterCalculatorBP.route('/future-semester-calculator')
def future_semester_calculator():
    return render_template('FutureSemesterCalculator.html',
                           GPAIndicator="{:.2f}".format(session.get("GPAIndicator", 0)),
                           targetGPA="{:.2f}".format(session.get("targetGPA", 85.00)))
