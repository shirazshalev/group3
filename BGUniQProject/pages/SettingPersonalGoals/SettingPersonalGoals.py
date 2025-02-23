from flask import Blueprint, render_template

settingPersonalGoalsBP = Blueprint(
    'SettingPersonalGoals',
    __name__,
    template_folder = 'Templates',
    static_folder='Static',
    static_url_path='/SettingPersonalGoals'
)

@settingPersonalGoalsBP.route('/personal-goals')
def setting_personal_goals():
    return render_template('SettingPersonalGoals.html')
