from configparser import ConfigParser
import cohere
import os
import re
from langchain_community.embeddings import CohereEmbeddings
from pinecone import Pinecone
from langchain_community.vectorstores import Pinecone as Pinecone_Langchain

# Read the secret keys from the configuration file
config = ConfigParser()
config.read("config.ini")
cohere_secret_key = config.get('Cohere', 'secret_key')
pinecone_secret_key = config.get('Pinecone', 'secret_key')
ai21_secret_key = config.get('Gemini', 'secret_key')
index_name = os.environ['PINECONE_INDEX_NAME'] = 'haven-app'

# This function format the chat history to the format that is compatible with Gemini chat
def format_chat(chat):
    chat_history = []
    for message in chat:
        chat_history.append({
            "role": "user" if message["role"] == "User" else "model",
            "parts": [message["content"]]
        })
    return chat_history

# This function takes the chat history and a query then returns a refined query that can be used for similarity search
def query_refinement(chat_history, query):
    pass

# This function takes a query and chat history then returns the response from the model
def chat(query, chat_history):
    history = format_chat(chat)

    pass

# This function is an implementation of a naive retrieval augmented generation flow
def qna(query):
    pass

# This function takes a prompt and a type (article or podcast) then returns the generated content
def generate(prompt, type):
    pass