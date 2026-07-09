export type Project = {
  eyebrow: string;
  title: string;
  timeframe: string;
  location?: string;
  description: string;
  impact: string[];
  technologies: string[];
  accent: 'gold' | 'ember' | 'ruby';
};

export type Experience = {
  role: string;
  company: string;
  timeframe: string;
  location: string;
  bullets: string[];
  technologies?: string[];
};

export const profile = {
  name: 'Aya Sareej',
  title: 'AI Engineer × Frontend Developer',
  location: 'Damascus, Syria',
  email: 'aya.sareej.it@gmail.com',
  phone: '+963 968 503 140',
  linkedin: 'https://www.linkedin.com/in/aya-sareej',
  cvPath: '/Aya_Sareej_CV.pdf',
  summary:
    'Final-year Artificial Intelligence Engineering student at Damascus University building applied AI systems across speech processing, computer vision, OCR, and machine learning, with additional React frontend and UI/UX delivery experience.',
  positioning:
    'A portfolio at the intersection of AI research, product thinking, and user-centered interfaces.',
};

export const heroStats = [
  { value: 'AI', label: 'Engineering track' },
  { value: '50+', label: 'Motion stories shipped' },
  { value: '5%', label: 'OCR accuracy lift' },
  { value: '4', label: 'Languages' },
];

export const skillGroups = [
  {
    label: 'AI & Research',
    skills: ['Machine Learning', 'Computer Vision', 'Speech Processing', 'NLP', 'OCR', 'Model Evaluation'],
  },
  {
    label: 'Engineering',
    skills: ['Python', 'JavaScript ES6+', 'TypeScript', 'React.js', 'REST APIs', 'Git & GitHub'],
  },
  {
    label: 'Data & UX',
    skills: ['NumPy', 'Pandas', 'Matplotlib', 'TailwindCSS', 'Figma', 'Design Systems'],
  },
];

export const featuredProjects: Project[] = [
  {
    eyebrow: 'Computer Vision / Medical AI',
    title: 'HaloScan — AI-Based Laboratory Image Analysis System',
    timeframe: '2025 – Early 2026',
    location: 'Al-Khatib Medical Laboratory, Damascus',
    description:
      'AI-assisted image analysis prototype for antibiotic susceptibility test workflows, designed with laboratory specialists and optimized for deployment constraints.',
    impact: [
      'Translated diagnostic workflow requirements into a deployable AI-assisted prototype.',
      'Built Python and OpenCV pipelines to process AST images and automatically measure inhibition zones.',
      'Improved OCR label recognition accuracy by approximately 5% through preprocessing and parameter optimization.',
    ],
    technologies: ['Python', 'OpenCV', 'OCR', 'Computer Vision', 'Image Processing'],
    accent: 'gold',
  },
  {
    eyebrow: 'Speech AI / Graduation Project',
    title: 'Real-Time Spoken English Improvement System',
    timeframe: '2022 – 2026',
    description:
      'AI system for Arabic-speaking learners that evaluates spoken English through pronunciation, fluency, grammar, and accent assessment.',
    impact: [
      'Designed an end-to-end speech processing pipeline for real-time evaluation.',
      'Evaluated ASR models for accented English and designed phoneme-level mispronunciation detection.',
      'Participated in dataset evaluation and controlled speech data collection design.',
    ],
    technologies: ['Python', 'Speech Processing', 'ASR', 'Machine Learning', 'AI Evaluation'],
    accent: 'ember',
  },
  {
    eyebrow: 'Frontend / Product Design',
    title: 'CMS Corporate Website & Admin Dashboard',
    timeframe: '2025 – 2026',
    location: 'Media Noodles, Remote',
    description:
      'End-to-end UX/UI and frontend architecture for a CMS-powered corporate website and scalable administrative dashboard.',
    impact: [
      'Led information architecture, design systems, and interaction flows.',
      'Planned a feature-based React architecture with TailwindCSS and TypeScript.',
      'Collaborated directly with clients and backend developers through the product lifecycle.',
    ],
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Figma', 'REST APIs'],
    accent: 'ruby',
  },
];

export const experiences: Experience[] = [
  {
    role: 'Applied AI Developer',
    company: 'Al-Khatib Medical Laboratory',
    timeframe: '2025 – Early 2026',
    location: 'Damascus, Syria',
    technologies: ['Python', 'OpenCV', 'OCR', 'Computer Vision'],
    bullets: [
      'Collaborated with specialists to convert diagnostic workflow requirements into a working AI-assisted prototype.',
      'Implemented preprocessing and image-measurement pipelines for AST image analysis.',
      'Supported workflow design, usability discussions, and technical documentation for adoption.',
    ],
  },
  {
    role: 'UI/UX Designer & Frontend Developer',
    company: 'Media Noodles',
    timeframe: '2025 – 2026',
    location: 'Remote',
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Figma', 'REST APIs'],
    bullets: [
      'Led UX/UI design for a corporate website and administrative dashboard.',
      'Defined component structure, frontend architecture, and scalable visual systems.',
      'Coordinated client feedback loops and backend integration decisions.',
    ],
  },
  {
    role: 'Front-End Development Intern',
    company: 'MadSolution',
    timeframe: '2024',
    location: 'Remote',
    bullets: [
      'Developed responsive React components for an e-commerce platform.',
      'Assisted with REST API integration and Git-based collaboration workflows.',
    ],
  },
  {
    role: 'Motion Graphics Designer',
    company: 'WOOW Studio',
    timeframe: '2022 – 2026',
    location: 'Remote',
    bullets: [
      'Produced more than 50 storytelling animations and explainer videos for clients across multiple industries.',
      'Designed original illustrated and animated content while maintaining brand consistency.',
      'Worked through structured feedback cycles under strict deadlines.',
    ],
  },
];

export const education = {
  degree: 'B.Sc. Information Technology Engineering — Artificial Intelligence Track',
  school: 'Damascus University',
  graduation: 'Expected graduation: August 2026',
};

export const leadership = [
  {
    role: 'Media Team Lead',
    organization: 'Faculty of Information Technology Engineering, Damascus University',
    timeframe: '2024 – Present',
    detail:
      'Leads the faculty student media team, coordinating communication and coverage for 50+ academic events and student initiatives.',
  },
  {
    role: 'Official Member — National Union of Syrian Students',
    organization: 'Faculty Representative',
    timeframe: 'Jan 2026 – Present',
    detail:
      'Represents fifth-year students within faculty governance and coordinates communication between students and administration.',
  },
];

export const languages = [
  { language: 'Arabic', level: 'Native' },
  { language: 'English', level: 'Advanced / Professional working proficiency' },
  { language: 'German', level: 'A2' },
  { language: 'Japanese', level: 'N4' },
];
