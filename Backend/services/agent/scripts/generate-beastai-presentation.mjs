import pptxgen from "pptxgenjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, "../../../../BeastAI_Project_Presentation.pptx");

const ppt = new pptxgen();
ppt.layout = "LAYOUT_WIDE";
ppt.author = "BeastAI Project Team";
ppt.company = "BeastAI";
ppt.subject = "College project presentation with SDG and PO mapping";
ppt.title = "BeastAI - Multi-Agent AI Productivity Assistant";
ppt.lang = "en-US";
ppt.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "en-US"
};
ppt.defineSlideMaster({
  title: "MASTER",
  background: { color: "F7F8FA" },
  objects: [
    { rect: { x: 0, y: 0, w: 13.333, h: 0.12, fill: { color: "0F766E" }, line: { color: "0F766E" } } },
    { line: { x: 0.62, y: 7.08, w: 12.1, h: 0, line: { color: "D7DEE5", width: 0.7 } } },
    { text: { text: "BEASTAI  /  PROJECT PRESENTATION", options: { x: 0.62, y: 7.14, w: 4.2, h: 0.16, fontFace: "Aptos", fontSize: 7, color: "718096", charSpacing: 1.2, margin: 0 } } }
  ],
  slideNumber: { x: 12.18, y: 7.12, color: "718096", fontFace: "Aptos", fontSize: 8 }
});

const C = {
  ink: "14212B",
  slate: "51606D",
  teal: "0F766E",
  tealDark: "115E59",
  mint: "D9F3EE",
  orange: "F59E0B",
  orangeLight: "FFF1D6",
  blue: "2563EB",
  blueLight: "E7EEFF",
  red: "DC5A5A",
  redLight: "FCE8E8",
  white: "FFFFFF",
  paper: "F7F8FA",
  line: "D7DEE5",
  gray: "E8EDF1"
};

function text(slide, value, x, y, w, h, options = {}) {
  slide.addText(value, {
    x, y, w, h, margin: 0, fontFace: options.fontFace || "Aptos",
    fontSize: options.fontSize || 15, color: options.color || C.ink,
    breakLine: false, fit: "shrink", valign: options.valign || "mid",
    bold: options.bold || false, italic: options.italic || false,
    align: options.align || "left", charSpacing: options.charSpacing || 0,
    bullet: options.bullet, paraSpaceAfterPt: options.paraSpaceAfterPt,
    isTextBox: true
  });
}

function title(slide, kicker, heading, subheading = "") {
  text(slide, kicker.toUpperCase(), 0.68, 0.42, 5.5, 0.22, { fontSize: 8, color: C.teal, bold: true, charSpacing: 1.5 });
  text(slide, heading, 0.66, 0.72, 11.7, 0.55, { fontSize: 26, bold: true, color: C.ink });
  if (subheading) text(slide, subheading, 0.68, 1.35, 11.5, 0.32, { fontSize: 11, color: C.slate });
}

function pill(slide, label, x, y, w, color, fill) {
  slide.addShape(ppt.ShapeType.roundRect, { x, y, w, h: 0.34, rectRadius: 0.06, fill: { color: fill }, line: { color: fill } });
  text(slide, label, x, y + 0.01, w, 0.25, { fontSize: 9, bold: true, color, align: "center" });
}

function card(slide, x, y, w, h, heading, body, accent = C.teal, fill = C.white) {
  slide.addShape(ppt.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.04, fill: { color: fill }, line: { color: C.line, width: 0.8 } });
  slide.addShape(ppt.ShapeType.rect, { x, y, w: 0.08, h, fill: { color: accent }, line: { color: accent } });
  text(slide, heading, x + 0.23, y + 0.2, w - 0.42, 0.32, { fontSize: 14, bold: true });
  text(slide, body, x + 0.23, y + 0.62, w - 0.42, h - 0.78, { fontSize: 11, color: C.slate, valign: "top" });
}

function bulletList(slide, items, x, y, w, lineHeight = 0.58, color = C.slate, fontSize = 13) {
  items.forEach((item, index) => {
    const top = y + index * lineHeight;
    slide.addShape(ppt.ShapeType.ellipse, { x, y: top + 0.14, w: 0.11, h: 0.11, fill: { color: C.orange }, line: { color: C.orange } });
    text(slide, item, x + 0.25, top, w - 0.25, lineHeight - 0.05, { fontSize, color, valign: "top" });
  });
}

function tag(slide, label, x, y, color = C.teal, fill = C.mint) {
  pill(slide, label, x, y, Math.max(0.8, label.length * 0.075 + 0.35), color, fill);
}

function arrow(slide, x, y, w, color = C.orange) {
  slide.addShape(ppt.ShapeType.chevron, { x, y, w, h: 0.28, fill: { color }, line: { color } });
}

function addCover() {
  const slide = ppt.addSlide();
  slide.background = { color: C.ink };
  slide.addShape(ppt.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 0.16, fill: { color: C.orange }, line: { color: C.orange } });
  slide.addShape(ppt.ShapeType.arc, { x: 9.55, y: -0.6, w: 4.8, h: 4.8, adjustPoint: 0.2, line: { color: C.teal, width: 2.5, transparency: 15 }, fill: { color: C.ink, transparency: 100 } });
  slide.addShape(ppt.ShapeType.arc, { x: 10.25, y: 0.1, w: 3.5, h: 3.5, adjustPoint: 0.2, line: { color: C.orange, width: 1.3, transparency: 10 }, fill: { color: C.ink, transparency: 100 } });
  text(slide, "COLLEGE PROJECT  /  2026", 0.85, 1.02, 4.8, 0.24, { fontSize: 10, color: C.orange, bold: true, charSpacing: 1.8 });
  text(slide, "BeastAI", 0.82, 1.58, 8.0, 0.86, { fontSize: 44, color: C.white, bold: true, fontFace: "Aptos Display" });
  text(slide, "A multi-agent AI productivity assistant", 0.88, 2.55, 8.2, 0.42, { fontSize: 20, color: "B8D8D4" });
  text(slide, "One conversational workspace for chat, search, coding, documents, images and presentations.", 0.88, 3.2, 7.4, 0.55, { fontSize: 13, color: "D6E1E5", valign: "top" });
  slide.addShape(ppt.ShapeType.line, { x: 0.88, y: 4.18, w: 6.6, h: 0, line: { color: C.teal, width: 1.6 } });
  text(slide, "TEAM MEMBERS", 0.88, 4.42, 2.0, 0.18, { fontSize: 8, color: C.orange, bold: true, charSpacing: 1.2 });
  text(slide, "Lakshay Tyagi  —  2302901540065", 0.88, 4.68, 4.25, 0.21, { fontSize: 9.5, color: C.white });
  text(slide, "Keshav Walia  —  2302901540060", 0.88, 4.96, 4.25, 0.21, { fontSize: 9.5, color: C.white });
  text(slide, "Kartik Tomar  —  2302901540058", 0.88, 5.24, 4.25, 0.21, { fontSize: 9.5, color: C.white });
  text(slide, "Manas Rautela  —  2302901540067", 0.88, 5.52, 4.25, 0.21, { fontSize: 9.5, color: C.white });
  text(slide, "Guide: Mr Anoop Kumar", 5.35, 4.68, 3.0, 0.21, { fontSize: 10, color: "D6E1E5" });
  text(slide, "Department: Data Science", 5.35, 5.04, 3.0, 0.21, { fontSize: 10, color: "D6E1E5" });
  text(slide, "ABESIT Group of Institution", 5.35, 5.4, 3.25, 0.21, { fontSize: 10, color: "D6E1E5" });
  const nodes = [[9.5, 4.25, C.orange], [10.65, 3.1, C.teal], [11.82, 4.25, C.blue], [10.65, 5.4, C.red]];
  nodes.forEach(([x, y, color]) => slide.addShape(ppt.ShapeType.ellipse, { x, y, w: 0.52, h: 0.52, fill: { color }, line: { color: C.white, width: 1.3 } }));
  slide.addShape(ppt.ShapeType.line, { x: 9.98, y: 4.5, w: 0.7, h: -1.0, line: { color: "80A5A7", width: 1.2 } });
  slide.addShape(ppt.ShapeType.line, { x: 11.15, y: 3.62, w: 0.7, h: 0.88, line: { color: "80A5A7", width: 1.2 } });
  slide.addShape(ppt.ShapeType.line, { x: 11.15, y: 5.02, w: 0.7, h: -0.72, line: { color: "80A5A7", width: 1.2 } });
  slide.addShape(ppt.ShapeType.ellipse, { x: 10.22, y: 4.02, w: 0.86, h: 0.86, fill: { color: C.white }, line: { color: C.teal, width: 2 } });
  text(slide, "AI", 10.22, 4.22, 0.86, 0.26, { fontSize: 15, color: C.tealDark, bold: true, align: "center" });
  text(slide, "BEASTAI", 9.6, 6.35, 3.2, 0.24, { fontSize: 9, color: "9FB4BA", bold: true, charSpacing: 2.2, align: "center" });
}

function addProblem() {
  const slide = ppt.addSlide("MASTER");
  title(slide, "01 / Context", "The productivity problem", "AI capability is fragmented across tools, formats and workflows.");
  card(slide, 0.72, 2.0, 3.75, 2.25, "Tool switching", "Users move between separate chat, search, coding, document and design tools.", C.red, C.redLight);
  card(slide, 4.78, 2.0, 3.75, 2.25, "Context loss", "Important conversation history and uploaded documents are disconnected from the task.", C.orange, C.orangeLight);
  card(slide, 8.84, 2.0, 3.75, 2.25, "Technical friction", "Creating useful outputs requires knowing multiple interfaces, formats and integrations.", C.blue, C.blueLight);
  text(slide, "Design opportunity", 0.75, 5.05, 2.0, 0.25, { fontSize: 11, color: C.teal, bold: true, charSpacing: 1.1 });
  text(slide, "A single conversational entry point can coordinate specialized AI capabilities while preserving context and output quality.", 0.75, 5.42, 11.4, 0.55, { fontSize: 21, bold: true, color: C.ink });
}

function addObjectives() {
  const slide = ppt.addSlide("MASTER");
  title(slide, "02 / Direction", "Objectives and project scope", "BeastAI is designed as a practical AI workspace, not a single-purpose chatbot.");
  const items = [
    ["01", "Unify workflows", "Offer one interface for conversation, search, code, files and generated media."],
    ["02", "Route intelligently", "Select the most suitable specialized agent for each request."],
    ["03", "Ground answers", "Use uploaded PDF content and retrieval to support document-based responses."],
    ["04", "Deliver artifacts", "Return useful outputs such as code previews, PDFs, images and PPTX files."]
  ];
  items.forEach(([number, heading, body], index) => {
    const x = 0.75 + (index % 2) * 6.05;
    const y = 2.0 + Math.floor(index / 2) * 1.92;
    slide.addShape(ppt.ShapeType.ellipse, { x, y: y + 0.05, w: 0.52, h: 0.52, fill: { color: index % 2 ? C.orange : C.teal }, line: { color: index % 2 ? C.orange : C.teal } });
    text(slide, number, x, y + 0.17, 0.52, 0.18, { fontSize: 10, color: C.white, bold: true, align: "center" });
    text(slide, heading, x + 0.78, y, 4.8, 0.28, { fontSize: 16, bold: true });
    text(slide, body, x + 0.78, y + 0.42, 4.85, 0.55, { fontSize: 11, color: C.slate, valign: "top" });
  });
  tag(slide, "Conversational", 0.78, 6.05, C.teal, C.mint);
  tag(slide, "Multi-agent", 2.1, 6.05, C.blue, C.blueLight);
  tag(slide, "Cloud-ready", 3.38, 6.05, C.orange, C.orangeLight);
  tag(slide, "Artifact-focused", 4.78, 6.05, C.red, C.redLight);
}

function addFeatures() {
  const slide = ppt.addSlide("MASTER");
  title(slide, "03 / Product", "One interface, many capabilities", "Specialized agents turn natural-language requests into focused outputs.");
  const features = [
    ["Chat", "Conversation, explanations and persistent history", C.teal, C.mint],
    ["Search", "Current web information and image results", C.blue, C.blueLight],
    ["Coding", "Generated projects, file tabs and live previews", C.orange, C.orangeLight],
    ["PDF + RAG", "Document generation and grounded Q&A", C.red, C.redLight],
    ["Vision", "Image generation and uploaded-image analysis", C.tealDark, "E2F2EF"],
    ["PPT", "Structured presentation generation", C.blue, C.blueLight]
  ];
  features.forEach(([heading, body, accent, fill], index) => {
    const x = 0.74 + (index % 3) * 4.18;
    const y = 2.0 + Math.floor(index / 3) * 2.0;
    card(slide, x, y, 3.76, 1.5, heading, body, accent, fill);
  });
  text(slide, "Value proposition", 0.75, 6.1, 2.2, 0.24, { fontSize: 10, color: C.teal, bold: true, charSpacing: 1.1 });
  text(slide, "The user speaks in tasks; BeastAI coordinates the technical workflow behind the scenes.", 2.45, 6.03, 9.9, 0.38, { fontSize: 16, bold: true });
}

function addArchitecture() {
  const slide = ppt.addSlide("MASTER");
  title(slide, "04 / Architecture", "A modular service architecture", "Independent services keep authentication, conversations, agents and billing separated.");
  const layers = [
    ["USER EXPERIENCE", "React 19  /  Vite  /  Redux Toolkit", C.teal, C.mint],
    ["ENTRY POINT", "API Gateway  /  CORS  /  Auth middleware  /  User header forwarding", C.orange, C.orangeLight],
    ["DOMAIN SERVICES", "Auth Service     Chat Service     Agent Service     Billing Service", C.blue, C.blueLight],
    ["DATA + INTEGRATIONS", "MongoDB  /  Redis  /  AWS S3  /  Qdrant  /  Tavily  /  LLM providers", C.red, C.redLight]
  ];
  layers.forEach(([label, body, accent, fill], index) => {
    const y = 1.92 + index * 1.12;
    slide.addShape(ppt.ShapeType.roundRect, { x: 1.0, y, w: 11.35, h: 0.78, rectRadius: 0.04, fill: { color: fill }, line: { color: accent, width: 1.1 } });
    text(slide, label, 1.25, y + 0.12, 2.1, 0.18, { fontSize: 8, color: accent, bold: true, charSpacing: 1.1 });
    text(slide, body, 3.35, y + 0.1, 8.55, 0.35, { fontSize: 15, bold: true, color: C.ink });
    if (index < layers.length - 1) arrow(slide, 6.38, y + 0.84, 0.55, C.line);
  });
  text(slide, "Why this structure?", 1.0, 6.55, 2.2, 0.2, { fontSize: 10, color: C.teal, bold: true, charSpacing: 1.1 });
  text(slide, "Clear ownership boundaries make the system easier to extend, operate and explain.", 3.0, 6.48, 8.6, 0.32, { fontSize: 14, color: C.slate });
}

function addWorkflow() {
  const slide = ppt.addSlide("MASTER");
  title(slide, "05 / Intelligence", "The LangGraph agent workflow", "A router decides which specialized capability should handle the request.");
  const steps = [
    ["01", "Input", "Prompt\n+ optional file", C.teal, C.mint],
    ["02", "Router", "Manual choice\nor model route", C.orange, C.orangeLight],
    ["03", "Agent", "Chat / Search /\nCoding / PDF / Vision", C.blue, C.blueLight],
    ["04", "Output", "Message, artifact,\nimage or document", C.red, C.redLight],
    ["05", "State", "Conversation\nhistory saved", C.tealDark, "E2F2EF"]
  ];
  steps.forEach(([number, heading, body, accent, fill], index) => {
    const x = 0.65 + index * 2.52;
    slide.addShape(ppt.ShapeType.roundRect, { x, y: 2.25, w: 1.92, h: 1.75, rectRadius: 0.05, fill: { color: fill }, line: { color: accent, width: 1.1 } });
    text(slide, number, x + 0.18, 2.47, 0.4, 0.22, { fontSize: 9, color: accent, bold: true });
    text(slide, heading, x + 0.18, 2.84, 1.55, 0.27, { fontSize: 15, bold: true });
    text(slide, body, x + 0.18, 3.24, 1.56, 0.48, { fontSize: 10, color: C.slate, valign: "top" });
    if (index < steps.length - 1) arrow(slide, x + 1.98, 2.98, 0.38, C.orange);
  });
  text(slide, "Conditional routing", 0.75, 4.8, 2.1, 0.22, { fontSize: 10, color: C.teal, bold: true, charSpacing: 1.1 });
  bulletList(slide, [
    "A selected agent can be invoked directly for predictable control.",
    "Automatic routing uses the request and file type to choose a path.",
    "Each specialized node ends cleanly after producing its response."
  ], 0.77, 5.18, 11.2, 0.47, C.slate, 12);
}

function addImplementation() {
  const slide = ppt.addSlide("MASTER");
  title(slide, "06 / Engineering", "Modules and implementation", "The stack combines modern web engineering with AI orchestration and cloud services.");
  card(slide, 0.72, 2.0, 3.8, 3.85, "Frontend", "React 19\nVite\nRedux Toolkit\nAxios\nFirebase Auth\nMonaco Editor\nMarkdown + syntax highlighting", C.teal, C.mint);
  card(slide, 4.76, 2.0, 3.8, 3.85, "Backend", "Express services\nAPI Gateway\nLangGraph workflow\nMongoDB persistence\nRedis sessions and limits\nMulter file handling", C.orange, C.orangeLight);
  card(slide, 8.8, 2.0, 3.8, 3.85, "Integrations", "Groq, Gemini and OpenRouter\nAWS S3 object storage\nQdrant vector search\nTavily web search\nRazorpay payments\nDocker Compose support", C.blue, C.blueLight);
  text(slide, "Engineering principle", 0.75, 6.25, 2.2, 0.2, { fontSize: 10, color: C.teal, bold: true, charSpacing: 1.1 });
  text(slide, "Use the right tool for each stage: route, reason, retrieve, generate, store and render.", 2.75, 6.18, 9.7, 0.32, { fontSize: 15, bold: true });
}

function addRag() {
  const slide = ppt.addSlide("MASTER");
  title(slide, "07 / Capability", "Document intelligence and multimodal work", "BeastAI works across unstructured documents, images and generated artifacts.");
  const rag = [
    ["Upload", "PDF is received through the chat workflow", C.teal],
    ["Extract", "Text is parsed and split into useful chunks", C.orange],
    ["Embed", "Chunks become vectors for similarity search", C.blue],
    ["Retrieve", "Qdrant returns relevant document context", C.red],
    ["Answer", "The model responds using grounded context", C.tealDark]
  ];
  rag.forEach(([heading, body, accent], index) => {
    const x = 0.68 + index * 2.47;
    slide.addShape(ppt.ShapeType.roundRect, { x, y: 2.0, w: 1.84, h: 1.52, rectRadius: 0.04, fill: { color: index % 2 ? C.orangeLight : C.mint }, line: { color: accent, width: 1 } });
    text(slide, heading, x + 0.16, 2.22, 1.45, 0.25, { fontSize: 13, bold: true, color: accent });
    text(slide, body, x + 0.16, 2.68, 1.47, 0.53, { fontSize: 10, color: C.slate, valign: "top" });
    if (index < rag.length - 1) arrow(slide, x + 1.91, 2.63, 0.38, C.line);
  });
  card(slide, 0.72, 4.25, 3.8, 1.4, "Image understanding", "Uploaded images are routed to a multimodal analysis agent.", C.red, C.redLight);
  card(slide, 4.76, 4.25, 3.8, 1.4, "Generated media", "Vision, PDF and PPT agents turn prompts into reusable outputs.", C.blue, C.blueLight);
  card(slide, 8.8, 4.25, 3.8, 1.4, "Developer artifacts", "Coding output is presented as files with an interactive preview.", C.teal, C.mint);
  text(slide, "Grounding is a design choice: retrieve relevant evidence before answering document questions.", 0.75, 6.25, 11.5, 0.3, { fontSize: 14, color: C.slate, italic: true });
}

function addReliability() {
  const slide = ppt.addSlide("MASTER");
  title(slide, "08 / Trust", "Security, reliability and resource management", "The current design includes practical controls while leaving room for formal hardening.");
  const controls = [
    ["Identity", "Firebase token verification and authenticated gateway forwarding", C.teal, C.mint],
    ["Abuse control", "Redis-backed sessions, agent limits and credit deduction", C.orange, C.orangeLight],
    ["Payments", "Razorpay order flow with signature verification", C.blue, C.blueLight],
    ["Data handling", "S3 storage with time-limited download URLs", C.red, C.redLight]
  ];
  controls.forEach(([heading, body, accent, fill], index) => {
    const x = 0.75 + (index % 2) * 6.05;
    const y = 2.0 + Math.floor(index / 2) * 1.55;
    card(slide, x, y, 5.55, 1.15, heading, body, accent, fill);
  });
  slide.addShape(ppt.ShapeType.roundRect, { x: 0.75, y: 5.48, w: 11.65, h: 0.85, rectRadius: 0.04, fill: { color: "FFF7E8" }, line: { color: "F4D69B", width: 0.8 } });
  text(slide, "Next trust layer", 1.02, 5.67, 1.55, 0.2, { fontSize: 10, color: C.orange, bold: true, charSpacing: 1 });
  text(slide, "Add structured observability, privacy documentation, input validation and evaluation metrics before production scale.", 2.68, 5.59, 9.15, 0.35, { fontSize: 13, color: C.ink, bold: true });
}

function addSDG() {
  const slide = ppt.addSlide("MASTER");
  title(slide, "09 / Impact", "SDG alignment", "The strongest contribution is to innovation infrastructure, with practical education and productivity benefits.");
  const sdgs = [
    ["SDG 9", "Industry, Innovation and Infrastructure", "PRIMARY", "Modular services, LangGraph orchestration, vector retrieval and cloud integrations demonstrate an extensible digital AI infrastructure.", C.teal, C.mint],
    ["SDG 4", "Quality Education", "SUPPORTING", "Conversational explanations, coding assistance and document Q&A can make learning resources easier to explore.", C.blue, C.blueLight],
    ["SDG 8", "Decent Work and Economic Growth", "SUPPORTING", "Automation of coding, search and document creation can reduce repetitive work and improve individual productivity.", C.orange, C.orangeLight]
  ];
  sdgs.forEach(([number, heading, label, body, accent, fill], index) => {
    const y = 1.95 + index * 1.48;
    slide.addShape(ppt.ShapeType.roundRect, { x: 0.75, y, w: 11.65, h: 1.12, rectRadius: 0.04, fill: { color: fill }, line: { color: accent, width: index === 0 ? 1.5 : 0.8 } });
    text(slide, number, 1.02, y + 0.18, 1.0, 0.32, { fontSize: 20, bold: true, color: accent });
    text(slide, label, 1.02, y + 0.65, 1.15, 0.16, { fontSize: 7, bold: true, color: accent, charSpacing: 1.1 });
    text(slide, heading, 2.3, y + 0.17, 4.3, 0.27, { fontSize: 14, bold: true });
    text(slide, body, 6.05, y + 0.18, 5.85, 0.52, { fontSize: 11, color: C.slate, valign: "top" });
  });
  text(slide, "Contribution claim", 0.75, 6.55, 1.8, 0.18, { fontSize: 9, color: C.teal, bold: true, charSpacing: 1.1 });
  text(slide, "BeastAI provides enabling infrastructure; impact depends on responsible deployment and real user outcomes.", 2.45, 6.48, 9.6, 0.3, { fontSize: 13, color: C.slate, italic: true });
}

function addPO() {
  const slide = ppt.addSlide("MASTER");
  title(slide, "10 / Graduate Attributes", "Program Outcome mapping", "Mapping uses the standard NBA PO1-PO12 terminology; strength reflects repository evidence.");
  const rows = [
    ["PO1", "Engineering knowledge", "Strong", "React, Express, databases, distributed services and LLM integration"],
    ["PO2", "Problem analysis", "Strong", "Agent routing, intent classification, retrieval and usage controls"],
    ["PO3", "Design / development", "Strong", "Modular microservices and specialized agent workflow"],
    ["PO4", "Investigation", "Strong", "PDF extraction, embeddings, Qdrant search and multimodal analysis"],
    ["PO5", "Modern tool usage", "Strong", "LangGraph, Firebase, S3, Razorpay, Redis, Qdrant and Vite"],
    ["PO6", "Engineer and society", "Partial", "Education and productivity access; outcomes need user evidence"],
    ["PO7", "Environment", "Indirect", "No direct sustainability measurement in current implementation"],
    ["PO8", "Ethics", "Partial", "Grounded prompts, auth and payment checks; governance needs expansion"],
    ["PO9", "Individual / team work", "Partial", "Modular ownership boundaries; collaboration evidence not recorded"],
    ["PO10", "Communication", "Strong", "Markdown, artifacts, PDFs, images, PPTX and live previews"],
    ["PO11", "Project management", "Supporting", "Credits, plans, rate limits and service separation"],
    ["PO12", "Life-long learning", "Supporting", "Extensible agent design enables ongoing capability growth"]
  ];
  const x = [0.75, 1.55, 4.0, 5.55];
  const widths = [0.68, 2.3, 1.35, 6.72];
  ["PO", "Outcome", "Strength", "Project evidence"].forEach((header, index) => {
    slide.addShape(ppt.ShapeType.rect, { x: x[index], y: 1.82, w: widths[index], h: 0.34, fill: { color: C.ink }, line: { color: C.ink } });
    text(slide, header, x[index] + 0.08, 1.89, widths[index] - 0.16, 0.15, { fontSize: 8, color: C.white, bold: true });
  });
  rows.forEach((row, index) => {
    const y = 2.16 + index * 0.365;
    const fill = index % 2 ? "F0F3F5" : C.white;
    row.forEach((value, cell) => {
      slide.addShape(ppt.ShapeType.rect, { x: x[cell], y, w: widths[cell], h: 0.365, fill: { color: fill }, line: { color: C.line, width: 0.4 } });
      text(slide, value, x[cell] + 0.08, y + 0.08, widths[cell] - 0.16, 0.18, { fontSize: cell === 3 ? 8.1 : 8.6, color: cell === 2 && value === "Strong" ? C.teal : C.slate, bold: cell === 0 || cell === 2 });
    });
  });
}

function addResults() {
  const slide = ppt.addSlide("MASTER");
  title(slide, "11 / Reflection", "Current results, limitations and future scope", "The prototype demonstrates breadth; the next phase should add measured quality and production readiness.");
  card(slide, 0.72, 1.92, 3.8, 3.72, "What works today", "Multi-agent chat workflow\nPersistent conversations\nPDF and image uploads\nCoding artifacts with preview\nSearch and image results\nGenerated PDF, PPT and media outputs", C.teal, C.mint);
  card(slide, 4.76, 1.92, 3.8, 3.72, "Known limitations", "External model and cloud dependency\nNo repository benchmark results\nLimited formal observability\nPrivacy and governance need documentation\nAccessibility and cost metrics need study", C.red, C.redLight);
  card(slide, 8.8, 1.92, 3.8, 3.72, "Next phase", "Automated tests and evaluation sets\nTracing, latency and cost dashboards\nPrivacy, safety and audit controls\nAccessible UX improvements\nCaching and deployment hardening", C.orange, C.orangeLight);
  text(slide, "Takeaway", 0.75, 6.22, 1.2, 0.2, { fontSize: 10, color: C.teal, bold: true, charSpacing: 1.1 });
  text(slide, "BeastAI is a working foundation for a unified, extensible AI productivity platform.", 2.02, 6.15, 10.2, 0.35, { fontSize: 16, bold: true });
}

function addThankYou() {
  const slide = ppt.addSlide();
  slide.background = { color: C.tealDark };
  slide.addShape(ppt.ShapeType.rect, { x: 0, y: 6.92, w: 13.333, h: 0.16, fill: { color: C.orange }, line: { color: C.orange } });
  text(slide, "Thank you", 0.8, 2.15, 11.7, 0.78, { fontSize: 38, color: C.white, bold: true, align: "center" });
  text(slide, "Questions and discussion", 0.8, 3.12, 11.7, 0.35, { fontSize: 18, color: "C9E4DF", align: "center" });
  text(slide, "BeastAI  /  A multi-agent AI productivity assistant", 0.8, 6.35, 11.7, 0.25, { fontSize: 10, color: "B0D0CA", align: "center", charSpacing: 1.2 });
}

addCover();
addProblem();
addObjectives();
addFeatures();
addArchitecture();
addWorkflow();
addImplementation();
addRag();
addReliability();
addSDG();
addPO();
addResults();
addThankYou();

await ppt.writeFile({ fileName: outputPath });
console.log(`Created ${outputPath}`);
console.log(`Slides: ${ppt._slides.length}`);
