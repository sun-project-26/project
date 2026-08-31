# 🏆 MEDISORT AI - SIH 2026 Pitch Demo Flow

Follow this structured script when presenting **MediSort AI** to Smart India Hackathon judges.

---

## 🎬 8-Step Presentation Walkthrough

### ⏱️ Stage 1: The Problem & Vision (Landing Page `/`)
- **Key Message**: Biomedical waste segregation in India suffers from high human exposure risk, manual sorting errors, lack of digital chain-of-custody, and delayed collection.
- **Demo Action**: Navigate to `/`, highlight the value proposition: *"AI-first software platform that classifies, routes, tracks and traces biomedical waste in real time without hardware."*
- **Visual**: Show the interactive dashboard preview and the 4-step workflow overview.

---

### ⏱️ Stage 2: AI Waste Scanner (`/scanner`)
- **Key Message**: Instant segregation at the point of care using edge vision intelligence.
- **Demo Action**:
  1. Click **"Upload Image"** or select one of the Quick-Select Demo items (e.g., *Used Syringe*, *Contaminated Gloves*, *Surgical Scalpel*, *Medicine Ampoule*).
  2. Watch the multi-phase neural scan animation.
  3. Show the **Classification Card**:
     - Waste Item: *Used Syringe*
     - Category: **WHITE (Puncture Proof Sharps)**
     - Confidence: **96.8%**
     - Recommended Bin: **White Container**
  4. Note the **Confidence Meter** and mention the compliance rule: *If confidence drops below 85%, a Human Review flag is automatically raised.*

---

### ⏱️ Stage 3: Smart Bin Allocation (`/bins`)
- **Key Message**: Virtual capacity telemetry tracks facility load without physical IoT load-cell sensors.
- **Demo Action**:
  1. Navigate to `/bins`.
  2. Inspect the 4 color-coded BMW cards:
     - 🟡 **Yellow**: Anatomical / Soiled (68% - 342 kg)
     - 🔴 **Red**: Contaminated Recyclables (45% - 210 kg)
     - ⚪ **White**: Sharps & Needles (82% - Near Threshold alert)
     - 🔵 **Blue**: Glassware & Implants (28% - 112 kg)
  3. Click on a bin card to view segregation protocols, treatment methods (Autoclave vs Incineration), and automated pickup triggers.

---

### ⏱️ Stage 4: On-Demand Pickup Request (`/pickups`)
- **Key Message**: Smart dispatch prioritizing infectious and high-volume waste.
- **Demo Action**:
  1. Click **"+ New Pickup"** button.
  2. Select Facility: *Apollo City Hospital - Ward 3*, Category: *White Sharps*, Weight: *15.2 kg*, Priority: *Critical*.
  3. Click **"Create Pickup"**.
  4. Observe the new pending job appear at the top of the table with glowing status tags.

---

### ⏱️ Stage 5: Intelligent Fleet Routing (`/map`)
- **Key Message**: Dynamic vehicle routing for mobile collection units.
- **Demo Action**:
  1. Navigate to `/map`.
  2. Point out mobile collection units (`MS-01` to `MS-04`) moving smoothly along hospital pickup routes on the OpenStreetMap.
  3. Click on **Unit MS-02** (`Rajesh Kumar`):
     - Status: **En Route**
     - Assigned Pickup: `PCK-3021`
     - Telematics: Speed `34 km/h`, Battery `84%`, ETA `8 mins`.
  4. Demonstrate the live operations panel on the right sidebar.

---

### ⏱️ Stage 6: Digital Traceability & Tamper-Evident Ledger (`/traceability`)
- **Key Message**: 100% digital chain-of-custody preventing illegal dumping and regulatory fraud.
- **Demo Action**:
  1. Navigate to `/traceability`.
  2. Search for Waste ID `WST-2026-081`.
  3. Walk through the 7-step cryptographic lifecycle:
     `Generated` ➔ `AI Classified` ➔ `Bin Assigned` ➔ `Pickup Created` ➔ `Unit Dispatched` ➔ `Collected` ➔ `Disposal Completed`.
  4. Point out the SHA-256 block hash chaining and the **"Tamper-Evident Digital Log"** verification badge.

---

### ⏱️ Stage 7: Centralized Analytics & Compliance (`/analytics`)
- **Key Message**: Hospital administrators and government pollution boards get real-time compliance insights.
- **Demo Action**:
  1. Navigate to `/analytics`.
  2. Review the Waste Category breakdown, 7-day volume trends, 98.4% SLA pickup compliance, and facility sorting accuracy rankings.

---

### ⏱️ Stage 8: 1-Click Interactive Demo Mode (`Demo Controller`)
- **Key Message**: Fail-safe, high-speed demonstration mechanism for hackathons.
- **Demo Action**:
  1. Click the glowing **"Demo Mode"** bar at the top or bottom of the screen.
  2. Click **"Run Automated Demo"** to see the system simulate the entire end-to-end pipeline in 30 seconds!
