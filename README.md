# 🏥 MediSort AI — Smart Mobile Medical-Waste Collection & Segregation System
### SIH 2026 | HealthTech Track | Software-Only Zero-Hardware Platform

[![Tech Stack](https://img.shields.io/badge/Stack-React%20%2B%20Node%20%2B%20Leaflet-6366f1?style=for-the-badge)](/)
[![BMW Rules](https://img.shields.io/badge/Compliant-BMW%20Rules%202016-10b981?style=for-the-badge)](/)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-f59e0b?style=for-the-badge)](/)

---

## 🚀 Quick Start — Run in 60 Seconds

### Method 1: Frontend Only (Instant Demo Mode)

```bash
cd frontend
npm install
npm run dev
```

Open → **http://localhost:5173**

> The app runs 100% offline with built-in mock data. No database or backend required for the hackathon demo.

---

### Method 2: Full Stack (Frontend + Backend)

**Terminal 1 — Backend API:**
```bash
cd backend
npm install
npm run dev
```
Backend starts at **http://localhost:3001**

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Frontend at **http://localhost:5173**

---

## 📁 Project Structure

```
medisort-ai/
├── frontend/               # React + Vite + Tailwind CSS (Main App)
│   └── src/
│       ├── pages/          # All 8 page views
│       │   ├── LandingPage.jsx         ← Public marketing / hero
│       │   ├── DashboardPage.jsx       ← Command center overview
│       │   ├── ScannerPage.jsx         ← AI waste classifier
│       │   ├── SmartBinsPage.jsx       ← Virtual bin telemetry
│       │   ├── PickupsPage.jsx         ← Pickup job management
│       │   ├── LiveMapPage.jsx         ← Fleet tracking (Leaflet)
│       │   ├── TraceabilityPage.jsx    ← SHA-256 chain-of-custody
│       │   └── AnalyticsPage.jsx       ← CPCB compliance dashboard
│       ├── components/     # Reusable UI component library
│       │   ├── scanner/    ← DragDropZone, ClassificationResult, ConfidenceMeter
│       │   ├── map/        ← LeafletMap (live fleet), LiveOperationsPanel
│       │   ├── analytics/  ← AnalyticsCharts (bar, pie breakdown)
│       │   ├── traceability/ ← TraceabilityTimeline, VerificationCard
│       │   ├── bins/       ← BinCard, BinDetailsModal, SegregationGuideModal
│       │   ├── pickups/    ← PickupTable, NewPickupModal, AssignUnitModal
│       │   ├── demo/       ← DemoModeBar, InteractiveDemoModal
│       │   └── common/     ← GlassCard, StatCard, Badge, Toast, Sidebar, Header
│       ├── data/
│       │   ├── mockData.js        ← Complete in-memory dataset (bins, pickups, fleet, traceability)
│       │   └── segregationGuide.js
│       ├── hooks/
│       │   ├── useLiveFleet.js    ← Real-time GPS vehicle simulation (setInterval)
│       │   ├── useDemoMode.js     ← Guided SIH demo walkthrough controller
│       │   └── useNotifications.js ← Global toast system
│       ├── services/       ← API wrappers with offline fallback
│       │   ├── wasteService.js    ← AI classification (backend or offline engine)
│       │   ├── pickupService.js
│       │   ├── binService.js
│       │   ├── fleetService.js
│       │   └── traceabilityService.js
│       └── utils/
│           ├── formatters.js
│           └── hashChain.js  ← SHA-256 block chain mock implementation
│
├── backend/                # Node.js + Express REST API
│   └── src/
│       ├── server.js       ← Express app entry, CORS, Morgan logging
│       ├── config/
│       │   ├── db.js       ← MongoDB + in-memory fallback (no DB needed)
│       │   └── env.js
│       ├── controllers/    ← wasteController, pickupController, binController, etc.
│       ├── routes/         ← RESTful route definitions for all 6 domains
│       ├── models/         ← Mongoose schemas with validation
│       ├── middleware/     ← Error handler, multer upload
│       ├── services/       ← Classification engine, chain-of-custody builder
│       └── utils/          ← Mock data seeder
│
└── ai-service/             # (Optional) FastAPI Python AI service skeleton
```

---

## ✨ Core Features

### 🤖 A. AI Waste Scanner
- **5 one-click sample images** for instant judge demonstration (no image upload needed)
- Drag-and-drop or file upload support
- Animated "neural scanning" overlay during inference
- Result card: BMW Category Badge, Confidence %, Hazard Class, Treatment Protocol
- **1-click "Log to Pickup Queue"** action

### 🗺️ B. Live Fleet Tracking (Leaflet.js)
- Real-time animated vehicle markers with GPS waypoint simulation
- Hospital collection nodes + CBWTF treatment plant
- Dashed polyline route tracing in indigo
- Radar pulse animation for moving units
- Speed, ETA, battery, and capacity telemetry cards

### 🔗 C. Chain-of-Custody Ledger
- SHA-256 hash chain visualization (7 chronological checkpoints)
- Tamper-evident verification banner
- Full audit timeline: Generation → Classification → Bin → Pickup → Transit → Disposal

### 📊 D. Analytics & CPCB Dashboard
- Daily collection volume bar chart (custom SVG bars, no external charting lib)
- BMW category breakdown with animated progress bars
- Facility compliance ranking table (A+, A, B+)
- Export Compliance Report button

### 🎮 E. Guided SIH Demo Mode
- Floating demo controller bar (auto-play or step-by-step)
- 8-step guided walkthrough for judge presentation
- DemoModeBar pinned at bottom of screen

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#090d16` | Page canvas |
| Surface | `#0d1322` | Glass cards |
| Primary | `#6366f1` (Indigo) | CTAs, accents |
| BMW Yellow | `#eab308` | Anatomical waste |
| BMW Red | `#ef4444` | Contaminated plastics |
| BMW White | `#f8fafc` | Sharps |
| BMW Blue | `#3b82f6` | Glassware |
| Success | `#10b981` (Emerald) | Positive states |

---

## 🔌 Backend API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | System health check |
| POST | `/api/waste/classify` | AI classification |
| GET | `/api/pickups` | List all pickup jobs |
| POST | `/api/pickups` | Create new pickup |
| PATCH | `/api/pickups/:id/assign` | Assign unit to pickup |
| GET | `/api/bins` | Bin telemetry |
| PATCH | `/api/bins/:category/load` | Update bin fill level |
| GET | `/api/mobile-units` | Fleet positions |
| GET | `/api/traceability/:wasteId` | Chain-of-custody for waste ID |
| GET | `/api/analytics` | CPCB summary metrics |

---

## 🏗️ Architecture

```
Browser → React SPA (Vite)
          │
          ├─ Online: → Express REST API → MongoDB (or in-memory fallback)
          │                └─ AI classify → FastAPI (Python) or built-in classifier
          │
          └─ Offline: → Client-side mock engine (100% functional, no network needed)
                           ├─ deterministic waste classifier
                           ├─ in-memory CRUD (pickups, bins, fleet)
                           └─ real-time GPS simulator (setInterval waypoints)
```

---

## 🔑 Environment Variables

**frontend/.env**
```
VITE_API_BASE_URL=http://localhost:3001/api
```

**backend/.env**
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/medisort-ai
JWT_SECRET=medisort-sih2026-secret
NODE_ENV=development
```

---

## 📋 BMW Rules 2016 — Category Reference

| Color | Waste Types | Treatment |
|-------|-------------|-----------|
| 🟡 YELLOW | Anatomical, infectious, cytotoxic, expired meds | Incineration (>1050°C) / Deep Burial |
| 🔴 RED | Contaminated plastics, IV tubing, vacutainers | Autoclaving + Shredding + Recycling |
| ⚪ WHITE | Needles, scalpels, lancets (puncture-proof box) | Dry Heat / Encapsulation in concrete |
| 🔵 BLUE | Glassware, ampoules, metallic implants | Disinfection + Autoclaving + Recycling |

---

## 🏆 SIH 2026 Demo Walkthrough

1. Open `/` → See Landing Page with live stats and role selector
2. Click **"Launch Dashboard"** → Command center overview
3. Navigate to **AI Scanner** → Click sample "Used Syringe" → Watch 96.8% confidence result
4. Click **"Log to Pickup Queue"** → Navigate to **Live Map** to see vehicle tracking
5. Open **Traceability** → Search `WST-2026-081` → View 7-step SHA-256 chain
6. Open **Analytics** → Review compliance charts and facility rankings
7. Click **"Start Guided Demo"** in header → Auto-walkthrough for judges

---

*Built for Smart India Hackathon 2026 | HealthTech | Software Track*
