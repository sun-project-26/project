# MEDISORT AI - REST API & AI Service Specification

## 1. Backend REST Endpoints (Port 5000)

### 🏥 Health & System
- `GET /api/health`
  - Response: `{ "status": "ok", "service": "MediSort AI Backend", "db": "connected|in-memory", "timestamp": "..." }`

### 🧪 Waste Management
- `POST /api/waste/classify`
  - Body: Multipart Form with `image` file OR JSON `{ "imageUrl": "...", "label": "...", "facility": "..." }`
  - Response: `{ "wasteId": "WST-1092", "category": "WHITE", "label": "Used Syringe", "confidence": 0.968, "recommendedBin": "WHITE", "reviewRequired": false, "timestamp": "..." }`
- `GET /api/waste`
  - Query params: `?category=RED&facility=Apollo`
  - Response: Array of waste logs.
- `GET /api/waste/:id`
  - Response: Single waste record with full classification metadata.

### 🚚 Pickup Jobs
- `POST /api/pickups`
  - Body: `{ "facility": "City Clinic", "wasteCategory": "YELLOW", "weight": 14.5, "priority": "High", "pickupNotes": "Infectious ward overflow" }`
  - Response: Created pickup record with ID `PCK-3021`.
- `GET /api/pickups`
  - Response: Array of pickup jobs.
- `GET /api/pickups/:id`
  - Response: Single pickup details with assigned unit telematics.
- `PATCH /api/pickups/:id/status`
  - Body: `{ "status": "En Route" | "Collecting" | "Completed", "unitId": "MS-02" }`
  - Response: Updated pickup record.

### 📍 Mobile Units Fleet
- `GET /api/mobile-units`
  - Response: Array of active mobile units with GPS coordinates, battery, driver, and active route.
- `POST /api/mobile-units`
  - Body: `{ "unitId": "MS-05", "driver": "Anil Verma", "latitude": 28.6139, "longitude": 77.2090 }`

### 🗑️ Smart Bins
- `GET /api/bins`
  - Response: Array of 4 BMW categories (`YELLOW`, `RED`, `WHITE`, `BLUE`) with load %, total weight, capacity, and warning status.
- `PATCH /api/bins/:id`
  - Body: `{ "currentLoadKg": 42.5 }`

### 🔗 Traceability & Ledger
- `GET /api/traceability/:id`
  - Query or Param: Waste ID / Pickup ID
  - Response: Chronological array of cryptographic audit events with SHA-256 block hashes.

### 📊 Analytics
- `GET /api/analytics`
  - Response: Summary KPIs, category breakdown %, daily volume timeline, SLA completion rate.

---

## 2. AI FastAPI Endpoints (Port 8000)

### `POST /predict`
- **Request Format**: Multipart form data with `image` (binary) OR JSON `{ "image_base64": "...", "label_hint": "..." }`
- **Response Format**:
```json
{
  "category": "WHITE",
  "label": "Used Syringe & Needles",
  "confidence": 0.968,
  "recommended_bin": "WHITE",
  "review_required": false,
  "hazard_class": "Sharps / Puncture Hazard",
  "treatment_method": "Autoclaving + Encapsulation / Shredding",
  "timestamp": "2026-08-28T16:50:00.000Z"
}
```
