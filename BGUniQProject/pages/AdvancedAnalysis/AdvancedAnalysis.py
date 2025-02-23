from flask import Blueprint, render_template

advancedAnalysisBP = Blueprint(
    'AdvancedAnalysis',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/AdvancedAnalysis'
)

@advancedAnalysisBP.route('/advanced-analysis')
def advanced_analysis():
    return render_template('AdvancedAnalysis.html')
