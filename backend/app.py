from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.ask_doubt import ask_doubt
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="Mechanics Statics RAG API")

app.mount(
    "/images",
    StaticFiles(directory="images"),
    name="images",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change later if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QuestionRequest(BaseModel):
    question: str


@app.get("/")
def home():
    return {
        "message": "Mechanics Statics RAG API is running."
    }


@app.post("/ask")
def ask(request: QuestionRequest):
    return ask_doubt(request.question)