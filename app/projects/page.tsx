import React from 'react';
import ProjectCard from '@/components/ui/ProjectCard';

const dummyProjects = [
  { title: "UIVERSE (3D UI)", description: "Create, share, and use beautiful custom elements made with CSS" },
  { title: "NEURO SYNC", description: "Brain-computer interface dashboard with real-time analytics" },
  { title: "QUANTUM LEAP", description: "A predictive model visualization tool built with WebGL" },
  { title: "ECHO COMMERCE", description: "Next-gen headless e-commerce storefront for luxury brands" },
  { title: "ORBITAL MAPS", description: "Interactive 3D planetary mapping and charting system" },
  { title: "SYNTH WAVE", description: "Audio visualization and generative music synthesizer app" }
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white text-black pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-black font-manrope tracking-tight">
          Featured Projects
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 place-items-center">
          {dummyProjects.map((project, idx) => (
            <ProjectCard key={idx} title={project.title} description={project.description} />
          ))}
        </div>
      </div>
    </main>
  );
}
