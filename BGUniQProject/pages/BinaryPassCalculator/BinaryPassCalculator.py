from flask import Blueprint, render_template, session, request, jsonify, url_for
from BGUniQProject.DBconnector import *

binaryPassCalculatorBP = Blueprint(
    'BinaryPassCalculator',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/BinaryPassCalculator'
)

@binaryPassCalculatorBP.route('/binary-pass-calculator')
def binary_pass_calculator():
    return render_template('BinaryPassCalculator.html',
                           GPAIndicator="{:.2f}".format(session.get("GPAIndicator", 0)))
