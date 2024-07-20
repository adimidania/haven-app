from configparser import ConfigParser
import cohere
import os
import google.generativeai as genai 
from langchain_community.embeddings import CohereEmbeddings
from pinecone import Pinecone
from langchain_community.vectorstores import Pinecone as Pinecone_Langchain

# Read the secret keys from the configuration file
config = ConfigParser()
config.read("config.ini")
cohere_secret_key = config.get('Cohere', 'secret_key')
pinecone_secret_key = config.get('Pinecone', 'secret_key')
gemini_secret_key = config.get('Gemini', 'secret_key')
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

# This function takes a list of Pinecone documents and returns the formatted documents
def format_docs(documents):
    return [f"""Document: {response["metadata"]["text"]}""" for response in documents['matches'] if response["score"] > 0.2]

# This function takes the chat history and a query then returns a refined query that can be used for similarity search
def query_refinement(chat_history, query):
    genai.configure(api_key=gemini_secret_key)
    system_prompt = f"""Given a chat history and the latest user question which might reference context in the chat history, 
                        formulate a standalone question which can be understood without the chat history. 
                        Do NOT answer the question, just reformulate it if needed and otherwise return it as is.
                        Here is the chat {chat_history}."""
    
    model = genai.GenerativeModel('gemini-1.5-flash', system_instruction=system_prompt)
    return model.generate_content(query).text.strip() 

# This function takes a query and chat history then returns the response from the model
def chat(query, chat_history):
    history = format_chat(chat)

    pass

# This function is an implementation of a naive retrieval augmented generation flow
def rag(query):
    embeddings = CohereEmbeddings(cohere_api_key=cohere_secret_key, user_agent=index_name)
    embedded_query = embeddings.embed_query(query)
    pc = Pinecone(api_key=pinecone_secret_key)
    index = pc.Index(index_name)
    results = index.query(
        vector=embedded_query,
        top_k=3,
        include_metadata=True
    )
    results = format_docs(results)
    if len(results) == 0:
        return "I'm sorry, I don't have an answer to that question. Could you please ask another question?"
    else:
        genai.configure(api_key=gemini_secret_key)
        system_prompt = f"""You a smart assistant that answers questions related to mental health. Answer the user's query by formulating a well-elaborated answer that relies on the following context: {results}."""
        
        model = genai.GenerativeModel('gemini-1.5-flash', system_instruction=system_prompt)
        return model.generate_content(query).text

# This function takes a prompt and a type (article or podcast) then returns the generated content
def generate(prompt, type):
    pass