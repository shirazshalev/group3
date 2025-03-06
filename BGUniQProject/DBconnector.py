import os
# import certifi  # SHIRAZ
import pymongo
from flask import session
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
from BGUniQProject.utilities.db.studyTemplatesData import StudyTemplatesDict

# Load environment variables from a .env file
load_dotenv()

# Get the URI
# uri = os.environ.get('DB_URI')
uri = os.getenv("DB_URI")

# Send a ping to confirm a successful connection
# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)

# Create a new client (cluster) and connect to the server
# YUVAL
cluster = MongoClient(uri, server_api=ServerApi('1'))
# SHIRAZ
# cluster = MongoClient(uri, server_api=ServerApi('1'), tlsCAFile=certifi.where())
BGUniQDB = cluster['BGUniQDB']

# Define Collections
StudentsCol = BGUniQDB['Students']
StudyTemplatesCol = BGUniQDB['StudyTemplates']


def create_study_templates_collection(StudyTemplatesDict, StudyTemplatesCol):
    if not StudyTemplatesDict:
        print("The dictionary is empty")
        return

    documents = [{"templateName": key, **value} for key, value in StudyTemplatesDict.items()]
    try:
        # trying insert the Documents to the collection
        result = StudyTemplatesCol.insert_many(documents)
        print(f"{len(result.inserted_ids)} added successfully")
    except Exception as e:
        print(f"error-The documents were not{e}")


# Insert Data:
if StudyTemplatesCol.count_documents({}) == 0:
    create_study_templates_collection(StudyTemplatesDict, StudyTemplatesCol)
    print("StudyTemplates were added successfully to the collection")
else:
    print("The templates already exist in the collection")


# Get:
def get_study_templates_col():
    return StudyTemplatesCol


# Update collections:


# Students' collection - all necessary functions
def get_list_of_students():
    return list(StudentsCol.find())


def update_student(StudentDict):
    StudentsCol.update_one(StudentDict, True)


# StudyTemplates' Collection - all necessary functions
def get_list_of_study_templates():
    return list(StudyTemplatesCol.find())


def insert_study_template(StudyTemplateDict):
    StudyTemplatesCol.insert_one(StudyTemplateDict)


def update_study_template(StudyTemplateDict):
    StudyTemplatesCol.update_one(StudyTemplateDict, True)


# Creating a new Student-User after the signup
def create_student_user(StudentID, FirstName, LastName, Password, Email, Degree, Department, StudyTemplate,
                        ContractYear, CurrentSemester, AcademicYear):
    newUser = {
        "StudentID": StudentID,
        "FirstName": FirstName,
        "LastName": LastName,
        "Password": Password,
        "Email": Email,
        "Degree": Degree,
        "Department": Department,
        "StudyTemplate": StudyTemplate,
        "ContractYear": ContractYear,
        "CurrentSemester": CurrentSemester,
        "AcademicYear": AcademicYear,
        "Enrollments": {
            "yearA": {
                "semesterA": [],
                "semesterB": [],
                "semesterC": []
            },
            "yearB": {
                "semesterA": [],
                "semesterB": [],
                "semesterC": []
            },
            "yearC": {
                "semesterA": [],
                "semesterB": [],
                "semesterC": []
            },
            "yearD": {
                "semesterA": [],
                "semesterB": [],
                "semesterC": []
            }
        },
        "PersonalGoals": [{"TargetGPA": 85.00}]
    }
    StudentsCol.insert_one(newUser)


# USERS
def get_user_by_email(email):
    try:
        user = StudentsCol.find_one({'Email': email})
        if user:
            print(f"User found: {user}")  # Debugging statement
        else:
            print("User not found")  # Debugging statement
        return user
    except Exception as e:
        print(f"An error occurred: {e}")
        return None


def check_if_signed(email):
    return get_user_by_email(email) is not None


# def delete_user_by_email(email):
#     try:
#         user = StudentsCol.find_one({'Email': email})
#         if not user:
#             print("User doesn't exist")
#             return False
#         result = StudentsCol.delete_one({'Email': email})
#         if result.deleted_count > 0:
#             print("User deleted successfully")
#             return True
#         else:
#             return False
#     except Exception as e:
#         print(f"error during deletion: {e}")
#         return False

# Function for update user's enrollments session:
def update_student_enrollments(email):
    user = get_user_by_email(email)
    if user:
        session['enrollments'] = user.get('Enrollments', {})

# Indicators Calculations:
# Calculating totalCredits (by sum of all credits):
def calculate_total_credits(email):
    user = get_user_by_email(email)
    if not user:
        return 0
    enrollments = user.get("Enrollments", {})
    total_credits = sum(
        course["courseCredits"]
        for year in enrollments.values()
        for semester in year.values()
        for course in semester
        if "courseCredits" in course
    )
    return total_credits

# Calculating GPAIndicator (Grade Average):
def calculate_gpa_indicator(email):
    user = get_user_by_email(email)
    if not user:
        return 0
    enrollments = user.get("Enrollments", {})

    total_weighted_grades = 0
    total_credits = 0

    for year in enrollments.values():
        for semester in year.values():
            for course in semester:
                if "courseCredits" in course and "finalGrade" in course:
                    credits = course["courseCredits"]
                    grade = course["finalGrade"]
                    total_weighted_grades += credits * grade
                    total_credits += credits

    return round(total_weighted_grades / total_credits, 2) if total_credits > 0 else 0

# Retrieving the student's targetGPA:
def get_target_gpa(email):
    user = get_user_by_email(email)
    if not user:
        return None
    personal_goals = user.get("PersonalGoals", [])

    return personal_goals[0].get("TargetGPA") if personal_goals else None

# Calculating numberOfCourses (Counting all existing courses):
def count_courses(email):
    user = get_user_by_email(email)
    if not user:
        return 0
    enrollments = user.get("Enrollments", {})

    return sum(
        len(semester)
        for year in enrollments.values()
        for semester in year.values()
    )

# Updates all data in a session:
def update_student_metrics(email):
    session["totalCredits"] = calculate_total_credits(email)
    session["GPAIndicator"] = calculate_gpa_indicator(email)
    session["targetGPA"] = get_target_gpa(email)
    session["numberOfCourses"] = count_courses(email)
