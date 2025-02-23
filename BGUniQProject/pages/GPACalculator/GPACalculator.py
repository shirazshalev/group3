from flask import Blueprint, render_template

gpaCalculatorBP = Blueprint(
    'GPACalculator',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/GPACalculator'
)

@gpaCalculatorBP.route('/gpa-calculator')
def gpa_calculator():
    return render_template('GPACalculator.html')