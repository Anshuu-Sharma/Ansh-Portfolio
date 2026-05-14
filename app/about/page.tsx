"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { VscGithubInverted, VscMail, VscCode, VscTerminal, VscDatabase, VscTools, VscBriefcase } from 'react-icons/vsc';
import { FaLinkedin, FaTrophy } from 'react-icons/fa';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <main className="min-h-screen bg-[#fafaf9] text-black pt-36 pb-32 px-4 md:px-8 overflow-hidden font-inter selection:bg-[#00c37b] selection:text-white">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#00c37b]/10 to-transparent blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tl from-[#08e260]/10 to-transparent blur-[120px]" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-24"
        >
          {/* 1. Hero / Profile Section */}
          <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 flex justify-center md:justify-start">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-2xl shadow-[#00c37b]/20 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                <Image
                  src="/images/ansh.png"
                  alt="Ansh Sharma"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
              </div>
            </div>
            
            <div className="md:col-span-7 space-y-6 text-center md:text-left">
              <div className="inline-block px-4 py-1.5 rounded-full border border-[#00c37b]/30 bg-[#00c37b]/10 text-[#00894d] text-sm font-dm-mono tracking-wide mb-2 shadow-sm">
                Available for opportunities
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold font-orbitron tracking-widest text-black">
                ANSH <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00894d] to-[#00ff88]">SHARMA</span>
              </h1>
              <h2 className="text-xl md:text-2xl text-neutral-600 font-dm-mono">
                Software Engineer • AI Engineer
              </h2>
              <p className="text-neutral-600 text-lg max-w-2xl leading-relaxed">
                I am a full-stack developer and AI engineer passionate about building scalable backends, real-time architectures, and integrating cutting-edge LLMs. I bridge the gap between complex engineering and accessible user experiences.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                <a href="mailto:sharma.ansh2607@gmail.com" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white hover:bg-[#00c37b] shadow-lg shadow-black/10 hover:shadow-[#00c37b]/20 transition-all duration-300 font-medium">
                  <VscMail size={20} />
                  <span>Email Me</span>
                </a>
                <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-neutral-200 hover:border-[#00c37b] hover:text-[#00c37b] bg-white shadow-sm transition-all duration-300">
                  <FaLinkedin size={20} />
                  <span>LinkedIn</span>
                </a>
                <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-neutral-200 hover:border-[#00c37b] hover:text-[#00c37b] bg-white shadow-sm transition-all duration-300">
                  <VscGithubInverted size={20} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </motion.section>

          {/* 2. Experience & Education Split */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Experience */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="flex items-center gap-4 border-b border-neutral-200 pb-4">
                <VscBriefcase className="text-3xl text-[#00c37b]" />
                <h3 className="text-3xl font-orbitron tracking-wider text-black">Experience</h3>
              </div>
              
              <div className="relative pl-8 border-l border-neutral-200 space-y-12">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-white border-2 border-[#00c37b] shadow-sm" />
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h4 className="text-xl font-bold text-black">SDE Intern @ GydeXp</h4>
                    <span className="text-[#00894d] font-dm-mono text-sm font-semibold">Aug 2025 – Feb 2026</span>
                  </div>
                  <ul className="space-y-3 text-neutral-600 mt-4 list-none">
                    <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-[#00c37b]">
                      Enabled automated voice-based hotel reservations by architecting a real-time conversational AI booking agent.
                    </li>
                    <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-[#00c37b]">
                      Reduced API infrastructure costs and enhanced system response reliability by implementing LLM prompt caching.
                    </li>
                    <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-[#00c37b]">
                      Achieved 95% tool-call accuracy across 500+ conversations via hallucination guardrails and idempotency flags.
                    </li>
                    <li className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-[#00c37b]">
                      Delivered real-time data sync using Node.js, Express, PostgreSQL, Socket.io, and JWT/RBAC controls.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Education */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="flex items-center gap-4 border-b border-neutral-200 pb-4">
                <div className="w-8 h-8 rounded border-2 border-[#00c37b] flex items-center justify-center text-[#00c37b] font-orbitron text-xl font-bold bg-[#00c37b]/10">E</div>
                <h3 className="text-3xl font-orbitron tracking-wider text-black">Education</h3>
              </div>
              
              <div className="relative pl-8 border-l border-neutral-200 space-y-10">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-white border-2 border-neutral-400" />
                  <h4 className="text-xl font-bold text-black">B.Tech (CSE with spec. in IoT)</h4>
                  <div className="text-neutral-600 mt-1">Netaji Subhas University of Technology, Delhi</div>
                  <div className="text-[#00894d] font-dm-mono text-sm mt-2 font-semibold">2023 - 2027</div>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-white border-2 border-neutral-300" />
                  <h4 className="text-lg font-bold text-black">Class XII (CBSE)</h4>
                  <div className="text-neutral-600 mt-1">Rishikul Vidyapeeth Alipur, Delhi</div>
                  <div className="text-neutral-500 font-dm-mono text-sm mt-1">2022</div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* 3. Skills Grid */}
          <motion.section variants={itemVariants} className="space-y-8">
            <div className="flex items-center gap-4 border-b border-neutral-200 pb-4">
              <VscCode className="text-3xl text-[#00c37b]" />
              <h3 className="text-3xl font-orbitron tracking-wider text-black">Technical Arsenal</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:border-[#00c37b]/50 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4 text-black">
                  <VscTerminal className="text-[#00c37b]" size={24} />
                  <h4 className="font-bold text-lg">Languages & Core</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['C++', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'Go', 'DSA', 'System Design'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-neutral-100 border border-neutral-200 rounded-full text-sm text-neutral-700 hover:text-[#00c37b] hover:border-[#00c37b] hover:bg-white transition-colors">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:border-[#00c37b]/50 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4 text-black">
                  <VscCode className="text-[#00c37b]" size={24} />
                  <h4 className="font-bold text-lg">Full Stack</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'Express.js', 'React.js', 'Next.js', 'REST APIs', 'GraphQL', 'WebSockets', 'TanStack Query'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-neutral-100 border border-neutral-200 rounded-full text-sm text-neutral-700 hover:text-[#00c37b] hover:border-[#00c37b] hover:bg-white transition-colors">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:border-[#00c37b]/50 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4 text-black">
                  <VscDatabase className="text-[#00c37b]" size={24} />
                  <h4 className="font-bold text-lg">Databases & DevOps</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['PostgreSQL', 'MongoDB', 'Redis', 'Neon', 'Supabase', 'Docker', 'AWS', 'Azure', 'CI/CD'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-neutral-100 border border-neutral-200 rounded-full text-sm text-neutral-700 hover:text-[#00c37b] hover:border-[#00c37b] hover:bg-white transition-colors">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:border-[#00c37b]/50 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4 text-black">
                  <VscTools className="text-[#00c37b]" size={24} />
                  <h4 className="font-bold text-lg">Tools & Soft Skills</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Git', 'LiveKit', 'Deepgram', 'ElevenLabs', 'Leadership', 'Problem-solving'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-neutral-100 border border-neutral-200 rounded-full text-sm text-neutral-700 hover:text-[#00c37b] hover:border-[#00c37b] hover:bg-white transition-colors">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* 4. Achievements */}
          <motion.section variants={itemVariants} className="space-y-8">
            <div className="flex items-center gap-4 border-b border-neutral-200 pb-4">
              <FaTrophy className="text-3xl text-[#00c37b]" />
              <h3 className="text-3xl font-orbitron tracking-wider text-black">Achievements</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Winner', event: 'Hack-A-Tone, IIT Delhi', detail: '1000+ participants' },
                { title: 'Winner', event: 'Adobe Express Hackathon', detail: '550+ participants' },
                { title: 'Winner', event: 'IIT Delhi Alumni Day 2025', detail: '400+ participants' },
              ].map((award, i) => (
                <div key={i} className="relative overflow-hidden group rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm hover:shadow-xl hover:border-[#00c37b]/30 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#00c37b]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <FaTrophy className="text-5xl text-[#00c37b] mx-auto mb-6 transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500" />
                  <h4 className="text-2xl font-orbitron text-black mb-2">{award.title}</h4>
                  <p className="text-neutral-600 font-bold">{award.event}</p>
                  <p className="text-neutral-500 text-sm mt-2">{award.detail}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 rounded-2xl bg-[#00c37b]/5 border border-[#00c37b]/20 flex items-center justify-center text-center">
              <p className="text-neutral-700">
                Led a high-performing team securing <span className="text-[#00894d] font-bold">Top 3 positions</span> across 8 hackathons, and developed two production SaaS platforms (Savra Edu & Sports Planet).
              </p>
            </div>
          </motion.section>
          
        </motion.div>
      </div>
    </main>
  );
}
