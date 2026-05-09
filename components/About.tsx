'use client';

export default function About() {
  return (
    <section className="about-me" id="about">
      <div className="container">
        <div className="grid-8">
          <div className="grid-col-1"></div>
          <div className="about-me-content-1 grid-col-4">
            <p className="para-1 split-n-wrap">
              I&apos;m Ansh Sharma, a software engineer currently working as SDE‑1 at GydeXp.
              I build real‑time conversational AI agents and full‑stack products using Python,
              Node.js, React, Next.js, and modern cloud tooling. My work focuses on low‑latency
              voice experiences, robust backends, and high‑impact features that ship to production.
            </p>
          </div>
        </div>
      </div>
      <div className="more-about-me">
        <div className="slider-container">
          <h1>SDE-1 <span>@ GydeXp</span></h1>
          <h4>Nov 2025 – Current • Full-time</h4>
          <ul>
            <li>Built real-time conversational AI agent for hotel bookings using <strong>LiveKit WebRTC</strong>, <strong>Deepgram Nova-2</strong> &
             <strong>ElevenLabs Turbo</strong>.</li>
            <li>Reduced LLM prompt size by <strong>66%</strong> (3600→1200 tokens) and cut API costs by <strong>72%</strong> via prompt caching.</li>
            <li>Achieved <strong>95%</strong> tool-call accuracy via hallucination guardrails with mandatory tool result acknowledgment.</li>
          </ul>
        </div>
      </div>
      <div className="more-about-me">
        <div className="slider-container">
          <h1>SDE Intern <span>@ GydeXp</span></h1>
          <h4>Aug 2025 – Nov 2025 • Internship</h4>
          <ul>
            <li>Architected a scalable PMS using <strong>Node.js</strong>, <strong>Express</strong>, <strong>PostgreSQL</strong> with SOLID principles.</li>
            <li>Built high-performance web portals with Next.js, React, <strong>Tailwind</strong>, <strong>Zustand</strong> & <strong>TanStack Query</strong>.</li>
            <li>Engineered real-time booking features using <strong>Socket.io</strong> and Sequelize for live synchronization.</li>
          </ul>
        </div>
      </div>
      <div className="more-about-me">
        <div className="slider-container">
          <h1>AI Automation Intern <span>@ Vogic AI</span></h1>
          <h4>Aug 2025 – Nov 2025 • Remote Part-Time</h4>
          <ul>
            <li>Architected a full-stack AI platform using React, TypeScript, and FastAPI with PostgreSQL</li>
            <li>Engineered AI-powered crawlers using <strong>OpenAI GPT-4</strong> for structured data extraction</li>
            <li>Built marketing automation engine with SendGrid for personalized campaigns & real-time analytics</li>
          </ul>
        </div>
      </div>
      
      <div className="container">
        <div className="grid-8">
          <div className="grid-col-3"></div>
          <div className="about-me-content-2 grid-col-4">
            <p className="para-2 split-n-wrap">
              Recently I&apos;ve architected scalable PMS systems, shipped reservation voice
              agents that integrate LiveKit, ElevenLabs, Deepgram, and Gemini, and designed APIs
              and databases that comfortably handle production traffic. I enjoy working across
              the stack—from prompt design and LLM tooling to Node/Express services, PostgreSQL,
              and polished React/Next.js frontends.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
