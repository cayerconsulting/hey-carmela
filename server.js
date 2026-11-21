/**
 * Hey Carmela - Bilingual Landing Page & Private Lead Inbox Server
 * 
 * ============================================================================
 * SITE OWNER CONFIGURATION & BOOKING DESTINATION SETTINGS
 * ============================================================================
 * Edit the settings below to connect Hey Carmela to your external booking
 * tool (e.g. Calendly, Cal.com), CRM webhook (Zapier, Make, HubSpot), or
 * email notification service.
 * 
 * By default, all lead requests are automatically recorded in the private
 * local lead system at 'data/leads.json' and can be viewed anytime at:
 * http://localhost:3000/inbox
 * ============================================================================
 */

const SITE_CONFIG = {
  // Primary booking destination (URL or calendar link). If empty or null,
  // the on-page intake form handles all lead captures directly.
  bookingDestinationUrl: process.env.BOOKING_DESTINATION_URL || "",

  // Optional webhook URL (e.g., Zapier, Make, Slack webhook) to forward leads
  webhookUrl: process.env.LEAD_WEBHOOK_URL || "",

  // Port to run the server on
  port: parseInt(process.env.PORT || "3000", 10),

  // File path for the private lead inbox
  leadsFilePath: "./data/leads.json",

  // Site owner notification email (for display / reference)
  notificationEmail: process.env.OWNER_EMAIL || "owner@heycarmela.com"
};

const http = require("http");
const fs = require("fs");
const path = require("path");

const DATA_DIR = path.resolve(__dirname, "data");
const LEADS_FILE = path.resolve(__dirname, SITE_CONFIG.leadsFilePath);
const PUBLIC_DIR = path.resolve(__dirname, "public");

// Ensure data directory and leads file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), "utf8");
}

// MIME types for static assets
const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff"
};

/**
 * Read all leads safely from file
 */
function readLeads() {
  try {
    if (!fs.existsSync(LEADS_FILE)) return [];
    const raw = fs.readFileSync(LEADS_FILE, "utf8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    console.error("Error reading leads file:", err);
    return [];
  }
}

/**
 * Write leads safely with atomic replace
 */
function writeLeads(leads) {
  const tempPath = `${LEADS_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempPath, JSON.stringify(leads, null, 2), "utf8");
  fs.renameSync(tempPath, LEADS_FILE);
}

/**
 * Validate incoming lead submission
 */
function validateLeadSubmission(data) {
  const errors = [];
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const businessName = typeof data.businessName === "string" ? data.businessName.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const priority = typeof data.priority === "string" ? data.priority.trim() : "";
  const language = data.language === "es" ? "es" : "en";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const notes = typeof data.notes === "string" ? data.notes.trim() : "";

  if (!name) {
    errors.push({ field: "name", message: language === "es" ? "Tu nombre es requerido" : "Your name is required" });
  }
  if (!businessName) {
    errors.push({ field: "businessName", message: language === "es" ? "El nombre del negocio es requerido" : "Business name is required" });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: "email", message: language === "es" ? "Ingresa un correo electrónico de trabajo válido" : "Valid work email is required" });
  }
  if (!priority) {
    errors.push({ field: "priority", message: language === "es" ? "Selecciona en qué te gustaría recibir ayuda primero" : "Please select what you would like help with first" });
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: {
      name,
      businessName,
      email,
      phone,
      priority,
      notes,
      language
    }
  };
}

/**
 * Parse JSON or URL-encoded body
 */
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      // Safeguard against too large payloads (> 1MB)
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      const contentType = req.headers["content-type"] || "";
      if (contentType.includes("application/json")) {
        try {
          resolve(JSON.parse(body || "{}"));
        } catch (e) {
          reject(new Error("Invalid JSON body"));
        }
      } else if (contentType.includes("application/x-www-form-urlencoded")) {
        const parsed = {};
        const params = new URLSearchParams(body);
        for (const [key, value] of params.entries()) {
          parsed[key] = value;
        }
        resolve(parsed);
      } else {
        // Try parsing JSON first, else empty object
        try {
          resolve(JSON.parse(body || "{}"));
        } catch {
          resolve({});
        }
      }
    });
    req.on("error", reject);
  });
}

/**
 * HTTP Server
 */
const server = http.createServer(async (req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = urlObj.pathname;

  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // API: Get Site Config (Publicly safe info)
  if (req.method === "GET" && pathname === "/api/config") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      bookingDestinationUrl: SITE_CONFIG.bookingDestinationUrl,
      hasExternalDestination: Boolean(SITE_CONFIG.bookingDestinationUrl)
    }));
    return;
  }

  // API: Lead Submission
  if (req.method === "POST" && pathname === "/api/leads") {
    try {
      const data = await parseRequestBody(req);
      const validation = validateLeadSubmission(data);

      if (!validation.isValid) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          success: false,
          errors: validation.errors,
          message: data.language === "es" ? "Por favor completa todos los campos requeridos." : "Please complete all required fields."
        }));
        return;
      }

      const { name, businessName, email, phone, priority, notes, language } = validation.sanitized;
      const now = new Date();

      const newLead = {
        id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        name,
        businessName,
        email,
        phone: phone || null,
        priority,
        notes: notes || null,
        language,
        submittedAt: now.toISOString(),
        formattedDate: now.toLocaleString("en-US", { timeZone: "UTC", dateStyle: "medium", timeStyle: "short" }) + " UTC",
        userAgent: req.headers["user-agent"] || "unknown",
        ip: req.socket.remoteAddress || "unknown"
      };

      // Persist to private lead inbox
      const currentLeads = readLeads();
      currentLeads.unshift(newLead);
      writeLeads(currentLeads);

      console.log(`[Lead Recorded] ${newLead.id} | ${newLead.name} (${newLead.businessName}) | Lang: ${newLead.language} | Priority: ${newLead.priority}`);

      // Respond with confirmation
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        success: true,
        leadId: newLead.id,
        bookingDestinationUrl: SITE_CONFIG.bookingDestinationUrl || null,
        message: language === "es" 
          ? "¡Gracias! Recibimos tu solicitud. Te escribiremos por correo para coordinar una demo."
          : "Thanks! We received your request and will email you to coordinate a demo."
      }));
      return;
    } catch (err) {
      console.error("Error processing lead submission:", err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        success: false,
        message: "Internal server error saving submission. Please try again."
      }));
      return;
    }
  }

  // API: Get Leads (Private inbox data)
  if (req.method === "GET" && pathname === "/api/leads") {
    const leads = readLeads();
    // Optional CSV export
    if (urlObj.searchParams.get("format") === "csv") {
      const headers = ["ID", "Submitted At", "Language", "Name", "Business Name", "Email", "Phone", "Priority", "Notes"];
      const rows = leads.map(l => [
        l.id,
        l.submittedAt,
        l.language,
        `"${(l.name || "").replace(/"/g, '""')}"`,
        `"${(l.businessName || "").replace(/"/g, '""')}"`,
        `"${(l.email || "").replace(/"/g, '""')}"`,
        `"${(l.phone || "").replace(/"/g, '""')}"`,
        `"${(l.priority || "").replace(/"/g, '""')}"`,
        `"${(l.notes || "").replace(/"/g, '""')}"`
      ]);
      const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
      res.writeHead(200, {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="hey-carmela-leads.csv"'
      });
      res.end(csvContent);
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      success: true,
      totalCount: leads.length,
      leads
    }));
    return;
  }

  // Route alias: /inbox serves public/inbox.html
  let filePath = path.join(PUBLIC_DIR, pathname === "/" ? "index.html" : pathname === "/inbox" ? "inbox.html" : pathname);

  // If technician photo PNG is requested but not yet copied, seamlessly serve the SVG visual
  if ((pathname === "/images/technician-hero.png" || pathname === "/images/exec-23056dff-1cc5-46f9-888e-5211632fa5e3.png") && !fs.existsSync(filePath)) {
    const svgPath = path.join(PUBLIC_DIR, "images", "technician-hero.svg");
    if (fs.existsSync(svgPath)) {
      filePath = svgPath;
    }
  }

  // Security check: ensure path is within PUBLIC_DIR
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Forbidden");
    return;
  }

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback check: if no extension, try .html
      if (!path.extname(filePath)) {
        const htmlPath = filePath + ".html";
        if (fs.existsSync(htmlPath)) {
          filePath = htmlPath;
        } else {
          res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
          res.end("404 Not Found");
          return;
        }
      } else {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("404 Not Found");
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

if (require.main === module) {
  server.listen(SITE_CONFIG.port, () => {
    console.log(`====================================================`);
    console.log(` Hey Carmela Landing Page Server running!`);
    console.log(` Landing Page:  http://localhost:${SITE_CONFIG.port}`);
    console.log(` Private Inbox: http://localhost:${SITE_CONFIG.port}/inbox`);
    console.log(` Leads File:    ${LEADS_FILE}`);
    console.log(`====================================================`);
  });
}

module.exports = { server, SITE_CONFIG, readLeads, writeLeads, validateLeadSubmission };
