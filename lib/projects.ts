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
}

export const PROJECTS: Record<string, Project> = {
  '1': {
    id: '1',
    title: 'Event Ingestion & Analytics Platform',
    subtitle: 'High-throughput, multi-tenant event ingestion service written in Go',
    description: 'This project is a high-throughput, multi-tenant event ingestion service written in Go designed to accept user-activity events at scale and stream them into Apache Kafka. It serves as the gateway for an event-driven analytics pipeline, validating incoming JSON payloads and returning instant 202 Accepted acknowledgments to minimize client-facing latency. The platform is configured for local development via Docker Compose with a full infrastructure stack including Kafka (KRaft mode), TimescaleDB (for time-series historical data), Redis (for deduplication and real-time counts), and Kafka UI.',
    category: 'Backend / Systems',
    techStack: ['Go', 'Chi', 'Kafka', 'TimescaleDB', 'Redis', 'Docker'],
    techConcepts: [
      'Asynchronous Decoupling via Kafka',
      'Consistent Partition Hashing (tenant_id)',
      'Producer Throughput Tuning & Snappy compression',
      'Graceful Shutdown & Signal Trapping',
      'Structured Middleware Architecture'
    ],
    bulletPoints: [
      '**Engineered a high-throughput event ingestion API in Go** using the **Chi** router and structured logging (slog), exposing validation endpoints capable of ingesting single and bulk events with sub-millisecond route latency.',
      '**Architected Kafka-based event streaming** with partition hashing on tenant IDs to guarantee strict in-order message delivery per tenant, and tuned producer settings (**Snappy compression, batch size/timeouts**) to optimize bandwidth efficiency.',
      '**Built resilient system lifecycle management** by trapping **Unix signals (SIGINT, SIGTERM)**, allowing the service to gracefully drain active HTTP connections and flush buffered Kafka writer queues to guarantee zero data loss during container restarts.'
    ],
    color: '#00ff88',
    image: '/mockup.png',
  },
  '2': {
    id: '2',
    title: 'Virtual Classroom with ISL Support',
    subtitle: 'Real-time speech-to-gesture accessibility pipeline',
    description: 'An end-to-end, real-time speech-to-gesture accessibility pipeline that translates spoken classroom lectures into synchronized Indian Sign Language (ISL) 3D avatar animations. The system ingests streaming audio, processes it through local Whisper ASR models, and translates the transcribed English into structured ISL Glosses using a multi-tiered translation engine (PyTorch Seq2Seq LSTM with Attention, falling back to a Java Stanford Parser syntax analyzer, and a heuristics stop-word/lemmatizer pipeline). The system features an active learning loop that captures user corrections in a local SQLite database for model retraining, operates containerized via Docker and Kubernetes, and displays synchronized playback timeline streams on a Materialize-based frontend.',
    category: 'AI / Accessibility',
    techStack: ['Python', 'PyTorch', 'Whisper ASR', 'Java', 'Docker', 'Kubernetes'],
    techConcepts: [
      'Multi-Tiered Translation Pipeline (AI + Deterministic Fallbacks)',
      'Asynchronous Audio & Ingestion pipeline',
      'Continuous Retraining & Active Learning Loop',
      'Production Operations & Telemetry'
    ],
    bulletPoints: [
      '**Engineered a real-time speech-to-sign language translation pipeline** using PyTorch and Flask, transcribing spoken audio via Whisper ASR and generating synchronized 3D avatar sign animations for educational accessibility.',
      '**Designed a resilient, multi-tiered translation compiler** utilizing a Sequence-to-Sequence LSTM with Attention, an automated fallback to a Java-based Stanford Dependency Parser, and heuristic finger-spelling fallbacks.',
      '**Built an active learning MLOps framework** with a SQLite annotation datastore to collect user translation feedback, automated MLOps training harnesses, and deployed the highly available architecture using Docker and Kubernetes.'
    ],
    color: '#00e5ff',
    image: '/mockup.png',
  },
  '3': {
    id: '3',
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
      '**Architected a multi-agent software engineering simulator** using **FastAPI**, **Redis Pub/Sub**, and **SQLAlchemy**, running automated SDLC state machines with deterministic review gates.',
      '**Implemented an interactive browser-based IDE** utilizing **StackBlitz WebContainers (WASM)**, **Monaco Editor**, and **Xterm.js**, compiling and running agent-generated code sandboxed client-side.',
      '**Engineered budget and runtime safeguards**, including a hard-stop monitor terminating agent pipelines at 95% budget consumption and a 2x automatic retry recovery loop for agent crashes.'
    ],
    color: '#b300ff',
    image: '/mockup.png',
  },
  '4': {
    id: '4',
    title: 'AI Sentiment Intelligence Platform',
    subtitle: 'Full-stack data ingestion and analytical dashboard',
    description: 'AI Sentiment Intelligence Platform is a full-stack data ingestion and analytical dashboard designed to aggregate public sentiment across Delhi\'s 70 Legislative Assembly constituencies. The platform processes raw text data from news RSS feeds, YouTube videos, and social media networks. It utilizes Hugging Face NLP transformers to extract sentiment scores and stores findings in a relational PostgreSQL database. A custom political forecasting engine runs statistical algorithms on constituency-level scores to predict electoral shifts and highlights civic complaints through a dedicated field-reporting CRUD system.',
    category: 'Data Engineering / NLP',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Hugging Face', 'Apify'],
    techConcepts: [
      'Asynchronous Ingestion Pipeline',
      'NLP Sentiment Classification',
      'Electoral Forecasting Engine',
      'Relational Integrity at Scale',
      'API Cache Strategy'
    ],
    bulletPoints: [
      '**Architected a high-throughput sentiment analysis pipeline** (Node.js, PostgreSQL) parsing RSS news feeds, YouTube transcripts, and social media updates across 70 municipal zones.',
      '**Integrated Hugging Face NLP models to classify sentiment metrics**, designing mathematical aggregation models to weight social media, news, and civic feedback into predictive metrics.',
      '**Engineered robust background scraper tasks** using the Apify SDK and YouTube API, implementing dynamic request throttling and database query indexing to optimize retrieval speeds.'
    ],
    color: '#ff3366',
    image: '/mockup.png',
  },
  '5': {
    id: '5',
    title: 'Bid Discovery System',
    subtitle: 'Automated platform to scrape and analyze government bids',
    description: 'An automated, production-grade full-stack system designed to scrape, extract, analyze, and rank government bids from the Government e-Marketplace (GeM). The system features a NestJS-based scheduling and ingestion server that uses Playwright for web scraping, downloads and extracts content from nested PDF attachments, and processes them using the Google Gemini File API for context-rich, multi-document semantic scoring. The results, keyword associations, and confidence metrics are persisted in a PostgreSQL database and visualized in real-time on a responsive Next.js 14 dashboard.',
    category: 'Full-Stack / GenAI',
    techStack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Playwright', 'Gemini API'],
    techConcepts: [
      'Asynchronous Background Processing & Ingestion',
      'Multimodal AI Integration (Gemini)',
      'State Management & Data Caching (React Query)',
      'Clean Architecture & Domain Separation',
      'Relational Schema Design & ORM'
    ],
    bulletPoints: [
      '**Engineered a full-stack automated bid discovery platform** using Next.js 14, NestJS, and PostgreSQL, processing hundreds of government bids daily and reducing manual verification effort by **90%**.',
      '**Implemented an intelligent PDF ingestion pipeline** utilizing Playwright for dynamic web scraping and the Google Gemini File API to analyze complex, multi-page parent/child specification documents, achieving accurate relevance scoring.',
      '**Developed a robust asynchronous backend** with NestJS and TypeORM, configuring Docker containerization for reliable deployments and utilizing React Query on the frontend for optimized data fetching and state caching.'
    ],
    color: '#ffaa00',
    image: '/mockup.png',
  },
  '6': {
    id: '6',
    title: 'Lead Generation System',
    subtitle: 'Automated government official lead generation platform',
    description: 'An automated government official lead generation and transactional outreach platform. The backend is designed with a Clean Architecture approach in Python (FastAPI), showcasing Dependency Injection and SOLID principles. It crawls target domains, extracts public contact records from complex layouts and PDFs using BeautifulSoup and pdfplumber, structures the unstructured details via the OpenAI API, and validates the leads against custom business rules. It exports lead packages to Excel files, integrates with SendGrid SMTP to automate transactional email outreach, and exposes a high-throughput webhook listener to consume real-time delivery and open events to persist email interaction metrics in PostgreSQL.',
    category: 'Full-Stack / Architecture',
    techStack: ['FastAPI', 'React', 'PostgreSQL', 'OpenAI', 'SendGrid'],
    techConcepts: [
      'Clean Architecture & Dependency Injection',
      'Data Ingestion & Scraping Engine',
      'REST & Event-driven Webhook Listeners',
      'Database Schema Migration & ORM',
      'Real-time API Updates via WebSockets'
    ],
    bulletPoints: [
      '**Designed and developed a lead generation system** using FastAPI (Python) and React, adhering to Clean Architecture and SOLID principles to achieve a highly modular and extensible codebase.',
      '**Built a robust web crawling and text extraction engine** using BeautifulSoup, pdfplumber, and the OpenAI API, processing and parsing government websites/documents to extract and validate official contact leads.',
      '**Integrated SendGrid SMTP services with asynchronous webhook listeners** to manage transactional email campaigns, automatically tracking delivery and open states in a PostgreSQL database.'
    ],
    color: '#0066ff',
    image: '/mockup.png',
  },
};

export const PROJECT_IDS = ['1', '2', '3', '4', '5', '6'] as const;

export function getProject(id: string) {
  return PROJECTS[id] ?? null;
}
