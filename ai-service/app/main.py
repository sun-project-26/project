from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from app.config import CORS_ORIGINS
from app.routes.predict import router as predict_router
from app.models.schemas import HealthResponse

app = FastAPI(
    title="MediSort AI - Computer Vision & Waste Classification Service",
    description="Microservice for real-time Bio-Medical Waste (BMW) classification, confidence scoring, and smart bin routing.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router, tags=["Classification"])

@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    return {
        "status": "online",
        "service": "MediSort AI Classification Engine",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }

@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "MediSort AI Microservice is running. Visit /docs for API documentation.",
        "status": "healthy"
    }
