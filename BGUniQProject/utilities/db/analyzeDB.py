import os
import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from BGUniQProject.DBconnector import BGUniQDB, get_study_templates_col
from dotenv import load_dotenv

def print_all_collections():
    # Prints all collections in the database and their documents.
    collections = BGUniQDB.list_collection_names()  # Get all collection names

    print("\nList of collections in the database:")
    for collection_name in collections:
        print(f"- {collection_name}")

    print("\nDocuments in each collection:")
    for collection_name in collections:
        collection = BGUniQDB[collection_name]  # Get the collection
        documents = collection.find()

        print(f"\nCollection: {collection_name}")
        for doc in documents:
            print_document(doc)

def print_document(doc, indent=0):
    for key, value in doc.items():
        if isinstance(value, dict):  # If the value is a dictionary, go deeper
            print(" " * indent + f"{key}:")
            print_document(value, indent + 4)
        elif isinstance(value, list):  # If the value is a list, print each item
            print(" " * indent + f"{key}:")
            for item in value:
                if isinstance(item, dict):
                    print_document(item, indent + 4)
                else:
                    print(" " * (indent + 4) + str(item))
        else:
            print(" " * indent + f"{key}: {value}")


def print_study_templates():
    collection = get_study_templates_col()
    documents = collection.find()

    print("\nStudy Templates:")
    for doc in documents:
        print_document(doc)
        print("-" * 50)

print_all_collections()
#print_study_templates()