export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  techStack: string[];
  techConcepts: string[];
  bulletPoints: string[];
  liveUrl?: string;
  color: string;
  image: string;
  githubUrl: string;
  media?: { type: 'image' | 'video'; url: string }[];
}

export const PROJECTS: Record<string, Project> = {
  '1': {
    id: '1',
    title: 'Multilingual AI Banking Kiosk',
    subtitle: 'Real-time voice-activated secure banking infrastructure',
    description: 'An end-to-end voice-activated banking kiosk designed to serve rural users across 3 regional dialects (English, Hinglish, Tanglish). It features a real-time WebSocket streaming pipeline using Deepgram Nova-3 for sub-100ms Speech-to-Text conversion, paired with a Redis-backed slot-filling state machine for dialogue management. The system integrates multimodal capabilities using Gemini Vision OCR to parse physical Aadhaar and PAN cards with >95% accuracy for automated onboarding, and includes a seamless escalation gateway that transfers low-confidence interactions to human support with full session telemetry preserved.',
    category: 'Voice AI / Full-Stack',
    techStack: ['Next.js', 'WebSockets', 'Redis', 'PostgreSQL', 'Deepgram', 'Gemini Vision'],
    techConcepts: [
      'Ultra-Low Latency Audio Streaming',
      'Slot-Filling State Machines (Redis)',
      'Multimodal Document OCR',
      'Warm Escalation Handoff Architecture',
      'Confidence-Score Dialect Gating'
    ],
    bulletPoints: [
      '**Built an end-to-end voice-activated AI application** allowing users to complete secure transactions across 3 regional dialects.',
      '**Prototyped new forms of human-AI interaction** via a Redis-backed state machine, achieving sub-100ms voice response times.',
      '**Optimized data flow** by extracting structured data from physical Aadhaar cards with >95% accuracy via Gemini Vision OCR.',
      '**Designed an escalation gateway** that transfers complex interactions to human support, ensuring high adaptability and user trust.'
    ],
    color: '#00ff88',
    image: '/mockup.png',
    githubUrl: 'https://github.com/Anshuu-Sharma/bankseva-ai',
    media: [
      { type: 'video', url: '/projects_info/bankseva/BharatVeer_iDEA2_0.mp4' },
      { type: 'image', url: '/projects_info/bankseva/demo2.png' },
      { type: 'image', url: '/projects_info/bankseva/demo3.png' }
    ],
  },
  '2': {
    id: '2',
    title: 'Distributed AI Math Video Engine',
    subtitle: 'Scalable automated educational media generation pipeline',
    description: 'A scalable Python engine that programmatically converts complex educational concepts into fully animated, narrated math explanation videos. The distributed architecture utilizes Celery across 4 isolated task queues (scripting, rendering, voice synthesis, and stitching) with MinIO S3 storage to ensure fault-tolerant parallel processing. It features exceptional security engineering via a custom AST-based static analyzer that safely sandboxes LLM-generated Manim code to prevent RCE attacks. The system achieves frame-perfect AV synchronization using dynamically injected FFmpeg setpts filters over Socket.io.',
    category: 'Distributed Systems / GenAI',
    techStack: ['Python', 'Celery', 'Redis', 'FastAPI', 'Manim', 'FFmpeg', 'Socket.io'],
    techConcepts: [
      'Distributed Task Queues (Celery/Redis)',
      'AST-Based Code Sandboxing (Security)',
      'Algorithmic AV Synchronization',
      'Self-Healing LLM Compile Loops',
      'Object Storage Infrastructure (MinIO)'
    ],
    bulletPoints: [
      '**Developed a scalable Python engine** that converts complex educational concepts into fully animated, narrated math explanation videos.',
      '**Integrated AI reasoning tightly with backend infrastructure**, safely sandboxing LLM-generated code to prevent RCE attacks.',
      '**Iterated on agent performance** by building an auto-correction loop that feeds runtime errors back to the LLM for self-healing.',
      '**Achieved frame-perfect AV sync** by dynamically adjusting video playback speeds using an FFmpeg setpts filter over Socket.io.'
    ],
    color: '#00e5ff',
    image: '/mockup.png',
    githubUrl: 'https://github.com/Anshuu-Sharma/3blue1brown-by-prompts',
    media: [
      { type: 'video', url: '/projects_info/DISTRIBUTED_AI_MATH_VIDEO_ENGINE/final.mp4' },
      { type: 'image', url: '/projects_info/DISTRIBUTED_AI_MATH_VIDEO_ENGINE/Screenshot_2026-06-25_at_10.31.12_PM.png' },
      { type: 'image', url: '/projects_info/DISTRIBUTED_AI_MATH_VIDEO_ENGINE/Screenshot_2026-06-25_at_10.31.24_PM.png' },
      { type: 'image', url: '/projects_info/DISTRIBUTED_AI_MATH_VIDEO_ENGINE/Screenshot_2026-06-25_at_10.53.24_PM.png' }
    ],
  },
  '3': {
    id: '3',
    title: 'AI Civic Grievance Platform',
    subtitle: 'Geospatial routing and automated compliance system',
    description: 'A Turborepo-based civic management platform that automatically routes citizen complaints to the correct municipal ward for rapid resolution. The system utilizes advanced geospatial routing via PostGIS spatial buffers and implements Gemini semantic clustering to deduplicate identical complaints geographically and contextually. It features robust distributed systems engineering, using mutex-locked cron workers to atomically enforce strict government SLAs, which auto-draft legal RTI documents upon deadline violations. Accessibility is expanded via a real-time multilingual voice agent integrating LiveKit WebRTC and Deepgram STT.',
    category: 'Backend / Spatial Engineering',
    techStack: ['Node.js', 'PostgreSQL', 'PostGIS', 'LiveKit', 'Deepgram', 'Turborepo'],
    techConcepts: [
      'Geospatial Data Engineering (PostGIS)',
      'Semantic Clustering & Deduplication',
      'Mutex-Locked Scheduled Cron Workers',
      'Monorepo Architecture (Turborepo)',
      'WebRTC Voice Pipelines'
    ],
    bulletPoints: [
      '**Built an AI-powered civic platform** that routes citizen complaints to the correct municipal ward via an intelligent backend system.',
      '**Developed robust retrieval systems** by integrating PostGIS spatial buffers and Gemini semantic clustering for deduplication.',
      '**Enforced strict SLAs atomically** via cron workers, auto-drafting RTI documents to ensure compliance with government timelines.',
      '**Deployed a real-time multilingual voice agent** integrating LiveKit WebRTC and Deepgram STT to expand intelligent user experiences.'
    ],
    color: '#ff3366',
    image: '/mockup.png',
    githubUrl: 'https://github.com/Anshuu-Sharma/civic-tech',
    media: [
      { type: 'image', url: '/projects_info/civic_tech/Screenshot_2026-06-26_at_12.47.23_PM.png' },
      { type: 'image', url: '/projects_info/civic_tech/Screenshot_2026-06-26_at_12.48.26_PM.png' },
      { type: 'image', url: '/projects_info/civic_tech/Screenshot_2026-06-26_at_12.48.59_PM.png' },
      { type: 'image', url: '/projects_info/civic_tech/Screenshot_2026-06-26_at_12.49.05_PM.png' },
      { type: 'image', url: '/projects_info/civic_tech/Screenshot_2026-06-26_at_1.01.04_PM.png' },
      { type: 'image', url: '/projects_info/civic_tech/Screenshot_2026-06-26_at_1.16.46_PM.png' },
      { type: 'image', url: '/projects_info/civic_tech/Screenshot_2026-06-26_at_1.18.32_PM.png' }
    ],
  },
  '4': {
    id: '4',
    title: 'Multi-Agent Simulator',
    subtitle: 'Event-driven multi-agent simulation framework modeling an SDLC',
    description: 'This project is an advanced, event-driven multi-agent simulation framework that models an entire software development company lifecycle (SDLC). Users act as the CEO, writing a project brief. The orchestrator triggers specialized AI agents (CPO, CTO, CFO, Developers, QA Reviewers) to negotiate requirement documents, budget limits, design technical architectures, write parallel frontend/backend code, and test the implementation. The frontend provides a full web-based IDE experience, mounting the agent-written code inside a WebAssembly container to build, run, and review features entirely in the browser.',
    category: 'Agentic AI / Full-Stack',
    techStack: ['FastAPI', 'Next.js', 'Redis', 'WebContainers', 'SQLAlchemy'],
    techConcepts: [
      'Deterministic State-Machine & Phase Gates',
      'Event-Driven Microservices Architecture',
      'Automated Workspace Git Management',
      'WebAssembly-Based Client Sandboxing',
      'Runaway Cost Safeguards & Resilient Retries'
    ],
    bulletPoints: [
      '**Designed and built an AI Agent application system** where specialized agents (CTO, Dev, QA) collaborate to build web applications.',
      '**Developed complex reasoning workflows** and phase-gated review checkpoints using a scalable Redis Pub/Sub event bus.',
      '**Iterated on agent capabilities** by enforcing strict token budgets and automatic retry loops to improve overall system reliability.',
      '**Sandboxed agent-generated code client-side** using StackBlitz WebContainers (WASM) to prototype secure in-browser testing.'
    ],
    color: '#b300ff',
    image: '/mockup.png',
    githubUrl: 'https://github.com/Anshuu-Sharma/Multi-agent-SaaS-builder',
    media: [
      { type: 'image', url: '/projects_info/Multi_Agent_system/Screenshot_2026-06-26_at_12.33.18_PM.png' },
      { type: 'image', url: '/projects_info/Multi_Agent_system/Screenshot_2026-06-26_at_12.33.36_PM.png' },
      { type: 'image', url: '/projects_info/Multi_Agent_system/Screenshot_2026-06-26_at_12.33.43_PM.png' },
      { type: 'image', url: '/projects_info/Multi_Agent_system/Screenshot_2026-06-26_at_12.33.48_PM.png' },
      { type: 'image', url: '/projects_info/Multi_Agent_system/Screenshot_2026-06-26_at_12.34.00_PM.png' }
    ],
  },
  '5': {
    id: '5',
    title: 'Event Ingestion & Analytics Platform',
    subtitle: 'High-throughput, multi-tenant event ingestion service written in Go',
    description: 'This project is a high-throughput, multi-tenant event ingestion service written in Go designed to accept user-activity events at scale and stream them into Apache Kafka. It serves as the gateway for an event-driven analytics pipeline, validating incoming JSON payloads and returning instant 202 Accepted acknowledgments to minimize client-facing latency. The platform is configured for local development via Docker Compose with a full infrastructure stack including Kafka (KRaft mode), TimescaleDB (for time-series historical data), Redis (for deduplication and real-time counts), and Kafka UI.',
    category: 'Backend / Systems Infrastructure',
    techStack: ['Go', 'Chi', 'Kafka', 'TimescaleDB', 'Redis', 'Docker'],
    techConcepts: [
      'Asynchronous Decoupling via Kafka',
      'Consistent Partition Hashing (tenant_id)',
      'Producer Throughput Tuning & Snappy compression',
      'Graceful Shutdown & Signal Trapping',
      'Structured Middleware Architecture'
    ],
    bulletPoints: [
      '**Engineered a high-throughput event ingestion API in Go** using the Chi router and structured logging, exposing validation endpoints with sub-millisecond route latency.',
      '**Architected Kafka-based event streaming** with partition hashing on tenant IDs to guarantee strict in-order message delivery per tenant.',
      '**Built resilient system lifecycle management** by trapping Unix signals (SIGINT, SIGTERM), allowing the service to gracefully drain active HTTP connections and flush buffered Kafka queues.'
    ],
    color: '#0066ff',
    image: '/mockup.png',
    githubUrl: 'https://github.com/Anshuu-Sharma/Event-ingestion-Analytics-Platform',
  },
  '6': {
    id: '6',
    title: 'Intelli-Credit Engine (Credex)',
    subtitle: 'AI credit risk platform with financial digital twin stress testing',
    description: 'An advanced AI-powered credit risk platform that builds financial digital twins to simulate stress testing (DSCR/ICR) under various macroeconomic revenue shocks. The backend is an asynchronous FastAPI service integrating state-of-the-art Document AI via Microsoft Table Transformer to parse scanned balance sheets. It leverages FinBERT for NLP-based risk sentiment analysis on financial news and applies SHAP (SHapley Additive exPlanations) to provide mathematically explainable credit scorecards. It also cross-verifies bank statements with GSTR records to detect fraud anomalies.',
    category: 'Fintech / Machine Learning',
    techStack: ['FastAPI', 'FinBERT', 'Table Transformer', 'PostgreSQL', 'SHAP'],
    techConcepts: [
      'Financial Digital Twin Simulation',
      'State-of-the-Art OCR (Table Transformer)',
      'Model Explainability (SHAP Overlays)',
      'Asynchronous Database Pooling (asyncpg)',
      'NLP Sentiment Risk Scoring'
    ],
    bulletPoints: [
      '**Architected an asynchronous FastAPI backend** to simulate financial stress-testing and digital twin generation for credit risk modeling.',
      '**Integrated state-of-the-art Document AI** using Microsoft Table Transformer to accurately parse complex, unstructured balance sheets.',
      '**Implemented SHAP explainability overlays** on top of credit scorecards to provide mathematically transparent risk assessments.',
      '**Deployed FinBERT NLP models** to analyze market sentiment and dynamically flag potential financial anomalies and fraud indicators.'
    ],
    color: '#ffaa00',
    image: '/mockup.png',
    githubUrl: 'https://github.com/Anshuu-Sharma/credex',
    media: [
      { type: 'video', url: '/projects_info/credex/credex.mp4' },
      { type: 'image', url: '/projects_info/credex/page-1.png' },
      { type: 'image', url: '/projects_info/credex/page-2.png' },
      { type: 'image', url: '/projects_info/credex/page-3.png' },
      { type: 'image', url: '/projects_info/credex/page-4.png' },
      { type: 'image', url: '/projects_info/credex/page-5.png' },
      { type: 'image', url: '/projects_info/credex/page-6.png' },
      { type: 'image', url: '/projects_info/credex/page-7.png' },
      { type: 'image', url: '/projects_info/credex/page-8.png' },
      { type: 'image', url: '/projects_info/credex/page-9.png' }
    ],
  },
};

export const PROJECT_IDS = ['1', '2', '3', '4', '5', '6'] as const;

export function getProject(id: string) {
  return PROJECTS[id] ?? null;
}
