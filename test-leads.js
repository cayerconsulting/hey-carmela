/**
 * In-process Verification Script for Hey Carmela Lead Intake System
 * 
 * Directly tests the HTTP server handler and logic without requiring network sockets,
 * perfectly compatible with sandboxed execution environments.
 */

const { EventEmitter } = require("events");
const { Readable } = require("stream");
const fs = require("fs");
const path = require("path");
const { server, SITE_CONFIG, readLeads, writeLeads, validateLeadSubmission } = require("./server.js");

// Mock incoming HTTP request
function createMockRequest(method, pathname, body = null, headers = {}) {
  const reqStream = new Readable({
    read() {
      if (body) {
        this.push(typeof body === "string" ? body : JSON.stringify(body));
      }
      this.push(null);
    }
  });

  reqStream.method = method;
  reqStream.url = pathname;
  reqStream.headers = {
    host: "localhost:3000",
    "content-type": "application/json",
    ...headers
  };
  reqStream.socket = { remoteAddress: "127.0.0.1" };
  return reqStream;
}

// Mock outgoing HTTP response
function createMockResponse() {
  const res = new EventEmitter();
  res.statusCode = 200;
  res.headers = {};
  res._body = "";

  res.setHeader = (key, val) => {
    res.headers[key.toLowerCase()] = val;
  };
  res.writeHead = (statusCode, headers = {}) => {
    res.statusCode = statusCode;
    Object.assign(res.headers, headers);
  };
  res.write = (chunk) => {
    res._body += chunk;
  };
  res.end = (chunk) => {
    if (chunk) res._body += chunk;
    res.emit("finish");
  };
  return res;
}

function handleRequest(req, res) {
  return new Promise((resolve) => {
    res.on("finish", () => {
      let parsed = null;
      try {
        parsed = JSON.parse(res._body);
      } catch {
        parsed = res._body;
      }
      resolve({
        statusCode: res.statusCode,
        headers: res.headers,
        body: parsed,
        raw: res._body
      });
    });

    // Invoke server's 'request' listener
    server.emit("request", req, res);
  });
}

async function runTests() {
  console.log("=================================================");
  console.log(" Running Hey Carmela Bilingual Lead System Tests");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}`);
      failed++;
    }
  }

  // Clear leads file for clean test run
  writeLeads([]);

  try {
    // 1. Test Config Endpoint
    console.log("--- Test 1: Config API ---");
    const configReq = createMockRequest("GET", "/api/config");
    const configRes = createMockResponse();
    const configResult = await handleRequest(configReq, configRes);
    assert(configResult.statusCode === 200, "Config endpoint returns HTTP 200");
    assert(configResult.body.bookingDestinationUrl !== undefined, "Site owner booking destination is exposed in config");

    // 2. Test English Lead Submission
    console.log("\n--- Test 2: English Lead Submission ---");
    const enSubmission = {
      name: "Marcus Vance",
      businessName: "Lone Star Heating & Air",
      email: "marcus@lonestarair.com",
      phone: "(512) 555-0199",
      priority: "Answering calls and messages",
      notes: "We miss about 25 calls a week during hot Texas summer afternoons.",
      language: "en"
    };

    const enReq = createMockRequest("POST", "/api/leads", enSubmission);
    const enRes = createMockResponse();
    const enResult = await handleRequest(enReq, enRes);

    assert(enResult.statusCode === 200, "HTTP 200 on English submission");
    assert(enResult.body.success === true, "English lead marked success");
    assert(
      enResult.body.message === "Thanks! We received your request and will email you to coordinate a demo.",
      "English confirmation matches exact required copy: 'Thanks! We received your request and will email you to coordinate a demo.'"
    );
    assert(Boolean(enResult.body.leadId), "Lead ID returned");

    // 3. Test Spanish Lead Submission
    console.log("\n--- Test 3: Spanish Lead Submission ---");
    const esSubmission = {
      name: "Mateo Rodríguez",
      businessName: "Climas y Plomería del Norte",
      email: "mateo@climasnorte.com",
      phone: "+52 81 8320 0000",
      priority: "Showing customers when their technician will arrive",
      notes: "Nuestros clientes siempre llaman para preguntar a qué hora llega el técnico.",
      language: "es"
    };

    const esReq = createMockRequest("POST", "/api/leads", esSubmission);
    const esRes = createMockResponse();
    const esResult = await handleRequest(esReq, esRes);

    assert(esResult.statusCode === 200, "HTTP 200 on Spanish submission");
    assert(esResult.body.success === true, "Spanish lead marked success");
    assert(
      esResult.body.message === "¡Gracias! Recibimos tu solicitud. Te escribiremos por correo para coordinar una demo.",
      "Spanish confirmation matches exact required copy: '¡Gracias! Recibimos tu solicitud. Te escribiremos por correo para coordinar una demo.'"
    );
    assert(Boolean(esResult.body.leadId), "Lead ID returned");

    // 4. Test Validation Failure (Missing Priority, Name, Invalid Email)
    console.log("\n--- Test 4: Validation & Error Handling ---");
    const invalidSubmission = {
      name: "",
      businessName: "",
      email: "invalid-email-format",
      language: "es"
    };
    const invalidReq = createMockRequest("POST", "/api/leads", invalidSubmission);
    const invalidRes = createMockResponse();
    const invalidResult = await handleRequest(invalidReq, invalidRes);

    assert(invalidResult.statusCode === 400, "HTTP 400 for invalid submission");
    assert(invalidResult.body.success === false, "Success flag is false");
    assert(Array.isArray(invalidResult.body.errors), "Errors array returned");
    assert(invalidResult.body.errors.length >= 3, "All missing/invalid fields detected");
    assert(invalidResult.body.message === "Por favor completa todos los campos requeridos.", "Localized Spanish error message returned");

    // 5. Verify Private Lead Inbox API (GET /api/leads)
    console.log("\n--- Test 5: Verify Both Submissions Reached Lead Inbox ---");
    const inboxReq = createMockRequest("GET", "/api/leads");
    const inboxRes = createMockResponse();
    const inboxResult = await handleRequest(inboxReq, inboxRes);

    assert(inboxResult.statusCode === 200, "HTTP 200 from GET /api/leads");
    assert(inboxResult.body.totalCount === 2, "Lead inbox total count is exactly 2");

    const leads = inboxResult.body.leads;
    const foundEn = leads.find(l => l.email === "marcus@lonestarair.com");
    assert(Boolean(foundEn), "English lead found in private lead inbox");
    if (foundEn) {
      assert(foundEn.language === "en", "English lead has language='en'");
      assert(foundEn.name === "Marcus Vance", "Name correctly recorded");
      assert(foundEn.businessName === "Lone Star Heating & Air", "Business name correctly recorded");
      assert(foundEn.priority === "Answering calls and messages", "Priority accurately captured");
      assert(Boolean(foundEn.submittedAt), "Submission timestamp captured");
    }

    const foundEs = leads.find(l => l.email === "mateo@climasnorte.com");
    assert(Boolean(foundEs), "Spanish lead found in private lead inbox");
    if (foundEs) {
      assert(foundEs.language === "es", "Spanish lead has language='es'");
      assert(foundEs.name === "Mateo Rodríguez", "Name correctly recorded");
      assert(foundEs.businessName === "Climas y Plomería del Norte", "Business name correctly recorded");
      assert(foundEs.priority === "Showing customers when their technician will arrive", "Priority accurately captured");
      assert(Boolean(foundEs.submittedAt), "Submission timestamp captured");
    }

    // 6. Verify Persistent File Storage on Disk
    console.log("\n--- Test 6: Verify Persistence in data/leads.json ---");
    const diskLeads = readLeads();
    assert(diskLeads.length === 2, "2 leads persisted to data/leads.json on disk");
    assert(diskLeads[0].id === enResult.body.leadId || diskLeads[1].id === enResult.body.leadId, "English lead present in leads.json file");
    assert(diskLeads[0].id === esResult.body.leadId || diskLeads[1].id === esResult.body.leadId, "Spanish lead present in leads.json file");

    // 7. Verify CSV Export Functionality
    console.log("\n--- Test 7: Verify CSV Export ---");
    const csvReq = createMockRequest("GET", "/api/leads?format=csv");
    const csvRes = createMockResponse();
    const csvResult = await handleRequest(csvReq, csvRes);
    assert(csvResult.statusCode === 200, "CSV export returns HTTP 200");
    assert(csvResult.raw.includes("Lone Star Heating & Air"), "CSV contains English lead business name");
    assert(csvResult.raw.includes("Climas y Plomería del Norte"), "CSV contains Spanish lead business name");

  } catch (err) {
    console.error("Test execution error:", err);
    failed++;
  }

  console.log("\n=================================================");
  console.log(` Test Summary: ${passed} Passed, ${failed} Failed`);
  console.log("=================================================\n");

  if (failed > 0) process.exit(1);
}

runTests();
