import os
import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
from BGUniQProject.utilities.db.studyTemplatesData import StudyTemplatesDict

# Load environment variables from a .env file
load_dotenv()

# Get the URI
#uri = os.environ.get('DB_URI')
uri = os.getenv("DB_URI")

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

def createStudyTemplatesCollection(StudyTemplatesDict, StudyTemplatesCol):
    if not StudyTemplatesDict:
        print("The dictionary is empty")
        return

    documents = [{"templateName": key, **value} for key, value in StudyTemplatesDict.items()]
    try:
        #trying insert the Documents to the collection
        result = StudyTemplatesCol.insert_many(documents)
        print(f"{len(result.inserted_ids)} added successfully")
    except Exception as e:
        print(f"error-The documents were not{e}")

# Insert Data:
if StudyTemplatesCol.count_documents({}) == 0:
    createStudyTemplatesCollection(StudyTemplatesDict, StudyTemplatesCol)
    print("StudyTemplates were added successfully to the collection")
else:
    print("The templates already exist in the collection")

# Get:
def getStudyTemplatesCol():
    return StudyTemplatesCol

# Update collections:


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
def createStudentUser(StudentID, FullName, Username, Password, Email, Degree, Department, StudyTemplate, ContractYear,
                      CurrentSemester):
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

