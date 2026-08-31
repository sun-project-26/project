# MediSort AI - Python FastAPI Microservice

FastAPI-powered computer vision & Bio-Medical Waste (BMW) classification engine.

## Features
- Fast asynchronous inference via `POST /predict`.
- Bio-Medical Waste rules categorization engine (**YELLOW**, **RED**, **WHITE**, **BLUE**).
- Automatic human review threshold flag when confidence < 85%.
- Deterministic heuristic analysis fallback for instant, reliable hackathon demos.

## Setup & Running Manually
```bash
# 1. Create Virtual Environment
python -m venv venv

# 2. Activate Virtual Environment
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# Windows CMD:
venv\Scripts\activate.bat
# Linux/macOS:
source venv/bin/activate

# 3. Install Dependencies
pip install -r requirements.txt

# 4. Run Server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Interactive OpenAPI documentation available at `http://localhost:8000/docs`.
