// Vercel Serverless API handler for /api/leads
const fs = require("fs");
const path = require("path");

const DATA_DIR = path.resolve("/tmp");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

function readLeads() {
  try {
    if (!fs.existsSync(LEADS_FILE)) return [];
    return JSON.parse(fs.readFileSync(LEADS_FILE, "utf8") || "[]");
  } catch {
    return [];
  }
}

function writeLeads(leads) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf8");
}

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method === "GET") {
    const leads = readLeads();
    if (req.query && req.query.format === "csv") {
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
      const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", 'attachment; filename="hey-carmela-leads.csv"');
      res.status(200).send(csv);
      return;
    }
    res.status(200).json({ success: true, totalCount: leads.length, leads });
    return;
  }

  if (req.method === "POST") {
    const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { name, businessName, email, phone, priority, notes, language } = data;

    if (!name || !businessName || !email || !priority) {
      res.status(400).json({
        success: false,
        message: language === "es" ? "Por favor completa todos los campos requeridos." : "Please complete all required fields."
      });
      return;
    }

    const now = new Date();
    const newLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      name: name.trim(),
      businessName: businessName.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : null,
      priority: priority.trim(),
      notes: notes ? notes.trim() : null,
      language: language === "es" ? "es" : "en",
      submittedAt: now.toISOString(),
      formattedDate: now.toLocaleString("en-US", { timeZone: "UTC", dateStyle: "medium", timeStyle: "short" }) + " UTC"
    };

    const leads = readLeads();
    leads.unshift(newLead);
    writeLeads(leads);

    res.status(200).json({
      success: true,
      leadId: newLead.id,
      message: language === "es"
        ? "¡Gracias! Recibimos tu solicitud. Te escribiremos por correo para coordinar una demo."
        : "Thanks! We received your request and will email you to coordinate a demo."
    });
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
};
