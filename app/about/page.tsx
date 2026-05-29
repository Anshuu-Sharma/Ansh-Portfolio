"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  VscGithubInverted,
  VscMail,
  VscCode,
  VscTerminal,
  VscDatabase,
  VscTools,
  VscBriefcase,
  VscRocket,
  VscServer,
} from 'react-icons/vsc';
import { FaLinkedin, FaTrophy, FaMedal } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';

// ─── Animation Variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const viewportOpts = { once: true, margin: '-60px' };

// ─── Sub-Components ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-dm-mono tracking-[0.2em] uppercase text-[#00894d] mb-3 select-none">
      <span className="w-4 h-px bg-[#00894d]" />
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-orbitron font-semibold tracking-wide text-neutral-900">
      {children}
    </h2>
  );
}

function SkillPill({ label }: { label: string }) {
  return (
    <span className="px-3 py-1.5 text-[11px] font-dm-mono font-bold uppercase tracking-wider bg-white border-2 border-[#0a0a0a] text-[#0a0a0a] shadow-[2px_2px_0_#0a0a0a] hover:bg-[#00c37b] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0_#0a0a0a] transition-all duration-150 cursor-default">
      {label}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {

  // ── Data ──────────────────────────────────────────────────────────────────
  const experience = [
    {
      title: 'SDE Intern',
      company: 'HireVed',
      logo: '/images/hireved.png',
      period: 'Feb 2026 – Present',
      isCurrent: true,
      bullets: [
        'Architected end-to-end system design for a multi-portal recruiter marketplace serving Employers, Recruiters, and Admins.',
        'Engineered AI-powered backend modules for candidate screening & job-posting copilot, reducing recruiter effort by 60% via LLMs.',
        'Developed 70+ REST APIs covering RBAC and real-time interactions using Node.js, Express, PostgreSQL, and JWT authorization.',
        'Led integration testing across 3 interconnected portals, improving deployment stability and reducing critical API failures.',
      ],
    },
    {
      title: 'SDE Intern',
      company: 'GydeXP',
      logo: '/images/gydexp.png',
      period: 'Aug 2025 – Feb 2026',
      isCurrent: false,
      bullets: [
        'Enabled automated voice-based hotel reservations by architecting a real-time conversational AI booking agent with strict guardrails.',
        'Reduced API infrastructure costs and enhanced system reliability by implementing LLM prompt caching & result validation.',
        'Achieved 95% tool-call accuracy across 500+ conversations and prevented duplicate reservations via idempotency flags.',
        'Delivered secure system access and real-time data sync across hotel, guest, and staff platforms via a scalable backend.',
      ],
    },
    {
      title: 'AI Automation Intern',
      company: 'VOGIC AI',
      logo: '/images/vogic.png',
      period: 'Aug 2025 – Nov 2025',
      isCurrent: false,
      bullets: [
        'Architected an end-to-end AI outbound sales platform (React, TypeScript, FastAPI) automating government lead discovery and outreach.',
        'Built a GEM portal automation system monitoring India\'s Government e-Marketplace in real-time and scoring live bid listings.',
        'Developed a live sales dashboard using WebSockets and TanStack Query with LLM-powered presentation builder.',
      ],
    },
  ];

  const skills = [
    {
      icon: <VscTerminal size={20} className="text-[#00c37b]" />,
      label: 'Languages',
      items: ['C++', 'Python', 'JavaScript', 'TypeScript', 'SQL'],
    },
    {
      icon: <VscRocket size={20} className="text-[#00c37b]" />,
      label: 'AI / ML',
      items: ['LLMs', 'Gemini API', 'OpenAI Whisper', 'PyTorch', 'Agentic AI', 'Prompt Engineering', 'RAG', 'NLP', 'STT/TTS', 'LSTM'],
    },
    {
      icon: <VscCode size={20} className="text-[#00c37b]" />,
      label: 'Full Stack',
      items: ['Node.js', 'Express.js', 'FastAPI', 'Flask', 'React.js', 'Next.js', 'GraphQL', 'WebSockets', 'Socket.IO', 'TanStack Query'],
    },
    {
      icon: <VscDatabase size={20} className="text-[#00c37b]" />,
      label: 'Databases & DevOps',
      items: ['PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'Azure', 'CI/CD'],
    },
    {
      icon: <VscTools size={20} className="text-[#00c37b]" />,
      label: 'Tools & Platforms',
      items: ['Git', 'SendGrid', 'Firebase', 'Google Cloud', 'LiveKit', 'Deepgram', 'ElevenLabs'],
    },
    {
      icon: <VscServer size={20} className="text-[#00c37b]" />,
      label: 'Core CS',
      items: ['DSA', 'System Design', 'Operating Systems', 'DBMS', 'OOP', 'Computer Networks'],
    },
  ];

  const achievements = [
    {
      rank: 'Winner',
      icon: <FaTrophy className="text-[#00c37b]" size={28} />,
      event: 'Adobe Express Add-ons Hackathon, NSUT',
      detail: '600+ participants',
      project: 'Built DevSnap — automated developer portfolio generator',
      year: '2025',
    },
    {
      rank: 'Winner',
      icon: <FaTrophy className="text-[#00c37b]" size={28} />,
      event: 'Hack-A-Tone, IIT Delhi × GydeXP',
      detail: '3000+ participants',
      project: 'Built LegalSetu — AI multilingual legal assistant',
      year: '2025',
    },
    {
      rank: 'Winner',
      icon: <FaTrophy className="text-[#00c37b]" size={28} />,
      event: 'IIT Delhi Alumni Day Hackathon 2025',
      detail: '500+ participants',
      project: 'Presented GydeXP — AI voice agent & hotel PMS',
      year: '2025',
    },
    {
      rank: '2nd Runner-Up',
      icon: <FaMedal className="text-amber-500" size={28} />,
      event: 'Industrial Ideathon 2025, GNCTD × NSUT',
      detail: '2500+ participants',
      project: 'Built Raahi — presented before Delhi CM & IAS officers',
      year: '2025',
    },
    {
      rank: '2nd Runner-Up',
      icon: <FaMedal className="text-amber-500" size={28} />,
      event: 'CodeClash 2.0 @ Google Office, Gurugram',
      detail: '4000+ participants',
      project: 'National hackathon at Google\'s India HQ',
      year: '2025',
    },
  ];

  const education = [
    {
      degree: 'B.Tech in Computer Science Engineering (CSE)',
      institution: 'Netaji Subhas University of Technology, Delhi',
      year: '2023 – 2027',
      isCurrent: true,
      skills: ['DSA', 'System Design', 'Operating Systems', 'DBMS', 'OOP', 'Computer Networks'],
    },
  ];

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <main
      className="min-h-screen text-neutral-900 pt-32 pb-24 px-4 md:px-8 overflow-x-hidden selection:bg-[#00c37b] selection:text-white font-manrope"
      style={{
        background: `
          radial-gradient(ellipse 70% 50% at 0% 0%, rgba(0,195,123,0.10) 0%, transparent 60%),
          radial-gradient(ellipse 55% 45% at 100% 100%, rgba(0,195,123,0.08) 0%, transparent 55%),
          radial-gradient(ellipse 80% 40% at 50% 60%, rgba(0,180,100,0.05) 0%, transparent 60%),
          linear-gradient(160deg, #f5fdf8 0%, #fafaf8 40%, #f7fdf9 100%)
        `,
      }}
    >
      {/* Dot-grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Top-left bloom */}
      <div className="fixed top-[-10%] left-[-8%] w-[50vw] h-[50vh] rounded-full bg-[#00c37b]/10 blur-[130px] pointer-events-none z-0" />
      {/* Bottom-right accent orb */}
      <div className="fixed bottom-[-5%] right-[-5%] w-[38vw] h-[38vh] rounded-full bg-[#00e87a]/8 blur-[110px] pointer-events-none z-0" />
      {/* Subtle center shimmer */}
      <div className="fixed top-[40%] left-[50%] -translate-x-1/2 w-[60vw] h-[30vh] rounded-full bg-[#00c37b]/5 blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ── SECTION 1: HERO ────────────────────────────────────────────────── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center mb-28"
        >
          {/* Photo */}
          <motion.div variants={fadeUp} className="md:col-span-4 flex justify-center md:justify-start">
            <div className="relative group">
              {/* Green accent frame */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#00c37b]/40 to-[#00c37b]/10 blur-sm group-hover:blur-md transition-all duration-500" />
              <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-xl shadow-neutral-200/80">
                <Image
                  src="/images/ansh.png"
                  alt="Ansh Sharma"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div variants={fadeUp} className="md:col-span-8 space-y-5 text-center md:text-left">

            {/* Name */}
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold tracking-widest text-neutral-900 leading-tight">
              ANSH{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00894d] to-[#00c37b]">
                SHARMA
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-sm font-dm-mono text-neutral-500 tracking-wider">
              Software Engineer · AI Systems Builder · 8× Hackathon Winner
            </p>

            {/* Bio */}
            <div className="text-neutral-600 text-[15px] leading-[1.75] space-y-3 max-w-xl">
              <p>
                I&apos;m a Software Engineer who loves architecting scalable backends, integrating AI, and building products that actually solve problems. I have a track record of turning ambitious ideas into production-ready code which is usually fueled by an unreasonable amount of caffeine.
              </p>
              <p>
                Currently a CS undergrad at NSUT, Delhi, where I&apos;m learning that the best way to understand complex systems is to build them, break them, and then calmly explain that it was just a stress test. I thrive in fast-paced environments where &apos;impossible&apos; is just another edge case to handle. Always up for building something cool or discussing bad ideas that might accidentally be brilliant.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
              <a
                href="mailto:sharma.ansh2607@gmail.com"
                className="flex items-center gap-2 px-6 py-3 border-[3px] border-[#0a0a0a] bg-[#0a0a0a] text-[#00e060] text-[13px] font-bold uppercase tracking-widest font-dm-mono shadow-[4px_4px_0_#00e060] hover:bg-[#00e060] hover:text-[#0a0a0a] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_#0a0a0a] transition-all duration-200"
              >
                <VscMail size={18} />
                Email Me
              </a>
              <a
                href="https://linkedin.com/in/ansh-shrma"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border-[3px] border-[#0a0a0a] bg-white text-[#0a0a0a] text-[13px] font-bold uppercase tracking-widest font-dm-mono shadow-[4px_4px_0_#0a0a0a] hover:bg-[#f5e642] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_#0a0a0a] transition-all duration-200"
              >
                <FaLinkedin size={18} />
                LinkedIn
              </a>
              <a
                href="https://github.com/Anshuu-Sharma"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border-[3px] border-[#0a0a0a] bg-white text-[#0a0a0a] text-[13px] font-bold uppercase tracking-widest font-dm-mono shadow-[4px_4px_0_#0a0a0a] hover:bg-[#f5e642] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_#0a0a0a] transition-all duration-200"
              >
                <VscGithubInverted size={18} />
                GitHub
              </a>
            </div>
          </motion.div>
        </motion.section>

        {/* ── SECTION 2: EXPERIENCE ──────────────────────────────────────────── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOpts}
          className="mb-24"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Career</SectionLabel>
            <div className="flex items-center gap-3 mb-10">
              <VscBriefcase className="text-[#00c37b]" size={26} />
              <SectionHeading>Experience</SectionHeading>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="relative pl-8 border-l-[4px] border-[#0a0a0a] space-y-10">
            {experience.map((role, i) => (
              <motion.div key={i} variants={fadeUp} className="relative group">
                {/* Timeline dot */}
                <div className={`absolute -left-[46px] top-5 w-6 h-6 border-[3px] border-[#0a0a0a] transition-all duration-300 group-hover:scale-110 ${role.isCurrent
                  ? 'bg-[#00e060] shadow-[3px_3px_0_#0a0a0a]'
                  : 'bg-white shadow-[2px_2px_0_#0a0a0a]'
                  }`}
                />

                {/* Card */}
                <div className="bg-[#f5f5f0] border-[4px] border-[#0a0a0a] p-6 shadow-[8px_8px_0_#0a0a0a] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0_#0a0a0a] transition-all duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5 border-b-[3px] border-[#0a0a0a] pb-4">
                    <div className="flex items-center gap-4">
                      {role.logo && (
                        <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden border-[3px] border-[#0a0a0a] bg-white flex items-center justify-center p-1 shadow-[3px_3px_0_#0a0a0a]">
                          <Image src={role.logo} alt={role.company} fill className="object-contain p-2" />
                        </div>
                      )}
                      <div>
                        <h3 
                            className="text-3xl md:text-4xl text-[#0a0a0a] leading-[0.9] tracking-[-0.01em]"
                            style={{ fontFamily: 'var(--font-bebas-neue)' }}
                        >
                          {role.company.toUpperCase()}
                        </h3>
                        <p className="text-[13px] font-bold font-dm-mono uppercase tracking-widest text-neutral-600 mt-1">{role.title}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-0">
                      <span className="px-3.5 py-1 border-[2px] border-[#0a0a0a] bg-white text-[#0a0a0a] text-[11px] uppercase tracking-widest font-bold font-dm-mono shadow-[2px_2px_0_#0a0a0a]">
                        {role.period}
                      </span>
                      {role.isCurrent && (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#00e060] border-[2px] border-[#0a0a0a] text-[#0a0a0a] text-[11px] font-bold uppercase tracking-widest shadow-[2px_2px_0_#0a0a0a]">
                          ● CURRENT
                        </span>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {role.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-[14px] font-medium text-[#0a0a0a] leading-relaxed items-start">
                        <span className="w-2.5 h-2.5 mt-1.5 shrink-0 bg-[#0a0a0a] border border-[#f5e642]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── SECTION 3: SKILLS ──────────────────────────────────────────────── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOpts}
          className="mb-24"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Expertise</SectionLabel>
            <div className="flex items-center gap-3 mb-10">
              <VscTools className="text-[#00c37b]" size={26} />
              <SectionHeading>Technical Arsenal</SectionHeading>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((cat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-[#0a0a0a] border-[4px] border-[#0a0a0a] p-5 shadow-[6px_6px_0_#00e060] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_#00e060] transition-all duration-200"
              >
                <div className="flex items-center gap-2.5 mb-4 border-b-2 border-white/20 pb-3">
                  <div className="text-[#00e060]">{cat.icon}</div>
                  <h3 
                      className="text-2xl text-white tracking-widest"
                      style={{ fontFamily: 'var(--font-bebas-neue)' }}
                  >
                      {cat.label.toUpperCase()}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((s) => <SkillPill key={s} label={s} />)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── SECTION 5: ACHIEVEMENTS ────────────────────────────────────────── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOpts}
          className="mb-24"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Recognition</SectionLabel>
            <div className="flex items-center gap-3 mb-10">
              <FaTrophy className="text-[#00c37b]" size={22} />
              <SectionHeading>Achievements</SectionHeading>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
            {achievements.map((ach, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative bg-white border-[4px] border-[#0a0a0a] p-5 shadow-[6px_6px_0_#0a0a0a] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_#0a0a0a] hover:bg-[#f5e642] transition-all duration-200"
              >
                <div className="relative flex items-start gap-4">
                  <div className="mt-1 shrink-0 p-2 bg-[#0a0a0a] border-2 border-[#0a0a0a] group-hover:bg-white transition-colors">
                    <div className="text-white group-hover:text-[#0a0a0a]">{ach.icon}</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-dm-mono font-bold tracking-widest text-[#0a0a0a] uppercase mb-1 bg-black/10 inline-block px-1.5 py-0.5 border border-[#0a0a0a]">{ach.year}</div>
                    <div 
                        className="text-3xl text-[#0a0a0a] leading-none mb-2"
                        style={{ fontFamily: 'var(--font-bebas-neue)' }}
                    >
                        {ach.rank.toUpperCase()}
                    </div>
                    <div className="text-[#0a0a0a] text-[14px] font-bold leading-snug mb-1">{ach.event}</div>
                    <div className="text-[11px] text-[#0a0a0a] font-dm-mono font-bold mb-1.5 opacity-80">{ach.detail}</div>
                    <div className="text-[13px] text-[#0a0a0a] leading-relaxed font-medium">{ach.project}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.section>

        {/* ── SECTION 6: EDUCATION ───────────────────────────────────────────── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOpts}
          className="mb-8"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Background</SectionLabel>
            <div className="flex items-center gap-3 mb-10">
              <HiAcademicCap className="text-[#00c37b]" size={28} />
              <SectionHeading>Education</SectionHeading>
            </div>
          </motion.div>

          <div className="relative pl-8 border-l-[4px] border-[#0a0a0a] space-y-8">
            {education.map((edu, i) => (
              <motion.div key={i} variants={fadeUp} className="relative group">
                <div className={`absolute -left-[46px] top-4 w-6 h-6 border-[3px] border-[#0a0a0a] transition-all duration-300 group-hover:scale-110 ${edu.isCurrent
                  ? 'bg-[#00e060] shadow-[3px_3px_0_#0a0a0a]'
                  : 'bg-white shadow-[2px_2px_0_#0a0a0a]'
                  }`}
                />
                <div className="bg-[#f5f5f0] border-[4px] border-[#0a0a0a] p-5 shadow-[6px_6px_0_#0a0a0a] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_#0a0a0a] transition-all duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b-[3px] border-[#0a0a0a] pb-3 mb-3">
                    <div>
                      <h3 
                          className="text-2xl md:text-3xl text-[#0a0a0a] tracking-wide"
                          style={{ fontFamily: 'var(--font-bebas-neue)' }}
                      >
                          {edu.degree.toUpperCase()}
                      </h3>
                      <p className="text-[13px] text-[#0a0a0a] font-dm-mono font-bold mt-1">{edu.institution}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 mt-2 sm:mt-0">
                      {edu.isCurrent && (
                        <span className="text-[11px] font-dm-mono font-bold tracking-widest text-[#0a0a0a] uppercase bg-[#00e060] px-2 py-0.5 border-2 border-[#0a0a0a] shadow-[2px_2px_0_#0a0a0a]">
                          ● Current
                        </span>
                      )}
                      <span className="text-[12px] font-dm-mono font-bold text-[#0a0a0a] border-2 border-[#0a0a0a] px-2 py-0.5 shadow-[2px_2px_0_#0a0a0a] bg-white">{edu.year}</span>
                    </div>
                  </div>
                  {edu.skills && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {edu.skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider font-dm-mono bg-white text-[#0a0a0a] border-2 border-[#0a0a0a] shadow-[2px_2px_0_#0a0a0a]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </div>
    </main>
  );
}
