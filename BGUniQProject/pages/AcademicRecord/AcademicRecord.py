from flask import Blueprint, render_template, session

academicRecordBP = Blueprint(
    'AcademicRecord',
    __name__,
    template_folder = 'Templates',
    static_folder = 'Static',
    static_url_path = '/AcademicRecord'
)

@academicRecordBP.route('/academic-record')
def academic_record():
    enrollments = session.get('enrollments', {})

    # Check if there are no courses at all
    has_courses = any(
        semester_courses
        for year_data in enrollments.values()
        for semester_courses in year_data.values()
    )

    return render_template(
        'AcademicRecord.html',
        enrollments=enrollments,
        has_courses=has_courses,
        totalCredits=session.get("totalCredits", 0),
        GPAIndicator="{:.2f}".format(session.get("GPAIndicator", 0)),
        targetGPA="{:.2f}".format(session.get("targetGPA", 85.00)),
        numberOfCourses=session.get("numberOfCourses", 0)
    )
