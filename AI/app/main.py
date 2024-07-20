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
    author: str
    comment: str

class ConversationModel(BaseModel):
    chat_history: List[MessageModel]
    scenario: str
    conversation: str

class QnA(BaseModel):
    query: str

# Define the root route
@app.get("/")
async def root():
    """
    Welcome message for the root endpoint.
    """
    return {"message": "Welcome to the Haven API!"}

# Question & Answer Endpoint
@app.post("/qa")
async def qa(request: QuestionModel):
    message = request.question
    response = question_answer(message)
    return {"response": response}

# Get scenario Endpoint
@app.post("/scenario")
async def scenario(request: ScenarioModel):
    emergency_type = request.emergency_type
    response = get_scenario(emergency_type)
    return response