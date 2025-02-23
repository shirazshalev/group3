from flask import Blueprint, render_template

futureSemesterCalculatorBP = Blueprint(
    'FutureSemesterCalculator',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/FutureSemesterCalculator'
)

@futureSemesterCalculatorBP.route('/future-semester-calculator')
def future_semester_calculator():
    return render_template('FutureSemesterCalculator.html')
