from flask import Flask, redirect, render_template
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'default_secret_key')
print("SECRET_KEY Loaded:", app.secret_key)

@app.route('/login')
@app.route('/')
def home():
    return render_template('Login.html')

# Login
from pages.Login.Login import (loginBP)
app.register_blueprint(loginBP)

# ForgotMyPassword
from pages.ForgotMyPassword.ForgotMyPassword import (ForgotMyPasswordBP)
app.register_blueprint(ForgotMyPasswordBP)

# Navigation
from components.Navigation.Navigation import (navigationBP)
app.register_blueprint(navigationBP)

# Footer
from components.Footer.Footer import (footerBP)
app.register_blueprint(footerBP)

# SighIn
from pages.SignIn.SignIn import signInBP
app.register_blueprint(signInBP)

# SignInPersonalDetails
from pages.SignInPersonalDetails.SignInPersonalDetails import signInPersonalBP
app.register_blueprint(signInPersonalBP)

# Index: Pages -> Index -> Index.py -> import Blueprint named indexBP ->
from pages.Index.Index import indexBP
app.register_blueprint(indexBP)

# GPACalculator
from pages.GPACalculator.GPACalculator import gpaCalculatorBP
app.register_blueprint(gpaCalculatorBP)

# AcademicRecord
from pages.AcademicRecord.AcademicRecord import academicRecordBP
app.register_blueprint(academicRecordBP)

# WhatIfCalculator
from pages.WhatIfCalculator.WhatIfCalculator import whatIfCalculatorBP
app.register_blueprint(whatIfCalculatorBP)

# SettingPersonalGoals
from pages.SettingPersonalGoals.SettingPersonalGoals import settingPersonalGoalsBP
app.register_blueprint(settingPersonalGoalsBP)

# BinaryPassCalculator
from pages.BinaryPassCalculator.BinaryPassCalculator import binaryPassCalculatorBP
app.register_blueprint(binaryPassCalculatorBP)

# FutureSemesterCalculator
from pages.FutureSemesterCalculator.FutureSemesterCalculator import futureSemesterCalculatorBP
app.register_blueprint(futureSemesterCalculatorBP)

# AcademicPerformanceAnalysis
from pages.AcademicPerformanceAnalysis.AcademicPerformanceAnalysis import academicPerformanceAnalysisBP
app.register_blueprint(academicPerformanceAnalysisBP)

# AdvancedAnalysis
from pages.AdvancedAnalysis.AdvancedAnalysis import advancedAnalysisBP
app.register_blueprint(advancedAnalysisBP)

# YearSemesterSelection
from pages.YearSemesterSelection.YearSemesterSelection import yearSemesterSelectionBP
app.register_blueprint(yearSemesterSelectionBP)

# logout
from pages.Logout.Logout import logoutBP
app.register_blueprint(logoutBP)

if __name__ == '__main__':
   app.run(debug = True)
