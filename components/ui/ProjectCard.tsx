'use client';

import React from 'react';
import styled from 'styled-components';

export interface ProjectCardProps {
  id?: string;
  title: string;
  description: string;
  category?: string;
  techStack?: string[];
  color?: string;
  onClick?: () => void;
}

const ProjectCard = ({ 
  id = '1', 
  title, 
  description, 
  category = 'PROJECT', 
  techStack = [], 
  color = '#f5e642', 
  onClick 
}: ProjectCardProps) => {

  const initials = title.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <StyledWrapper onClick={onClick}>
      <div className="card-profile" style={{ cursor: onClick ? 'pointer' : 'default' }}>
        <div className="prof-photo" style={{ backgroundColor: color }}>
          <div className="prof-photo-num">{id.padStart(2, '0')}</div>
          <div className="prof-avatar">{initials}</div>
          <div className="prof-status-badge">● {category}</div>
        </div>
        <div className="prof-body flex-grow">
          <div className="prof-handle">@project.{id.padStart(2, '0')}</div>
          <div className="prof-name">{title.toUpperCase()}</div>
          <div className="prof-bio">
            {description}
          </div>
        </div>
        <div className="prof-stats mt-auto">
          <div className="pstat">
            <span className="psv">{techStack[0] || '-'}</span>
            <span className="psl">Tech 01</span>
          </div>
          <div className="pstat">
            <span className="psv">{techStack[1] || '-'}</span>
            <span className="psl">Tech 02</span>
          </div>
          <div className="pstat">
            <span className="psv">{techStack.length > 2 ? `+${techStack.length - 2}` : '-'}</span>
            <span className="psl">More</span>
          </div>
        </div>
        <button className="prof-btn">+ VIEW PROJECT</button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  height: 100%;
  display: flex;

  .card-profile {
    background: #f5f5f0;
    border: 5px solid #0a0a0a;
    box-shadow: 8px 8px 0 #0a0a0a;
    position: relative;
    overflow: hidden;
    width: 360px;
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .card-profile:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0 #0a0a0a;
  }

  .prof-photo {
    height: 160px;
    border-bottom: 5px solid #0a0a0a;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    flex-shrink: 0;
  }
  .prof-photo::before {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      45deg,
      transparent 0px,
      transparent 8px,
      rgba(0, 0, 0, 0.12) 8px,
      rgba(0, 0, 0, 0.12) 10px
    );
  }
  .prof-photo-num {
    font-family: var(--font-bebas-neue), sans-serif;
    font-size: 7rem;
    line-height: 0.85;
    color: rgba(0, 0, 0, 0.2);
    position: absolute;
    right: -8px;
    bottom: -10px;
    letter-spacing: -0.02em;
    pointer-events: none;
  }
  .prof-avatar {
    width: 72px;
    height: 72px;
    background: #0a0a0a;
    border: 5px solid #0a0a0a;
    border-bottom: none;
    border-left: none;
    margin-left: 20px;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-bebas-neue), sans-serif;
    font-size: 2rem;
    color: #fff;
    flex-shrink: 0;
  }
  .prof-status-badge {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 2;
    background: #00e060;
    border: 3px solid #0a0a0a;
    box-shadow: 3px 3px 0 #0a0a0a;
    font-size: 0.55rem;
    font-weight: 800;
    letter-spacing: 0.18em;
    padding: 3px 8px;
    text-transform: uppercase;
    color: #000;
  }

  .prof-body {
    padding: 16px 18px 16px;
  }
  .prof-handle {
    font-size: 0.55rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: #a8a49a;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .prof-name {
    font-family: var(--font-bebas-neue), sans-serif;
    font-size: 2rem;
    line-height: 0.9;
    color: #0a0a0a;
    letter-spacing: -0.01em;
    margin-bottom: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .prof-bio {
    font-size: 0.72rem;
    font-weight: 500;
    color: #0a0a0a;
    border-left: 5px solid #e8180a;
    padding-left: 10px;
    line-height: 1.55;
    margin-bottom: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .prof-stats {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-top: 3px solid #0a0a0a;
  }
  .pstat {
    padding: 12px 6px;
    border-right: 3px solid #0a0a0a;
    text-align: center;
    overflow: hidden;
  }
  .pstat:last-child {
    border-right: none;
  }
  .pstat .psv {
    font-family: var(--font-bebas-neue), sans-serif;
    font-size: 1.2rem;
    line-height: 1;
    color: #0a0a0a;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pstat .psl {
    font-size: 0.48rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: #a8a49a;
    text-transform: uppercase;
    display: block;
    margin-top: 2px;
  }

  .prof-btn {
    display: block;
    width: 100%;
    padding: 13px;
    background: #0a0a0a;
    color: #fff;
    border: none;
    border-top: 5px solid #0a0a0a;
    font-family: var(--font-bebas-neue), sans-serif;
    font-size: 1.1rem;
    letter-spacing: 0.2em;
    cursor: pointer;
    text-align: center;
    transition:
      background 0.15s,
      color 0.15s;
  }
  .prof-btn:hover {
    background: #00e060;
    color: #0a0a0a;
  }
`;

export default ProjectCard;
