from flask import Blueprint, render_template, session, request, jsonify, url_for
from BGUniQProject.DBconnector import *

whatIfCalculatorBP = Blueprint(
    'WhatIfCalculator',
    __name__,
    template_folder='Templates',
    static_folder='Static',
    static_url_path='/WhatIfCalculator'
)

@whatIfCalculatorBP.route('/what-if-calculator')
def what_if_calculator():
    return render_template('WhatIfCalculator.html',
                           GPAIndicator="{:.2f}".format(session.get("GPAIndicator", 0)))

