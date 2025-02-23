from flask import Blueprint, render_template

binaryPassCalculatorBP = Blueprint(
    'BinaryPassCalculator',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/BinaryPassCalculator'
)

@binaryPassCalculatorBP.route('/binary-pass-calculator')
def binary_pass_calculator():
    return render_template('BinaryPassCalculator.html')
