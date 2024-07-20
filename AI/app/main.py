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
    role: str
    parts: List[str]

class ConversationModel(BaseModel):
    chat_history: List[MessageModel]
    scenario: str
    conversation: str

class QueryModel(BaseModel):
    query: str
    chat_history: List[MessageModel]

# Define the root route
@app.get("/")
async def root():
    """
    Welcome message for the root endpoint.
    """
    return {"message": "Welcome to the Haven API!"}

# Refining the query Endpoint
@app.post("/refine_query")
async def refine_query(request: QueryModel):
    query = request.query
    history = request.chat_history
    response = query_refinement(history, query)
    return {"response": response}