from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class PredictRequest(BaseModel):
    image_base64: Optional[str] = Field(None, description="Base64 encoded image string")
    label_hint: Optional[str] = Field(None, description="Optional label hint for testing")
    facility: Optional[str] = Field("Apollo City Hospital", description="Healthcare facility name")

class PredictionResponse(BaseModel):
    category: str = Field(..., description="YELLOW | RED | WHITE | BLUE")
    label: str = Field(..., description="Classified waste item description")
    confidence: float = Field(..., description="Model confidence score between 0.0 and 1.0")
    recommended_bin: str = Field(..., description="Target color-coded smart bin")
    review_required: bool = Field(..., description="True if confidence < threshold (0.85)")
    hazard_class: str = Field(..., description="Biohazard risk classification")
    treatment_method: str = Field(..., description="Prescribed disposal / treatment method")
    segregation_instructions: str = Field(..., description="Direct handling protocol")
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat() + "Z")
    waste_id: str = Field(..., description="Generated unique tracking ID")

class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
    timestamp: str
