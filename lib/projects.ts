export const PROJECTS: Record<
  string,
  { title: string; description: string; category: string; techStack: string; url: string; image: string }
> = {
  '1': {
    title: 'Modevelle',
    description:
      "A demo e-commerce website for women's fashion, featuring product listings, cart functionality, and user authentication. Built using Next.js and the Shopify Storefront API.",
    category: 'Ecommerce Website',
    techStack: 'NEXT JS • SHOPIFY STOREFRONT API • GSAP',
    url: '#',
    image: '/mockup.png',
  },
  '2': {
    title: 'Pulse Dashboard',
    description:
      'Real-time analytics dashboard for product teams. Track KPIs, user funnels, and A/B test results with live updates via WebSockets. Includes role-based access and export to CSV.',
    category: 'Web App',
    techStack: 'REACT • NODE.JS • POSTGRESQL • REDIS',
    url: '#',
    image: '/mockup.png',
  },
  '3': {
    title: 'Vault',
    description:
      'Password manager and secure note-taking app with end-to-end encryption. Browser extension and mobile companion. Syncs across devices with optional self-hosted backend.',
    category: 'Prototype',
    techStack: 'TYPESCRIPT • FIGMA • TAILWIND • PRISMA',
    url: '#',
    image: '/mockup.png',
  },
  '4': {
    title: 'Bridge API',
    description:
      'Unified API gateway for third-party integrations. Handles auth, rate limiting, and webhook delivery. Used by internal tools and partner apps for CRM and billing sync.',
    category: 'Integration',
    techStack: 'NEXT.JS • REST APIS • DOCKER • AWS',
    url: '#',
    image: '/mockup.png',
  },
};

export const PROJECT_IDS = ['1', '2', '3', '4'] as const;

export function getProject(id: string) {
  return PROJECTS[id] ?? null;
}
