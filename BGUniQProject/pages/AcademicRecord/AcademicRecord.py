from flask import Blueprint, render_template

academicRecordBP = Blueprint(
    'AcademicRecord',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/AcademicRecord'
)

@academicRecordBP.route('/academic-record')
def academic_record():
    return render_template('AcademicRecord.html')
