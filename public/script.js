/**
 * Hey Carmela - Client Application & Walkthrough Engine
 * Bilingual support (EN / ES), Walkthrough step transitions, Form intake & local persistence
 */

const CLIENT_CONFIG = {
  bookingDestinationUrl: ""
};

const TRANSLATIONS = {
  en: {
    metaTitle: "Hey Carmela | AI Business Assistant for Home Service Companies",
    metaDesc: "Hey Carmela answers calls and messages, books jobs on your calendar, shows customers when their technician will arrive, and follows up on invoices. Built for home service businesses.",
    navWalkthrough: "Walkthrough",
    navHowItWorks: "How it works",
    navInbox: "Lead Inbox",
    audienceLine: "Built for home service businesses.",
    heroHeadline: "From the first call to the final payment.",
    heroDescription: "Hey Carmela answers calls and messages, books jobs on your calendar, shows customers when their technician will arrive, and follows up on invoices.",
    btnRequestDemo: "Request a demo",
    walkthroughTag: "One Complete Package",
    capabilitiesHeading: "Give your customers an answer at every step",
    walkthroughSubheading: "Follow the same AC repair service call across four simple steps.",
    step1Tab: "1. Answer",
    step2Tab: "2. Book",
    step3Tab: "3. Track arrival",
    step4Tab: "4. Get paid",
    step1Tag: "Phone · SMS · WhatsApp",
    step2Tag: "Live Calendar · Automatic Lock",
    step3Tag: "Live GPS · Map Link",
    step4Tag: "1-Click Payment · Follow-up",
    card1Title: "“Can I book a service call?”",
    card1Body: "Carmela answers calls, texts, and WhatsApp messages while your team is out on jobs. She handles routine questions and brings in your team when a customer needs a person.",
    card2Title: "“When can you come out?”",
    card2Body: "Carmela checks your calendar, books or reschedules the job, and sends a confirmation and reminder.",
    card3Title: "“Is my technician on the way?”",
    card3Body: "When the technician heads out, Carmela texts the customer a link to track their technician on a live map and see the estimated arrival time.",
    card4Title: "“How do I pay?”",
    card4Body: "Carmela can request a deposit, send the invoice after the job, and follow up if there’s a balance due.",
    exampleCallLabel: "AC Repair Service Call",
    step1Story: "David calls because his air conditioning stopped blowing cold air on an 88° afternoon. Carmela answers immediately, checks his issue, and provides instant booking options.",
    step2Story: "Carmela inspects the dispatch calendar, reserves today’s 2:00 PM slot with technician Carlos, and texts David an instant booking confirmation with automated reminders.",
    step3Story: "When Carlos departs for David’s home, Carmela texts David a live tracking link showing Carlos’s van moving on the map with a real-time 18-minute arrival countdown.",
    step4Story: "With the AC repaired, Carmela sends the $240 invoice with one-tap payment options. If the balance remains open, she courteously follows up automatically.",
    btnPrevStep: "Previous",
    btnNextStep: "Next Step",
    visual1Header: "Inbound Customer Inquiry",
    visual1Pill: "Instant AI Response",
    visual1CallFrom: "Incoming Call: David Miller",
    visual1CallStatus: "Answered in 1 ring · Audio transcription active",
    visual1Automated: "Carmela · Automated · 10:15 AM",
    visual1PhoneBadge: "📞 Phone Calls",
    visual1SmsBadge: "💬 SMS Text",
    visual1WhatsappBadge: "🟢 WhatsApp",
    visualCustomerMsg: "Broken AC unit making loud banging sounds in the attic. Can someone come out today?",
    visualCarmelaMsg: "Hi David! Yes, technician Carlos is scheduled for your visit at 2:00 PM. Live map link below.",
    visual2Header: "Live Dispatch Calendar",
    visual2Pill: "Automated Booking",
    visual2ConfirmTitle: "Confirmation & Reminder Scheduled",
    visual2ConfirmText: "SMS sent to David. Automatic reminder queued for 1:00 PM.",
    heroVisualLabel: "Example · Technician on the way · Estimated arrival: 18 minutes",
    heroVisualSr: "Illustrative phone screen showing customer service conversation, technician live tracking map, and 18-minute estimated arrival time.",
    visualAssistantBadge: "Apex HVAC Assistant",
    visualActiveStatus: "Active",
    visualTechRole: "HVAC Specialist",
    visualEtaPill: "18 min",
    visualTechOnWay: "Technician on the way",
    visualInputPlaceholder: "Message Carmela...",
    visual4Header: "Instant Invoice & Balance Follow-Up",
    visual4Pill: "Paid Seamlessly",
    visual4JobTitle: "AC Diagnostic & Run Capacitor Replacement",
    visual4Status: "Sent via SMS",
    visual4FollowupTitle: "Automated Payment Follow-Up",
    visual4FollowupText: "If invoice remains unpaid after 48h, Carmela sends a courteous reminder text with payment link.",
    exampleHeading: "See how it works",
    exampleScenarioBadge: "Workflow in Action",
    exampleBody: "A customer calls about a broken AC. Carmela books the job and sends a confirmation. On service day, the customer gets a text with a live map and an estimated arrival time. After the job, Carmela sends the invoice and follows up if it’s still unpaid.",
    flowStep1: "1. Customer Calls Broken AC",
    flowStep2: "2. Calendar Booked & Confirmed",
    flowStep3: "3. Live Map & ETA Text",
    flowStep4: "4. Invoice & Follow-up",
    finalHeadline: "You do the work. Carmela keeps things moving.",
    finalDescription: "See what Hey Carmela can handle from the moment a customer calls your business.",
    formHeading: "Tell us about your business",
    formIntro: "Tell us what you’d like Carmela to handle. We’ll use your answers to make the demo relevant to your business.",
    labelName: "Your name",
    labelBusinessName: "Business name",
    labelEmail: "Work email",
    labelPhone: "Phone number",
    labelOptional: "(optional)",
    labelPriority: "What would you like help with first?",
    instructionPriority: "Select one option:",
    priorityOpt1: "Answering calls and messages",
    priorityOpt2: "Booking jobs and sending reminders",
    priorityOpt3: "Showing customers when their technician will arrive",
    priorityOpt4: "Sending invoices and following up on payments",
    priorityOpt5: "I’m still exploring",
    labelNotes: "Anything else we should know?",
    formSuccessTitle: "Request Confirmed",
    formConfirmation: "Thanks! We received your request and will email you to coordinate a demo.",
    formErrorGeneric: "Something went wrong saving your request. Please try again.",
    errNameRequired: "Please enter your name.",
    errBusinessRequired: "Please enter your business name.",
    errEmailRequired: "Please enter a valid work email address.",
    errPriorityRequired: "Please select what you would like help with first.",
    phName: "Jane Doe",
    phBusiness: "Apex Heating & Air",
    phEmail: "jane@apexheating.com",
    phPhone: "(555) 234-5678",
    phNotes: "E.g., We have 4 service vans and miss calls during peak summer hours...",
    footerCopy: "© 2026 Hey Carmela. All rights reserved."
  },
  es: {
    metaTitle: "Hey Carmela | Asistente de IA para empresas de servicios a domicilio",
    metaDesc: "Hey Carmela atiende llamadas y mensajes, agenda servicios en tu calendario, les muestra a tus clientes cuándo llegará el técnico y da seguimiento a las facturas. Para empresas de servicios a domicilio.",
    navWalkthrough: "Recorrido",
    navHowItWorks: "Así funciona",
    navInbox: "Buzón de prospectos",
    audienceLine: "Para empresas de servicios a domicilio.",
    heroHeadline: "Desde la primera llamada hasta el último pago.",
    heroDescription: "Hey Carmela atiende llamadas y mensajes, agenda servicios en tu calendario, les muestra a tus clientes cuándo llegará el técnico y da seguimiento a las facturas.",
    btnRequestDemo: "Solicita una demo",
    walkthroughTag: "Un Paquete Completo",
    capabilitiesHeading: "Dales a tus clientes una respuesta en cada paso",
    walkthroughSubheading: "Acompaña un servicio de reparación de aire acondicionado en cuatro pasos.",
    step1Tab: "1. Atiende",
    step2Tab: "2. Agenda",
    step3Tab: "3. Consulta la llegada",
    step4Tab: "4. Cobra",
    step1Tag: "Llamadas · SMS · WhatsApp",
    step2Tag: "Calendario en vivo · Cita asegurada",
    step3Tag: "GPS en vivo · Enlace con mapa",
    step4Tag: "Pago en 1 clic · Seguimiento",
    card1Title: "«¿Puedo agendar una visita?»",
    card1Body: "Carmela atiende llamadas, mensajes de texto y WhatsApp mientras tu equipo está trabajando. Responde preguntas frecuentes y pasa la conversación a tu equipo cuando hace falta.",
    card2Title: "«¿Cuándo pueden venir?»",
    card2Body: "Carmela revisa tu calendario, agenda o cambia la cita y envía una confirmación y un recordatorio.",
    card3Title: "«¿Ya viene el técnico?»",
    card3Body: "Cuando el técnico sale hacia el domicilio, Carmela le envía al cliente un enlace por mensaje de texto para ver su ubicación en tiempo real y consultar la hora estimada de llegada.",
    card4Title: "«¿Cómo hago el pago?»",
    card4Body: "Carmela puede solicitar un anticipo, enviar la factura al terminar el trabajo y dar seguimiento si queda un saldo pendiente.",
    exampleCallLabel: "Servicio de Reparación de Aire",
    step1Story: "David llama porque su aire acondicionado dejó de enfriar en una tarde calurosa de verano. Carmela responde de inmediato, registra el problema y le ofrece opciones de cita al instante.",
    step2Story: "Carmela consulta el calendario de servicio, agenda la visita de las 2:00 PM de hoy con el técnico Carlos y le envía a David una confirmación automática con recordatorios por mensaje.",
    step3Story: "Cuando Carlos sale hacia el domicilio de David, Carmela le envía por mensaje un enlace para ver la camioneta en tiempo real sobre el mapa con una cuenta regresiva de 18 minutos.",
    step4Story: "Con el aire reparado, Carmela envía la factura de $240 con pago en un toque. Si el saldo sigue pendiente, da seguimiento cortés y automático hasta liquidarlo.",
    btnPrevStep: "Anterior",
    btnNextStep: "Siguiente paso",
    visual1Header: "Solicitud entrante de cliente",
    visual1Pill: "Respuesta IA instantánea",
    visual1CallFrom: "Llamada entrante: David Miller",
    visual1CallStatus: "Atendida en 1 timbre · Transcripción de audio activa",
    visual1Automated: "Carmela · Automatizado · 10:15 AM",
    visual1PhoneBadge: "📞 Llamadas telefónicas",
    visual1SmsBadge: "💬 Mensajes SMS",
    visual1WhatsappBadge: "🟢 WhatsApp",
    visualCustomerMsg: "Se descompuso el aire acondicionado y hace ruidos fuertes en el ático. ¿Pueden venir hoy?",
    visualCarmelaMsg: "¡Hola David! Sí, agendamos la visita del técnico Carlos para hoy a las 2:00 PM. Aquí tu mapa en vivo.",
    visual2Header: "Calendario de despacho en vivo",
    visual2Pill: "Cita automatizada",
    visual2ConfirmTitle: "Confirmación y recordatorio programados",
    visual2ConfirmText: "SMS enviado a David. Recordatorio automático programado para la 1:00 PM.",
    heroVisualLabel: "Ejemplo · Técnico en camino · Llegada estimada: 18 minutos",
    heroVisualSr: "Pantalla ilustrativa de teléfono que muestra la conversación del servicio, mapa de seguimiento en tiempo real y tiempo estimado de llegada de 18 minutos.",
    visualAssistantBadge: "Asistente Climas Apex",
    visualActiveStatus: "Activo",
    visualTechRole: "Especialista en Climas",
    visualEtaPill: "18 min",
    visualTechOnWay: "Técnico en camino",
    visualInputPlaceholder: "Escribe a Carmela...",
    visual4Header: "Factura instantánea y cobro pendiente",
    visual4Pill: "Cobro sin fricción",
    visual4JobTitle: "Diagnóstico de aire y reemplazo de capacitor",
    visual4Status: "Enviado por SMS",
    visual4FollowupTitle: "Seguimiento automático de pago",
    visual4FollowupText: "Si la factura sigue pendiente tras 48 horas, Carmela envía un mensaje de recordatorio cortés con enlace de pago.",
    exampleHeading: "Así funciona",
    exampleScenarioBadge: "Flujo en acción",
    exampleBody: "Un cliente llama porque se le descompuso el aire acondicionado. Carmela agenda la visita y envía una confirmación. El día del servicio, el cliente recibe un mensaje con un mapa en tiempo real y la hora estimada de llegada. Al terminar el trabajo, Carmela envía la factura y da seguimiento si sigue pendiente.",
    flowStep1: "1. Cliente llama por aire descompuesto",
    flowStep2: "2. Cita agendada y confirmada",
    flowStep3: "3. Mensaje con mapa en vivo y llegada",
    flowStep4: "4. Factura y seguimiento de pago",
    finalHeadline: "Tú haces el trabajo. Carmela se encarga del seguimiento.",
    finalDescription: "Descubre qué puede hacer Hey Carmela desde el momento en que un cliente llama a tu negocio.",
    formHeading: "Cuéntanos sobre tu negocio",
    formIntro: "Cuéntanos en qué te gustaría que Carmela te ayudara. Usaremos tus respuestas para preparar una demo enfocada en tu negocio.",
    labelName: "Tu nombre",
    labelBusinessName: "Nombre de tu negocio",
    labelEmail: "Correo electrónico de trabajo",
    labelPhone: "Número de teléfono",
    labelOptional: "(opcional)",
    labelPriority: "¿Con qué te gustaría recibir ayuda primero?",
    instructionPriority: "Selecciona una opción:",
    priorityOpt1: "Atender llamadas y mensajes",
    priorityOpt2: "Agendar servicios y enviar recordatorios",
    priorityOpt3: "Mostrarles a tus clientes cuándo llegará el técnico",
    priorityOpt4: "Enviar facturas y dar seguimiento a los pagos",
    priorityOpt5: "Todavía estoy explorando",
    labelNotes: "¿Hay algo más que debamos saber?",
    formSuccessTitle: "Solicitud recibida",
    formConfirmation: "¡Gracias! Recibimos tu solicitud. Te escribiremos por correo para coordinar una demo.",
    formErrorGeneric: "Ocurrió un error al guardar tu solicitud. Por favor intenta de nuevo.",
    errNameRequired: "Por favor ingresa tu nombre.",
    errBusinessRequired: "Por favor ingresa el nombre de tu negocio.",
    errEmailRequired: "Por favor ingresa un correo de trabajo válido.",
    errPriorityRequired: "Por favor selecciona en qué te gustaría recibir ayuda primero.",
    phName: "Juan Pérez",
    phBusiness: "Servicios Apex Climas y Plomería",
    phEmail: "juan@serviciosapex.com",
    phPhone: "(55) 1234-5678",
    phNotes: "Ej., Tenemos 4 camionetas de servicio y perdemos llamadas en temporada alta...",
    footerCopy: "© 2026 Hey Carmela. Todos los derechos reservados."
  }
};

const STEP_DATA = {
  1: {
    channelKey: "step1Tag",
    titleKey: "card1Title",
    bodyKey: "card1Body",
    storyKey: "step1Story"
  },
  2: {
    channelKey: "step2Tag",
    titleKey: "card2Title",
    bodyKey: "card2Body",
    storyKey: "step2Story"
  },
  3: {
    channelKey: "step3Tag",
    titleKey: "card3Title",
    bodyKey: "card3Body",
    storyKey: "step3Story"
  },
  4: {
    channelKey: "step4Tag",
    titleKey: "card4Title",
    bodyKey: "card4Body",
    storyKey: "step4Story"
  }
};

let currentLang = "en";
let currentStep = 1;

document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  initWalkthrough();
  initCtaSmoothScroll();
  initPriorityRadioHighlighting();
  initFormHandling();
  fetchServerConfig();
});

async function fetchServerConfig() {
  try {
    const res = await fetch("/api/config");
    if (res.ok) {
      const data = await res.json();
      if (data.bookingDestinationUrl) {
        CLIENT_CONFIG.bookingDestinationUrl = data.bookingDestinationUrl;
      }
    }
  } catch (err) {
    // fallback
  }
}

function initLanguage() {
  const savedLang = localStorage.getItem("hey_carmela_lang");
  if (savedLang === "es" || savedLang === "en") {
    setLanguage(savedLang, false);
  } else {
    setLanguage("en", false);
  }

  const btnEn = document.getElementById("lang-en");
  const btnEs = document.getElementById("lang-es");

  if (btnEn) btnEn.addEventListener("click", () => setLanguage("en", true));
  if (btnEs) btnEs.addEventListener("click", () => setLanguage("es", true));
}

function setLanguage(lang, shouldSave = true) {
  if (lang !== "en" && lang !== "es") lang = "en";
  currentLang = lang;

  if (shouldSave) {
    try {
      localStorage.setItem("hey_carmela_lang", lang);
    } catch (e) {}
  }

  document.documentElement.lang = lang;

  const btnEn = document.getElementById("lang-en");
  const btnEs = document.getElementById("lang-es");
  if (btnEn && btnEs) {
    if (lang === "en") {
      btnEn.classList.add("active");
      btnEn.setAttribute("aria-pressed", "true");
      btnEs.classList.remove("active");
      btnEs.setAttribute("aria-pressed", "false");
    } else {
      btnEs.classList.add("active");
      btnEs.setAttribute("aria-pressed", "true");
      btnEn.classList.remove("active");
      btnEn.setAttribute("aria-pressed", "false");
    }
  }

  const dict = TRANSLATIONS[lang];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.getAttribute("data-i18n-ph");
    if (dict[key]) {
      el.setAttribute("placeholder", dict[key]);
    }
  });

  if (dict.metaTitle) document.title = dict.metaTitle;
  const metaDescEl = document.querySelector('meta[name="description"]');
  if (metaDescEl && dict.metaDesc) {
    metaDescEl.setAttribute("content", dict.metaDesc);
  }

  updateRadioLabelsAndValues(lang);
  renderWalkthroughStep(currentStep);
}

function updateRadioLabelsAndValues(lang) {
  const radioLabels = document.querySelectorAll(".priority-card-label");
  const keys = [
    { opt: "priorityOpt1", defaultVal: "Answering calls and messages" },
    { opt: "priorityOpt2", defaultVal: "Booking jobs and sending reminders" },
    { opt: "priorityOpt3", defaultVal: "Showing customers when their technician will arrive" },
    { opt: "priorityOpt4", defaultVal: "Sending invoices and following up on payments" },
    { opt: "priorityOpt5", defaultVal: "I’m still exploring" }
  ];

  radioLabels.forEach((labelEl, index) => {
    const input = labelEl.querySelector('input[type="radio"]');
    const textSpan = labelEl.querySelector('.radio-text');
    const keyData = keys[index];
    if (input && textSpan && keyData) {
      const localizedText = TRANSLATIONS[lang][keyData.opt];
      textSpan.textContent = localizedText;
      input.value = TRANSLATIONS.en[keyData.opt];
      input.setAttribute("data-localized-label", localizedText);
    }
  });
}

/**
 * Walkthrough engine: handles clicking steps, previous/next buttons,
 * and switching active visual panels and text.
 */
function initWalkthrough() {
  const tabs = document.querySelectorAll(".walkthrough-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const step = parseInt(tab.getAttribute("data-step"), 10);
      if (step) {
        setStep(step);
      }
    });
  });

  const prevBtn = document.getElementById("prev-step-btn");
  const nextBtn = document.getElementById("next-step-btn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentStep > 1) {
        setStep(currentStep - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentStep < 4) {
        setStep(currentStep + 1);
      } else {
        // From step 4, scroll down to the intake form
        const formEl = document.getElementById("demo-form");
        if (formEl) {
          formEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  }

  renderWalkthroughStep(1);
}

function setStep(step) {
  currentStep = step;

  // Update tabs
  document.querySelectorAll(".walkthrough-tab").forEach(t => {
    const s = parseInt(t.getAttribute("data-step"), 10);
    const isActive = s === step;
    t.classList.toggle("active", isActive);
    t.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  // Update visual panels
  document.querySelectorAll(".walkthrough-visual-panel").forEach((panel, idx) => {
    panel.classList.toggle("active", idx + 1 === step);
  });

  renderWalkthroughStep(step);
}

function renderWalkthroughStep(step) {
  const dict = TRANSLATIONS[currentLang];
  const data = STEP_DATA[step];
  if (!data) return;

  const stepNumberEl = document.getElementById("stage-step-number");
  const channelTagEl = document.getElementById("stage-channel-tag");
  const titleEl = document.getElementById("stage-title");
  const bodyEl = document.getElementById("stage-body");
  const storyEl = document.getElementById("stage-ac-text");
  const prevBtn = document.getElementById("prev-step-btn");
  const nextBtn = document.getElementById("next-step-btn");

  if (stepNumberEl) {
    stepNumberEl.textContent = currentLang === "es" ? `Paso ${step} de 4` : `Step ${step} of 4`;
  }
  if (channelTagEl) channelTagEl.textContent = dict[data.channelKey];
  if (titleEl) titleEl.textContent = dict[data.titleKey];
  if (bodyEl) bodyEl.textContent = dict[data.bodyKey];
  if (storyEl) storyEl.textContent = dict[data.storyKey];

  if (prevBtn) prevBtn.disabled = step === 1;
  if (nextBtn) {
    const nextTextSpan = nextBtn.querySelector("span");
    if (nextTextSpan) {
      if (step === 4) {
        nextTextSpan.textContent = dict.btnRequestDemo;
      } else {
        nextTextSpan.textContent = dict.btnNextStep;
      }
    }
  }
}

function initCtaSmoothScroll() {
  document.querySelectorAll(".js-cta-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const targetId = btn.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
          const firstInput = document.getElementById("field-name");
          if (firstInput) {
            setTimeout(() => firstInput.focus(), 500);
          }
        }
      }
    });
  });
}

function initPriorityRadioHighlighting() {
  const radioLabels = document.querySelectorAll(".priority-card-label");
  radioLabels.forEach(label => {
    const radio = label.querySelector('input[type="radio"]');
    if (radio) {
      radio.addEventListener("change", () => {
        radioLabels.forEach(l => l.classList.remove("selected"));
        if (radio.checked) {
          label.classList.add("selected");
          const errEl = document.getElementById("err-priority");
          if (errEl) errEl.classList.remove("show");
        }
      });
    }
  });
}

function initFormHandling() {
  const form = document.getElementById("lead-intake-form");
  const successBox = document.getElementById("form-success");
  const errorBox = document.getElementById("form-error");
  const submitBtn = document.getElementById("submit-btn");
  const btnSpinner = submitBtn ? submitBtn.querySelector(".btn-spinner") : null;

  if (!form) return;

  ["field-name", "field-business", "field-email"].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener("input", () => {
        input.classList.remove("input-error");
        const errEl = document.getElementById("err-" + id.replace("field-", ""));
        if (errEl) errEl.classList.remove("show");
      });
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (successBox) successBox.classList.add("hidden");
    if (errorBox) errorBox.classList.add("hidden");

    const nameInput = document.getElementById("field-name");
    const businessInput = document.getElementById("field-business");
    const emailInput = document.getElementById("field-email");
    const phoneInput = document.getElementById("field-phone");
    const notesInput = document.getElementById("field-notes");
    const selectedRadio = form.querySelector('input[name="priority"]:checked');

    const name = nameInput ? nameInput.value.trim() : "";
    const businessName = businessInput ? businessInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const notes = notesInput ? notesInput.value.trim() : "";
    const priority = selectedRadio ? selectedRadio.value : "";
    const priorityLocalized = selectedRadio ? selectedRadio.getAttribute("data-localized-label") || priority : "";

    let hasError = false;
    const dict = TRANSLATIONS[currentLang];

    if (!name) {
      hasError = true;
      if (nameInput) nameInput.classList.add("input-error");
      const err = document.getElementById("err-name");
      if (err) {
        err.textContent = dict.errNameRequired;
        err.classList.add("show");
      }
    }

    if (!businessName) {
      hasError = true;
      if (businessInput) businessInput.classList.add("input-error");
      const err = document.getElementById("err-business");
      if (err) {
        err.textContent = dict.errBusinessRequired;
        err.classList.add("show");
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      hasError = true;
      if (emailInput) emailInput.classList.add("input-error");
      const err = document.getElementById("err-email");
      if (err) {
        err.textContent = dict.errEmailRequired;
        err.classList.add("show");
      }
    }

    if (!priority) {
      hasError = true;
      const err = document.getElementById("err-priority");
      if (err) {
        err.textContent = dict.errPriorityRequired;
        err.classList.add("show");
      }
    }

    if (hasError) {
      const firstInvalid = form.querySelector(".input-error") || document.getElementById("err-priority");
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      if (btnSpinner) btnSpinner.classList.remove("hidden");
    }

    const payload = {
      name,
      businessName,
      email,
      phone,
      priority,
      priorityLocalized,
      notes,
      language: currentLang,
      submittedAt: new Date().toISOString()
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        backupLeadLocally(payload);

        if (successBox) {
          const successTextEl = document.getElementById("form-success-text");
          if (successTextEl) {
            successTextEl.textContent = dict.formConfirmation;
          }
          successBox.classList.remove("hidden");
          successBox.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        form.reset();
        document.querySelectorAll(".priority-card-label").forEach(l => l.classList.remove("selected"));
        form.style.display = "none";

        const destination = result.bookingDestinationUrl || CLIENT_CONFIG.bookingDestinationUrl;
        if (destination && destination.trim()) {
          setTimeout(() => {
            window.location.href = destination;
          }, 2500);
        }
      } else {
        throw new Error(result.message || "Failed to save submission");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      if (errorBox) {
        const errorTextEl = document.getElementById("form-error-text");
        if (errorTextEl) {
          errorTextEl.textContent = dict.formErrorGeneric;
        }
        errorBox.classList.remove("hidden");
        errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        if (btnSpinner) btnSpinner.classList.add("hidden");
      }
    }
  });
}

function backupLeadLocally(leadData) {
  try {
    const existing = JSON.parse(localStorage.getItem("hey_carmela_local_leads") || "[]");
    existing.unshift(leadData);
    localStorage.setItem("hey_carmela_local_leads", JSON.stringify(existing));
  } catch (e) {}
}
