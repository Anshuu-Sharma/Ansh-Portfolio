import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProject, PROJECT_IDS } from '@/lib/projects';
import '../project-page.css';

export async function generateStaticParams() {
  return PROJECT_IDS.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return { title: 'Project' };
  return {
    title: `${project.title} – Portfolio`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const index = PROJECT_IDS.indexOf(id as (typeof PROJECT_IDS)[number]);
  const countDisplay = `${String(index + 1).padStart(2, '0')} | ${String(PROJECT_IDS.length).padStart(2, '0')}`;

  return (
    <section className="project-wrapper">
      <div className="project-card">
        <div className="top-bar">
          <div className="project-indicator">
            <span className="label">PROJECT</span>
            <span className="count">{countDisplay}</span>
          </div>
          <Link href="/" className="project-back">
            ← Back
          </Link>
        </div>

        <div className="meta">
          <p className="meta-title">{project.category.toUpperCase()}</p>
          <div className="divider" />
          <p className="meta-tech">{project.techStack}</p>
          <div className="divider" />
        </div>

        <div className="content">
          <div className="left">
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <a href={project.url} className="cta" target="_blank" rel="noopener noreferrer">
              VISIT SITE <span>↗</span>
            </a>
          </div>

          <div className="right">
            <div className="mockup-stack">
              <Image
                src={project.image}
                alt={`${project.title} mockup`}
                width={1200}
                height={800}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
