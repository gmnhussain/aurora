export type SectionId = "about" | "skills" | "work" | "education" | "projects" | "services" | "contact";

export const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Selected work" },
  { id: "services", label: "What I do" },
  { id: "contact", label: "Contact" },
];

export const PHONE_DISPLAY = "+880 1551 761805";
export const PHONE_RAW = "+8801551761805";

export const ABOUT_TEXT =
  "I’m a full-stack developer who owns the whole lifecycle — planning, design, development, testing and launch. I build fast, scalable web apps with TypeScript, React, Next.js and Node, and cross-platform mobile apps with Ionic and Capacitor.";

export const MARQUEE_ROWS: { word: string; outline: boolean }[][] = [
  [
    { word: "TypeScript", outline: false },
    { word: "React", outline: true },
    { word: "Next.js", outline: false },
    { word: "Node.js", outline: true },
    { word: "MongoDB", outline: false },
    { word: "Express", outline: true },
  ],
  [
    { word: "Ionic", outline: true },
    { word: "Capacitor", outline: false },
    { word: "PostgreSQL", outline: true },
    { word: "Tailwind CSS", outline: false },
    { word: "Docker", outline: true },
    { word: "Redux", outline: false },
  ],
];

export const SKILL_GROUPS: { title: string; items: string[] }[] = [
  {
    title: "Frontend",
    items: ["JavaScript", "React", "Next.js", "Redux", "HTML & CSS", "Tailwind CSS", "Ionic", "PWA"],
  },
  {
    title: "Backend",
    items: ["Node.js", "TypeScript", "Express", "MongoDB", "MySQL", "PostgreSQL", "RESTful APIs", "Socket programming"],
  },
  {
    title: "Development",
    items: ["Git", "Docker", "Caching", "Unit testing", "Architecture patterns", "Dev principles", "Agile / Scrum", "Web security"],
  },
];

export const ROLES: {
  dates: string;
  current: boolean;
  title: string;
  company: string;
  description: string;
  stack: string[];
}[] = [
  {
    dates: "July 2023 — Present",
    current: true,
    title: "Sr. Front-end Engineer",
    company: "API Solutions Ltd",
    description:
      "Lead front-end on product and client work, building React and Next.js apps that load fast and stay easy to maintain.",
    stack: ["JavaScript", "React", "Next.js", "CSS3"],
  },
  {
    dates: "August 2021 — July 2023",
    current: false,
    title: "Software Engineer",
    company: "Deeni Info Tech",
    description:
      "Owned design and development end to end, working with cross-functional teams to turn ideas into shipped web and mobile apps.",
    stack: ["JavaScript", "React", "Next.js", "Ionic"],
  },
];

export const PROJECTS: { title: string; meta: string; href: string; img: string }[] = [
  { title: "SmartGate", meta: "Multi-office attendance sync for DGHS", href: "/works/smartgate", img: "/img/projects/smartgate/overview-dark-16x10.webp" },
  { title: "Prixise", meta: "Price comparison & affiliate platform", href: "/works/price-comparison", img: "/img/projects/price-comparison/home-16x10.webp" },
  { title: "Social Commerce", meta: "SaaS for Bangladeshi social sellers", href: "/works/social-commerce", img: "/img/projects/social-commerce/inbox-to-order-16x10.webp" },
  { title: "Gatewise", meta: "Access control console for Dahua devices", href: "/works/gatewise", img: "/img/projects/gatewise/overview-16x10.webp" },
  { title: "Veloura", meta: "Headless e-commerce platform on Vendure", href: "/works/veloura", img: "/img/projects/veloura/hero-womenswear-16x10.webp" },
  { title: "PulseHR", meta: "Multi-tenant workforce management", href: "/works/pulse-hr", img: "/img/projects/pulse-hr/live-attendance-16x10.webp" },
];

export type ServiceIcon = "browsers" | "database" | "mobile" | "figma";

export const SERVICES: { title: string; description: string; icon: ServiceIcon }[] = [
  {
    title: "Front-end development",
    description: "React, Next.js and Tailwind CSS, with performance treated as a feature.",
    icon: "browsers",
  },
  {
    title: "Back-end solutions",
    description: "Node.js and Express APIs on SQL or NoSQL, from schema to deploy.",
    icon: "database",
  },
  {
    title: "Mobile apps",
    description: "Cross-platform iOS and Android with Ionic and Capacitor.",
    icon: "mobile",
  },
  {
    title: "Design to HTML",
    description: "Figma, XD or PSD into pixel-accurate, responsive markup.",
    icon: "figma",
  },
];

export const PORTRAIT_SRC = "https://nazmulhussain.com/img/avatar/main.png";
