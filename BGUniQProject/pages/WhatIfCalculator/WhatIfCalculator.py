from flask import Blueprint, render_template

whatIfCalculatorBP = Blueprint(
    'WhatIfCalculator',
    __name__,
    template_folder='Templates',
    static_folder='Static',
    static_url_path='/WhatIfCalculator'
)

@whatIfCalculatorBP.route('/what-if-calculator')
def what_if_calculator():
    return render_template('WhatIfCalculator.html')


