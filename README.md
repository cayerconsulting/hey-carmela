# Hey Carmela — Bilingual Landing Page & Lead Intake System

A mobile-first, bilingual (English / Español) landing page for **Hey Carmela**, an AI business assistant for home service companies (HVAC, plumbing, electrical).

## Key Features

- **Full Bilingual Support (EN / ES)**:
  - English / Español language switcher in header.
  - Automatically defaults to English on first visit and persists language preference in `localStorage`.
  - Translates 100% of the page: navigation, headlines, buttons, phone mockup chat and ETA visual, capability cards, service scenario, form labels, radio choices, validation prompts, and confirmation messages.
  - Updates `<html lang="...">` dynamically.
- **Workflow-Focused Capabilities (4 Core Cards)**:
  1. *“Can I book a service call?”* (Answer calls, texts, WhatsApp)
  2. *“When can you come out?”* (Calendar booking & reminders)
  3. *“Is my technician on the way?”* (Live GPS tracking & ETA)
  4. *“How do I pay?”* (Deposits, post-job invoices & follow-ups)
- **Realistic Service-Call Example**:
  - Broken AC scenario showing end-to-end flow from initial call to final payment.
- **Unified Call to Action & Lead Intake Form**:
  - Primary button: **“Request a demo”** (EN) / **“Solicita una demo”** (ES).
  - Smooth-scrolls visitors to the on-page intake form.
  - Prioritization Question: *“What would you like help with first?”* (*“¿Con qué te gustaría recibir ayuda primero?”*) gives instant visibility into customer interest.
  - Submissions are captured with language, selected priority, contact info, notes, and timestamp.
  - Confirmation is shown only after successful save; failed submissions preserve the visitor's inputs and show an error in their language to retry.
- **Private Lead Inbox**:
  - Stored locally at `data/leads.json`.
  - Accessible via the visual private inbox dashboard at `/inbox`.
  - Features quick stats (total leads, EN vs ES breakdown, top priority capability) and CSV export.

---

## Site Owner Configuration

If you want to direct demo requests to an external calendar tool (e.g., Calendly, Cal.com) or CRM webhook:

1. **Server Configuration**: Open [server.js](file:///Users/cayerapple/.gemini/antigravity/scratch/hey-carmela/server.js) and edit the `SITE_CONFIG` block at lines 18–33:
   ```javascript
   const SITE_CONFIG = {
     bookingDestinationUrl: process.env.BOOKING_DESTINATION_URL || "https://calendly.com/your-team/demo",
     webhookUrl: process.env.LEAD_WEBHOOK_URL || "",
     port: parseInt(process.env.PORT || "3000", 10),
     leadsFilePath: "./data/leads.json"
   };
   ```
2. **Client Script Configuration**: In [public/script.js](file:///Users/cayerapple/.gemini/antigravity/scratch/hey-carmela/public/script.js#L9-L15):
   ```javascript
   const CLIENT_CONFIG = {
     bookingDestinationUrl: "" // Optional direct fallback URL
   };
   ```

---

## Running the Application

### 1. Start the Server
```bash
cd /Users/cayerapple/.gemini/antigravity/scratch/hey-carmela
npm start
```
- Landing Page: [http://localhost:3000](http://localhost:3000)
- Private Lead Inbox: [http://localhost:3000/inbox](http://localhost:3000/inbox)

### 2. Run Automated Verification Tests
```bash
npm test
```
Verifies English and Spanish submissions, validation logic, priority tracking, error retention, and disk persistence.
