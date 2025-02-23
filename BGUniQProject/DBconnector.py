import os
import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = os.environ.get('DB_URI')

# Send a ping to confirm a successful connection
# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)

# Create a new client (cluster) and connect to the server
cluster = MongoClient(uri, server_api=ServerApi('1'))
BGUniQDB = cluster['BGUniQDB']

# Define Collections
StudentsCol = BGUniQDB['Students']
StudyTemplatesCol = BGUniQDB['StudyTemplates']

# Students' collection - all necessary functions
def getListOfStudents():
    return list(StudentsCol.find())

def updateStudent(StudentDict):
    StudentsCol.update_one(StudentDict, True)

# StudyTemplates' Collection - all necessary functions
def getListOfStudyTemplates():
    return list(StudyTemplatesCol.find())

def insertStudyTemplate(StudyTemplateDict):
    StudyTemplatesCol.insert_one(StudyTemplateDict)

def updateStudyTemplate(StudyTemplateDict):
    StudyTemplatesCol.update_one(StudyTemplateDict, True)

# Creating a new Student-User after the signup
def createStudentUser (StudentID, FullName, Username, Password, Email, Degree, Department, StudyTemplate, ContractYear, CurrentSemester):
    newUser = {
        "StudentID": StudentID,
        "FullName": FullName,
        "Username": Username,
        "Password": Password,
        "Email": Email,
        "Degree": Degree,
        "Department": Department,
        "StudyTemplate": StudyTemplate,
        "ContractYear": ContractYear,
        "CurrentSemester": CurrentSemester,
        "AcademicYear": "",
        "Enrollments": [],
        "PersonalGoals": []
    }
    StudentsCol.insert_one(newUser)