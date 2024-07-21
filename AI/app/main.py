from fastapi import FastAPI, HTTPException, BackgroundTasks
from utils import *
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware


'''The API '''
# Create the FastAPI app
app = FastAPI()

origins = ['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class MessageModel(BaseModel):
    isSent: bool
    message: str

class QueryModel(BaseModel):
    query: str
    chat_history: List[MessageModel]

class ContentModel(BaseModel):
    prompt: str
    type: str

# Define the root route
@app.get("/")
async def root():
    """
    Welcome message for the root endpoint.
    """
    return {"message": "Welcome to the Haven API!"}

# Q&A Endpoint
@app.post("/qna")
async def qna(question: str):
    response = rag(question)
    return {"response": response}

# Content generation Endpoint
@app.post("/generate_content")
async def generate(request: ContentModel):
    prompt = request.prompt
    type = request.type
    response = generate_content(prompt, type)
    return {"response": response}

# Chat Endpoint
@app.post("/chat")
async def chat_ai(request: QueryModel):
    query = request.query
    history = request.chat_history
    response = chat(query, history)
    return {"response": response}