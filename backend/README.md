# MediSort AI - Node.js Express REST Backend

Express.js microservice managing pickups, smart bin thresholds, mobile vehicle telematics, and cryptographic traceability hash logs.

## Resilient Dual Data Layer
- **MongoDB Mode**: Automatically connects to MongoDB via Mongoose if available.
- **In-Memory Store Fallback**: If MongoDB is not active, automatically boots a fast in-memory store with sample hospitals, bins, pickups, and mobile units so the entire platform runs without setup hassle!

## Setup & Running Manually
```bash
# 1. Navigate to directory
cd backend

# 2. Copy environment file
copy .env.example .env

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

API will be listening at `http://localhost:5000`.
Health endpoint: `http://localhost:5000/api/health`.
