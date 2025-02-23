from flask import Blueprint, render_template

academicPerformanceAnalysisBP = Blueprint(
    'AcademicPerformanceAnalysis',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/AcademicPerformanceAnalysis'
)

@academicPerformanceAnalysisBP.route('/academic-performance-analysis')
def academic_performance_analysis():
    return render_template('AcademicPerformanceAnalysis.html')
