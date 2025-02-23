from flask import Blueprint, render_template

yearSemesterSelectionBP = Blueprint(
    'YearSemesterSelection',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/YearSemesterSelection'
)

@yearSemesterSelectionBP.route('/year-semester-selection')
def year_semester_selection():
    return render_template('YearSemesterSelection.html')


