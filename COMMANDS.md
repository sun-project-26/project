# MEDISORT AI - Terminal Execution Runbook

> **Important**: This prototype has been built cleanly without executing any background scripts or automated commands. Follow the step-by-step instructions below in separate terminal windows to run the complete stack manually.

---

## ⚡ Quick Start Overview

You will need **3 Terminal Windows** open for full functionality:
- **Terminal 1**: Frontend (React + Vite) on `http://localhost:5173`
- **Terminal 2**: Backend (Node.js + Express) on `http://localhost:5000`
- **Terminal 3**: AI Microservice (Python + FastAPI) on `http://localhost:8000`

> **Note on MongoDB**: The Backend includes an automatic **In-Memory Mock Store fallback**. If you do not have MongoDB installed or running, the backend and frontend will still work 100% seamlessly!

---

## 🖥️ Terminal 1: Frontend (React + Vite)

Open a new Command Prompt / PowerShell window:

```bash
# Navigate to the frontend directory
cd "C:\Users\GAURA\.gemini\antigravity\scratch\medisort-ai\frontend"

# Copy environment variables file
copy .env.example .env

# Install Node.js dependencies
npm install

# Start the Vite development server
npm run dev
```

🌐 Frontend will be live at: **`http://localhost:5173`**

---

## 🖥️ Terminal 2: Backend (Node.js + Express REST API)

Open a second Command Prompt / PowerShell window:

```bash
# Navigate to the backend directory
cd "C:\Users\GAURA\.gemini\antigravity\scratch\medisort-ai\backend"

# Copy environment variables file
copy .env.example .env

# Install Node.js dependencies
npm install

# Start the Express server with nodemon (or node src/server.js)
npm run dev
```

🌐 Backend API will be live at: **`http://localhost:5000`**
- Health Check: `http://localhost:5000/api/health`
- Pickups API: `http://localhost:5000/api/pickups`
- Smart Bins: `http://localhost:5000/api/bins`
- Mobile Fleet: `http://localhost:5000/api/mobile-units`
- Traceability: `http://localhost:5000/api/traceability/TRC-8821`

---

## 🖥️ Terminal 3: AI Service (Python + FastAPI)

Open a third Command Prompt / PowerShell window:

```bash
# Navigate to the ai-service directory
cd "C:\Users\GAURA\.gemini\antigravity\scratch\medisort-ai\ai-service"

# Copy environment variables file
copy .env.example .env

# Create a Python virtual environment
python -m venv venv

# Activate the virtual environment (Windows CMD/PowerShell)
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
# OR on Windows CMD:
venv\Scripts\activate.bat

# Upgrade pip and install Python requirements
pip install -r requirements.txt

# Start the FastAPI server with Uvicorn
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

🌐 AI FastAPI Docs will be live at: **`http://localhost:8000/docs`**
- Health Check: `http://localhost:8000/health`
- Prediction Endpoint: `POST http://localhost:8000/predict`

---

## 🗄️ Optional: MongoDB Setup (Local or Atlas)

### Option A: Use Built-In In-Memory Fallback (No Setup Required!)
If MongoDB is not running, the backend logs:
`[DB] MongoDB not detected. Starting high-speed In-Memory Data Store... Ready!`
All CRUD operations, pickup creations, and traceability hash logs work out of the box.

### Option B: Local MongoDB Daemon (Optional)
If you have MongoDB Community Server installed:
```bash
# Start MongoDB service (Windows CMD as Administrator or Services panel)
net start MongoDB
# Or run mongod directly
mongod --dbpath="C:\data\db"
```

The backend will automatically connect to `mongodb://localhost:27017/medisort-ai`.

---

## 🏆 SIH Judge Demonstration Flow

Once all 3 services are running (or even just Frontend in Demo Mode):
1. Open `http://localhost:5173` in your browser.
2. Click **"Launch Dashboard"** or click the top glowing **"Demo Mode"** toggle.
3. Click **"Run Guided Demo"** on the floating action bar to execute the automated 8-step SIH walkthrough:
   - **Step 1**: Upload biomedical waste sample.
   - **Step 2**: Observe AI classification & confidence scoring.
   - **Step 3**: Verify Smart Bin recommendation (Yellow, Red, White, Blue).
   - **Step 4**: Auto-create pickup request with priority tag.
   - **Step 5**: Dispatch nearest mobile collection unit (`MS-02`).
   - **Step 6**: Watch live GPS simulated transit on Leaflet Map.
   - **Step 7**: Mark collection as completed.
   - **Step 8**: Inspect cryptographic SHA-256 digital audit trail in Traceability.
