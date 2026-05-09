'use client';

import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'Hack-A-Ton - IIT DELHI',
    participants: '1000+ PARTICIPANTS',
    rank: 1,
  },
  {
    id: 2,
    title: 'Adobe Express Hackathon - NSUT Main Campus',
      participants: '600+ PARTICIPANTS',
      rank: 1,
  },
  {
    id: 3,
    title: 'IIT Delhi Alumni Day - IIT DELHI',
    participants: '500+ PARTICIPANTS',
    rank: 1,
  },
  {
    id: 4,
    title: 'Industrial Ideathon - Govt. of NCT Delhi & DSIIDC',
    participants: '2000+ PARTICIPANTS',
    rank: 2,
  },
  {
    id:5,
    title: 'CodeClash 2.0 - Google Office, Gurugaon',
    participants: '5000+ PARTICIPANTS',
    rank: 3,
  },
  {
    id: 6,
    title: 'Code Showdown 2 - Bharati Vidyapeeth, Delhi',
    participants: '',
    rank: 4,
  },
  {
    id: 7,
    title: 'AlgoVerse - Microsoft Office, Noida',
    participants: '',
    rank: 5,
  },
  
];

export default function Playground() {
  const [viewMode, setViewMode] = useState<'grid' | 'marquee'>('marquee');

  return (
    <section className="playground-section" id="services">
      <div className="container">
        <div className="grid-8">
          <div className="grid-col-3"></div>
          <div className="grid-col-2">
            <div className="playground-section-header">
              <div className="option-title title">
                <span className="option-header1">View options:</span>
              </div>
              <div className="options">
                <div
                  className={`option ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <span className="title option-header1">Grid</span>
                </div>
                <div
                  className={`option ${viewMode === 'marquee' ? 'active' : ''}`}
                  onClick={() => setViewMode('marquee')}
                >
                  <span className="title option-header3">Marquee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="playground-section-cards">
        {viewMode === 'marquee' ? (
          <div className="playground-marquee">
            <div className="marquee-track">
              {[...projects, ...projects, ...projects].map((project, idx) => (
                <div
                  key={idx}
                  style={{
                    minWidth: '300px',
                    padding: '40px',
                    background: '#f5f5f5',
                    borderRadius: '10px',
                    flexShrink: 0,
                  }}
                >
                  <h3 className="title" style={{ marginBottom: '10px' }}>{project.title}</h3>
                  <p>{project.participants}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px',
            }}>
              {projects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    padding: '40px',
                    background: '#f5f5f5',
                    borderRadius: '10px',
                  }}
                >
                  <h3 className="title" style={{ marginBottom: '10px' }}>{project.title}</h3>
                  <p>{project.participants}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
