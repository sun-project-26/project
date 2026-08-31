from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from typing import Optional
from app.models.schemas import PredictionResponse, PredictRequest
from app.services.classifier import classifier_service

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
async def predict_waste(
    image: Optional[UploadFile] = File(None),
    label_hint: Optional[str] = Form(None),
    facility: Optional[str] = Form("Apollo City Hospital")
):
    """
    Classify biomedical waste from uploaded image or simulated hint.
    Returns category (YELLOW, RED, WHITE, BLUE), confidence, and handling guidelines.
    """
    try:
        filename = image.filename if image else ""
        raw_bytes = await image.read() if image else None

        result = classifier_service.classify(
            filename=filename,
            label_hint=label_hint,
            raw_bytes=raw_bytes
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Classification failed: {str(e)}")

@router.post("/predict/json", response_model=PredictionResponse)
async def predict_waste_json(payload: PredictRequest):
    """
    Alternative JSON endpoint accepting base64 or label hint.
    """
    try:
        result = classifier_service.classify(
            filename=payload.label_hint or "",
            label_hint=payload.label_hint,
            raw_bytes=None
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Classification failed: {str(e)}")
