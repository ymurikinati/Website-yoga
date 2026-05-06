import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, OrbitControls, Sparkles, Stars } from '@react-three/drei'
import * as THREE from 'three'
import fedexBravoZuluAward from './FedEx Bravo Zulu Award.jpg'

/* ─── Data ──────────────────────────────────────────────────────── */
const skills = [
  { category: 'Frontend', icon: '⬡', items: ['Angular', 'React', 'JavaScript', 'HTML/CSS', 'jQuery'] },
  { category: 'Backend', icon: '⬡', items: ['Java', 'Spring Boot', 'Python', 'Perl', 'REST APIs'] },
  { category: 'Database & Cloud', icon: '⬡', items: ['Oracle DB', 'MySQL', 'AWS', 'CI/CD', 'Docker'] },
  { category: 'Data & Analytics', icon: '⬡', items: ['SAP S/4HANA', 'Power BI', 'Tableau', 'SQL', 'Google Analytics'] },
  { category: 'Tools & Practices', icon: '⬡', items: ['Git', 'Agile / SAFe', 'Jira', 'Linux', 'Android Studio'] },
]

const experience = [
  {
    company: 'Federal Express Corporation',
    companyColor: '#4f9cf9',
    role: 'Full Stack Developer II',
    period: 'Oct 2025 – Present',
    location: 'Memphis, TN, USA',
    bullets: [
      'Developed and enhanced Dispatch Systems Manager (DSM) using Java Spring Boot and Angular, enabling efficient management of FedEx pickups and deliveries.',
      'Designed and deployed cloud-native software components leveraging AWS services, improving scalability and system resilience.',
      'Implemented and optimized CI/CD pipelines using Jenkins and Git, automating build, test, and deployment processes to reduce release cycle time.',
      'Conducted code reviews and enforced best practices (SOLID, Design Patterns), ensuring maintainability and high-quality code.',
      'Collaborated in Agile SAFe environment, actively participating in daily stand-ups, sprint planning, and reviews to deliver features on time.',
      'Partnered with QA teams to validate fixes and promote code through multiple testing environments, ensuring production readiness.',
      'Resolved production issues and supported deployments using Java and Oracle Database, improving system reliability and performance.',
      'Worked on Oracle DN for secure data storage, optimizing query performance and ensuring data integrity for large-scale transactional systems.',
      'Contributed to the FedEx FRO and GPDE applications, enhancing functionality and supporting critical business operations as part of Network 2.0.',
    ],
  },
  {
    company: 'Federal Express Corporation',
    companyColor: '#4f9cf9',
    role: 'Intern Information Technology',
    period: 'Jun 2025 – Oct 2025',
    location: 'USA',
    bullets: [
      'Redesigned the Virtualization Environment (VE) team webpage for EIS – System Engineering Services, improving usability and visual design.',
      'Modernized the VE Self-Serve User Interface, enhancing both frontend and backend functionality for better user experience.',
      'Optimized HTML, JavaScript, and jQuery components, reducing page load time and improving responsiveness.',
      'Enhanced server-side operability by refining Perl scripts and improving MySQL database performance, ensuring efficient data handling.',
      'Supported migration of the Self-Serve system to Colo, ensuring seamless transition and improved system reliability.',
      'Implemented backend improvements using Perl, increasing automation and reducing manual intervention.',
    ],
  },
  {
    company: 'Accenture',
    companyColor: '#a259ff',
    role: 'Application Development Associate',
    period: 'Aug 2021 – Jul 2022',
    location: 'Bengaluru, India',
    bullets: [
      'Implemented SAP MM module for the KION Project, driving digital transformation of procurement and inventory management processes.',
      'Configured and customized SAP MM functionalities including purchase requisitions, purchase orders, goods receipt, and inventory management to align with client-specific business requirements.',
      'Led data migration and master data management activities, ensuring accurate transfer and integrity of material data into SAP MM.',
      'Optimized operational workflows by streamlining SAP MM configurations, improving efficiency and reducing manual intervention.',
    ],
  },
]

const education = [
  {
    period: 'Aug 2022 – May 2024',
    degree: 'M.S. Information Technology',
    school: 'Arizona State University',
    detail: 'Specialization in IT Project Management · Google Certified Advanced Data Analyst',
    accent: '#4f9cf9',
  },
  {
    period: '2017 – 2021',
    degree: 'B.Tech, Computer Science & Engineering',
    school: 'K.S.R.M. College of Engineering',
    detail: 'Strong foundation in software engineering, algorithms, and computer systems.',
    accent: '#a259ff',
  },
  {
    period: '2015 – 2017',
    degree: 'Intermediate (MPC)',
    school: 'Narayana Junior College, Kadapa',
    detail: 'Mathematics, Physics, and Chemistry with distinction.',
    accent: '#00f5c4',
  },
  {
    period: 'Jul 2014 – Jan 2015',
    degree: '10th Grade (SSC)',
    school: 'Little Flower High School, Vempalli',
    detail: 'Secondary School Certificate.',
    accent: '#f9a84f',
  },
]

const awards = [
  {
    title: 'FedEx Bravo Zulu Award',
    org: 'Federal Express Corporation',
    note: 'Recognized for outstanding performance and meaningful contribution to team and business outcomes.',
    image: fedexBravoZuluAward,
  },
]

const certifications = [
  { name: 'Google Advanced Data Analyst', org: 'Google', link: 'https://www.coursera.org/account/accomplishments/specialization/LZ6XN8MENLLD' },
  { name: 'Microsoft Power BI Data Analyst', org: 'Microsoft', link: 'https://www.coursera.org/account/accomplishments/professional-cert/LSXWAKN6FGVB' },
  { name: 'Python Data Structures', org: 'Coursera', link: 'https://www.credly.com/badges/8e977bb6-48be-40b5-af45-8309e940c4ad/linked_in_profile' },
  { name: 'Python for Data Science & ML Bootcamp', org: 'Udemy', link: 'https://www.udemy.com/certificate/UC-92737c2c-e8e9-42d3-9ab2-7658615b14a5/' },
  { name: 'Intro to Cybersecurity Tools & Cyber Attacks', org: 'IBM', link: 'https://www.coursera.org/account/accomplishments/certificate/E5XZ6W47BHW4' },
  { name: 'The Bits and Bytes of Computer Networking', org: 'Google', link: 'https://www.coursera.org/account/accomplishments/certificate/K45UG8NBZVZM' },
  { name: 'Developing an AI/ML Data Strategy', org: 'Skillsoft', link: 'https://skillsoft.digitalbadges-eu.skillsoft.com/8efec956-1265-4b70-a2d9-4b8d1e0d1af7#acc.jk920Z1s' },
  { name: 'Generative AI Fluency', org: 'Udacity', link: 'https://www.udacity.com/certificate/e/7aed133e-eb1d-11f0-ab2e-7bbfa0fb1fdb' },
  { name: 'Java Certified Foundations Associate', org: 'Skillsoft', link: 'https://skillsoft.digitalbadges.skillsoft.com/ef42e8b9-673f-499f-9dd1-590f77b21960#acc.R3yuwHeJ' },
  { name: 'SQL for Data Science', org: 'Coursera', link: 'https://www.coursera.org/account/accomplishments/certificate/GYAD75ZQN6BF' },
]

const projects = [
  {
    title: 'Data Professional Survey Breakdown 📊',
    tech: 'Power BI, Excel, Power Query',
    description: 'The Data Professional Survey Breakdown Dashboard project showcases insightful perspectives of the data professional realm, garnered from scrutinizing a survey encompassing 630 respondents. By adroitly harnessing Excel and Power Query Editor, raw data undergoes meticulous refinement for rigorous analysis. Through a palette of visualizations, pivotal trends surface, intertwined with key takeaways, painting a vivid portrait of the data professional landscape.',
    skills: ['Data Analysis', 'Data Cleaning', 'Data Visualization', 'Excel', 'Power BI', 'Statistical Analysis'],
    links: {
      dashboard: 'https://app.powerbi.com/groups/me/reports/1989a248-b469-4ea4-bdd4-277e4d4c6054/ReportSection?experience=power-bi',
    },
  },
  {
    title: 'Road Accident Analysis Dashboard 📊🚦',
    tech: 'Power BI, Data Analysis',
    description: 'In the Road Accident Dashboard Analysis project, I have developed an all-encompassing dashboard that thoroughly examines road accident data pertaining to the years 2021 and 2022. The central emphasis is placed on pivotal key performance indicators (KPIs), notably encompassing total casualties and overall accident counts for the present year. This analysis is bolstered by Year-over-Year (YoY) growth comparisons, offering a comprehensive view of progress.',
    skills: ['KPI Analysis', 'Data Visualization', 'Trend Analysis', 'Power BI', 'Interactive Dashboards'],
    links: {
      dashboard: 'https://www.linkedin.com/in/yogananda-reddy-murikinati/overlay/Project/1274760540/treasury/?profileId=ACoAAC_kNtYByHiq6kqSgTGyUZynDwEB1RcrN9c&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_projects_details%3Bgd25YOMqS9W3s6KtwHVdRw%3D%3D',
    },
  },
  {
    title: 'HR Analytics Dashboard 📊',
    tech: 'Power BI, Data Analysis',
    description: 'In this project, I\'ve successfully crafted an HR Analytics Dashboard that offers a comprehensive overview of key employee insights. It covers essential aspects such as attrition rates, business travel trends, employee demographics, and more. The process involved data cleaning, processing, analysis, and visualization, culminating in an interactive dashboard with filtering capabilities.',
    skills: ['HR Metrics', 'Attrition Analysis', 'Employee Demographics', 'Power BI', 'Data Filtering'],
    links: {
      dashboard: 'https://app.powerbi.com/groups/me/reports/7e5c1bde-6c10-4cfb-a1ad-caca44f08b51/ReportSection?experience=power-bi',
    },
  },
  {
    title: 'HR Analytics Dashboard - Tableau 📊',
    tech: 'Tableau, Data Visualization',
    description: 'I used Tableau to develop an intelligent HR Analytics Dashboard, leveraging HR data to reveal useful insights. The dashboard captures crucial elements of staff dynamics through data cleansing, analysis, and display. It reveals attrition rates, business travel patterns, demographics, and more, allowing for educated judgments on employee satisfaction, retention, and productivity.',
    skills: ['Tableau', 'HR Analytics', 'Interactive Dashboards', 'Data Visualization'],
    links: {
      dashboard: 'https://public.tableau.com/app/profile/yogananda.reddy.murikinati5016/viz/HRAnalyticsDashboard_17056163341560/HRAnalyticsDashboard',
      github: 'https://github.com/ymurikinati/HR-ANALYTICS-DASHBOARD-using-Tableau',
    },
  },
  {
    title: 'Road Accident Dashboard - Excel 🚦📊',
    tech: 'Excel, Data Analysis',
    description: 'I\'ve created an encompassing Excel dashboard that analyzes road accident data for 2021 and 2022. It highlights key indicators like casualties and accidents, comparing YoY growth. The dashboard dissects casualties by severity, vehicle type, and location, offering valuable insights for road safety enhancements.',
    skills: ['Excel', 'Data Visualization', 'YoY Analysis', 'KPI Tracking'],
    links: {},
  },
  {
    title: 'Pizza Sales Dashboard 🍕',
    tech: 'SQL, CSV, Data Visualization',
    description: 'The Pizza Sales Project, the culmination of a Data Visualization Course, offers comprehensive analysis of pizza sales data. This project includes a detailed dashboard utilizing CSV and SQL Server for analysis, with a dataset containing 12 columns and 48,621 rows capturing transactional details.',
    skills: ['SQL', 'Data Analysis', 'Sales Metrics', 'Trend Analysis', 'Data Visualization'],
    links: {
      github: 'https://github.com/ymurikinati/Pizza-Sales-Dashboard',
    },
  },
  {
    title: 'Data Analyst 30-Day Challenge 💻',
    tech: 'GitHub, Coding Projects',
    description: 'The 30-Day GitHub Challenge is a self-paced coding challenge that encouraged working on coding projects, collaborating with fellow developers, and contributing to open-source projects. Over 30 days, I took on various coding tasks and challenges, enhancing programming skills and gaining valuable experience.',
    skills: ['GitHub', 'Coding', 'Problem Solving', 'Open Source'],
    links: {
      github: 'https://github.com/ymurikinati/Yoga_Data_Analyst_Challenge_30_days',
    },
  },
  {
    title: 'Political Advertising Analysis using NLP 🗳️',
    tech: 'Python, NLP, SVM, RNN',
    description: 'A research project analyzing political advertisements used in the 2023 Phoenix mayoral election with emphasis on microtargeting techniques. Compared with the 2020 US presidential campaign, the study uses Natural Language Processing and Facebook Ad library API data to explore how campaigns employ microtargeting on Instagram and Facebook, particularly for toxic messaging. This research underscores the significance of understanding these dynamics for voters.',
    skills: ['NLP', 'Support Vector Machine', 'RNN', 'Text Analysis', 'Facebook API', 'Political Analysis'],
    links: {
      pdf: '#',
    },
  },
  {
    title: 'A Novel Secure Cloud Data Under Key Exposure 🔐',
    tech: 'Cloud Security, Cryptography, Data Protection',
    description: 'Research paper exploring novel approaches to secure cloud data storage and management under key exposure scenarios. This work addresses critical security challenges in cloud computing, proposing innovative solutions for data protection and integrity assurance in vulnerable conditions.',
    skills: ['Cloud Security', 'Cryptography', 'Data Protection', 'Key Management', 'Research'],
    links: {
      pdf: '#',
    },
  },
]

const sectionLinks = ['about', 'experience', 'awards', 'skills', 'education', 'projects', 'contact']

/* ─── 3D Scene ──────────────────────────────────────────────────── */
function DevCore() {
  const groupRef = useRef(null)
  const wireRef = useRef(null)
  const shellRef = useRef(null)
  const ringRef = useRef(null)
  const orbitARef = useRef(null)
  const orbitBRef = useRef(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.35
      wireRef.current.rotation.y = -t * 0.45
    }
    if (shellRef.current) {
      shellRef.current.rotation.y = t * 0.25
      shellRef.current.rotation.z = t * 0.14
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.7
    }
    if (orbitARef.current) {
      orbitARef.current.position.x = Math.cos(t * 0.92) * 1.65
      orbitARef.current.position.y = Math.sin(t * 0.92) * 1.1
    }
    if (orbitBRef.current) {
      orbitBRef.current.position.x = Math.cos(t * 0.66 + 2.2) * 1.4
      orbitBRef.current.position.z = Math.sin(t * 0.66 + 2.2) * 1.4
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={shellRef}>
        <boxGeometry args={[1.08, 1.08, 1.08]} />
        <MeshTransmissionMaterial
          thickness={0.5}
          roughness={0}
          chromaticAberration={0.1}
          ior={1.22}
          transmission={0.95}
          backside
          samples={4}
          resolution={256}
          color="#b8f5f0"
        />
      </mesh>

      <mesh ref={wireRef}>
        <octahedronGeometry args={[0.72, 1]} />
        <meshStandardMaterial
          color="#56b3ff"
          emissive="#56b3ff"
          emissiveIntensity={0.55}
          metalness={0.65}
          roughness={0.18}
          wireframe
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial color="#fff8e8" emissive="#ffc857" emissiveIntensity={2.8} />
      </mesh>

      <mesh ref={ringRef} rotation={[1.2, 0, 0.3]}>
        <torusGeometry args={[1.65, 0.02, 14, 180]} />
        <meshStandardMaterial color="#22f7c8" emissive="#22f7c8" emissiveIntensity={0.8} />
      </mesh>

      <mesh ref={orbitARef}>
        <sphereGeometry args={[0.1, 14, 14]} />
        <meshStandardMaterial color="#ffffff" emissive="#56b3ff" emissiveIntensity={3.8} />
      </mesh>

      <mesh ref={orbitBRef}>
        <sphereGeometry args={[0.08, 14, 14]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffc857" emissiveIntensity={3.6} />
      </mesh>
    </group>
  )
}

function DataFlow() {
  const groupRef = useRef(null)
  const barsRef = useRef([])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.22
    }
    barsRef.current.forEach((mesh, i) => {
      if (!mesh) return
      mesh.position.y = Math.sin(t * 1.1 + i * 0.7) * 0.22
      mesh.rotation.y = t * 0.42
    })
  })

  return (
    <group ref={groupRef}>
      <mesh rotation={[0.8, 0, 0]} position={[0, -1.15, 0]}>
        <torusGeometry args={[1.55, 0.05, 18, 220]} />
        <meshStandardMaterial color="#56b3ff" emissive="#56b3ff" emissiveIntensity={0.5} />
      </mesh>

      {[-1.05, -0.35, 0.35, 1.05].map((x, i) => (
        <mesh
          key={x}
          ref={(el) => {
            barsRef.current[i] = el
          }}
          position={[x, 0, 0]}
        >
          <boxGeometry args={[0.34, 1.1 + i * 0.24, 0.34]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#22f7c8' : '#ffc857'}
            emissive={i % 2 === 0 ? '#22f7c8' : '#ffc857'}
            emissiveIntensity={0.35}
            metalness={0.45}
            roughness={0.22}
          />
        </mesh>
      ))}

      <mesh position={[0, 1.25, 0]}>
        <icosahedronGeometry args={[0.28, 1]} />
        <meshStandardMaterial color="#fff8e8" emissive="#ff7f6a" emissiveIntensity={0.7} wireframe />
      </mesh>
    </group>
  )
}

function HeroMiniScene({ type = 'core' }) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 5.8], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <fog attach="fog" args={['#04121e', 9.5, 22]} />
      <ambientLight intensity={0.52} />
      <pointLight position={[0, 0, 0]} intensity={20} color="#56b3ff" />
      <pointLight position={[-6, 3, 2]} intensity={11} color="#22f7c8" />
      <pointLight position={[6, 2, 2]} intensity={11} color="#ffc857" />

      <Stars radius={40} depth={28} count={1800} factor={2.8} saturation={0.2} fade speed={0.45} />
      <Sparkles count={70} scale={8} size={2.4} speed={0.35} color="#56b3ff" opacity={0.32} />
      <Sparkles count={50} scale={7} size={2.8} speed={0.2} color="#22f7c8" opacity={0.26} />

      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.36}>
        {type === 'data' ? <DataFlow /> : <DevCore />}
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.28}
      />
    </Canvas>
  )
}

/* ─── Nav ───────────────────────────────────────────────────────── */
function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' nav--solid' : ''}`}>
      <a href="#hero" className="nav-logo">
        <span>Y</span>RM
      </a>
      <ul className={`nav-menu${menuOpen ? ' nav-menu--open' : ''}`}>
        {sectionLinks.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
              className={activeSection === id ? 'is-active' : ''}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          </li>
        ))}
      </ul>
      <a className="nav-hire" href="#contact">Hire Me</a>
      <button
        className="nav-burger"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}

/* ─── Section wrapper ───────────────────────────────────────────── */
function Section({ id, label, title, alt, motion = 'rise', children }) {
  return (
    <section id={id} data-motion={motion} className={`sec sec--observe${alt ? ' sec--alt' : ''}`}>
      <div className="sec-inner">
        {label && <p className="sec-label">{label}</p>}
        {title && <h2 className="sec-title">{title}</h2>}
        {children}
      </div>
    </section>
  )
}

/* ─── App ───────────────────────────────────────────────────────── */
export default function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [activeProjectIndex, setActiveProjectIndex] = useState(-1)
  const activeProject = activeProjectIndex >= 0 ? projects[activeProjectIndex] : null

  useEffect(() => {
    const sections = document.querySelectorAll('.sec--observe')
    if (!sections.length) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      sections.forEach((section) => section.classList.add('sec--in'))
      return undefined
    }

    const animProfile = {
      rise: {
        keyframes: [
          { opacity: 0, transform: 'translate3d(0, 62px, 0) scale(0.975)', filter: 'blur(10px)' },
          { opacity: 1, transform: 'translate3d(0, -7px, 0) scale(1.006)', filter: 'blur(0)', offset: 0.72 },
          { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)', filter: 'blur(0)' },
        ],
        easing: 'cubic-bezier(0.17, 1, 0.3, 1)',
      },
      left: {
        keyframes: [
          { opacity: 0, transform: 'translate3d(-84px, 20px, 0) rotate(-0.6deg) scale(0.986)', filter: 'blur(10px)' },
          { opacity: 1, transform: 'translate3d(5px, -2px, 0) rotate(0.1deg) scale(1.002)', filter: 'blur(0)', offset: 0.75 },
          { opacity: 1, transform: 'translate3d(0, 0, 0) rotate(0) scale(1)', filter: 'blur(0)' },
        ],
        easing: 'cubic-bezier(0.2, 0.95, 0.22, 1)',
      },
      right: {
        keyframes: [
          { opacity: 0, transform: 'translate3d(84px, 20px, 0) rotate(0.6deg) scale(0.986)', filter: 'blur(10px)' },
          { opacity: 1, transform: 'translate3d(-5px, -2px, 0) rotate(-0.1deg) scale(1.002)', filter: 'blur(0)', offset: 0.75 },
          { opacity: 1, transform: 'translate3d(0, 0, 0) rotate(0) scale(1)', filter: 'blur(0)' },
        ],
        easing: 'cubic-bezier(0.2, 0.95, 0.22, 1)',
      },
      zoom: {
        keyframes: [
          { opacity: 0, transform: 'translate3d(0, 30px, 0) scale(0.86)', filter: 'blur(12px)' },
          { opacity: 1, transform: 'translate3d(0, -4px, 0) scale(1.015)', filter: 'blur(0)', offset: 0.74 },
          { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)', filter: 'blur(0)' },
        ],
        easing: 'cubic-bezier(0.18, 1, 0.25, 1)',
      },
      tilt: {
        keyframes: [
          { opacity: 0, transform: 'translate3d(0, 44px, 0) perspective(1200px) rotateX(10deg) rotateY(-7deg)', filter: 'blur(11px)' },
          { opacity: 1, transform: 'translate3d(0, -2px, 0) perspective(1200px) rotateX(-0.8deg) rotateY(0.6deg)', filter: 'blur(0)', offset: 0.7 },
          { opacity: 1, transform: 'translate3d(0, 0, 0) perspective(1200px) rotateX(0) rotateY(0)', filter: 'blur(0)' },
        ],
        easing: 'cubic-bezier(0.16, 1, 0.22, 1)',
      },
      float: {
        keyframes: [
          { opacity: 0, transform: 'translate3d(0, 58px, 0) rotate(-1.5deg) scale(0.985)', filter: 'blur(10px)' },
          { opacity: 1, transform: 'translate3d(0, -8px, 0) rotate(0.45deg) scale(1.004)', filter: 'blur(0)', offset: 0.7 },
          { opacity: 1, transform: 'translate3d(0, 0, 0) rotate(0) scale(1)', filter: 'blur(0)' },
        ],
        easing: 'cubic-bezier(0.2, 1, 0.2, 1)',
      },
      swing: {
        keyframes: [
          { opacity: 0, transform: 'translate3d(0, 22px, 0) perspective(1200px) rotateY(-10deg) rotateX(2deg)', filter: 'blur(9px)' },
          { opacity: 1, transform: 'translate3d(0, -2px, 0) perspective(1200px) rotateY(1.8deg) rotateX(-0.2deg)', filter: 'blur(0)', offset: 0.72 },
          { opacity: 1, transform: 'translate3d(0, 0, 0) perspective(1200px) rotateY(0) rotateX(0)', filter: 'blur(0)' },
        ],
        easing: 'cubic-bezier(0.2, 1, 0.22, 1)',
      },
      focus: {
        keyframes: [
          { opacity: 0, transform: 'translate3d(0, 32px, 0) scale(0.955)', filter: 'blur(14px)' },
          { opacity: 1, transform: 'translate3d(0, -2px, 0) scale(1.006)', filter: 'blur(0)', offset: 0.76 },
          { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)', filter: 'blur(0)' },
        ],
        easing: 'cubic-bezier(0.22, 1, 0.24, 1)',
      },
    }

    const animateSection = (section) => {
      const inner = section.querySelector('.sec-inner')
      if (!inner || section.dataset.motionDone === 'true') return

      const motion = section.dataset.motion || 'rise'
      const profile = animProfile[motion] || animProfile.rise

      section.dataset.motionDone = 'true'
      section.classList.add('sec--in')

      inner.animate(profile.keyframes, {
        duration: 1050,
        easing: profile.easing,
        fill: 'forwards',
      })

      const pieces = [
        inner.querySelector('.sec-label'),
        inner.querySelector('.sec-title'),
        ...Array.from(inner.children).filter((el) => !el.classList.contains('sec-label') && !el.classList.contains('sec-title')),
      ].filter(Boolean)

      pieces.forEach((el, index) => {
        const delay = 120 + index * 95
        el.animate(
          [
            { opacity: 0, transform: 'translate3d(0, 18px, 0)', filter: 'blur(7px)' },
            { opacity: 1, transform: 'translate3d(0, 0, 0)', filter: 'blur(0)' },
          ],
          {
            duration: 680,
            delay,
            easing: 'cubic-bezier(0.21, 1, 0.31, 1)',
            fill: 'both',
          },
        )
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          animateSection(entry.target)
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const nodes = sectionLinks
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!nodes.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        threshold: [0.2, 0.4, 0.6, 0.8],
        rootMargin: '-20% 0px -55% 0px',
      },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return undefined

    const onMove = (event) => {
      const rect = hero.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return

      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 26
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 20
      hero.style.setProperty('--hero-mx', `${x}px`)
      hero.style.setProperty('--hero-my', `${y}px`)
    }

    const onScroll = () => {
      const rect = hero.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, 1 - rect.top / (window.innerHeight || 1)))
      hero.style.setProperty('--hero-sy', `${progress * 18}px`)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!activeProject) return undefined

    const onKeys = (event) => {
      if (event.key === 'Escape') {
        setActiveProjectIndex(-1)
      }
      if (event.key === 'ArrowRight') {
        setActiveProjectIndex((i) => (i + 1) % projects.length)
      }
      if (event.key === 'ArrowLeft') {
        setActiveProjectIndex((i) => (i - 1 + projects.length) % projects.length)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeys)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeys)
    }
  }, [activeProject])

  return (
    <div className="root">
      <Nav activeSection={activeSection} />

      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero-bg-3d" aria-hidden="true">
          <div className="hero-bg-pane hero-bg-pane--single">
            <HeroMiniScene type="data" />
          </div>
        </div>
        <div className="hero-body">
          <div className="hero-badge">
            <span className="badge-dot" />
            Available for opportunities
          </div>
          <h1 className="hero-name">
            Yogananda<br />
            <span className="gradient-text">Reddy</span><br />
            Murikinati
          </h1>
          <p className="hero-role">Full Stack Developer II · FedEx · Memphis, TN</p>
          <p className="hero-sub">
            Building scalable, cloud-native enterprise applications with Java, Spring Boot,
            Angular &amp; AWS. Google Certified Advanced Data Analyst.
          </p>
          <div className="hero-ctas">
            <a href="#contact" className="cta cta--fill">Let's Connect</a>
            <a href="#experience" className="cta cta--outline">View Experience</a>
          </div>
          <div className="hero-socials">
            <a
              href="https://www.linkedin.com/in/yogananda-reddy-murikinati/"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.37h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.6z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://github.com/ymurikinati"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.57v-2c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.74-1.33-1.74-1.09-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48 1 .11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013.01-.4c1.02 0 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.57C20.56 22.3 24 17.81 24 12.5 24 5.87 18.63.5 12 .5z" />
              </svg>
              GitHub
            </a>
            <a href="mailto:murikinatiyoganandareddy@gmail.com" className="social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 7 10-7" />
              </svg>
              Email
            </a>
          </div>
        </div>
        <div className="hero-scroll">
          <span className="scroll-line" />
          <span className="scroll-text">Scroll</span>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" label="About Me" title="Full Stack Developer." motion="left">
        <div className="bento">
          <div className="bento-card bento-bio glass">
            <p>
              I'm a Full Stack Developer at FedEx building enterprise-grade Java &amp; Angular
              applications in a cloud-native CI/CD environment. I hold an M.S. in Information
              Technology from Arizona State University and a B.Tech in CSE.
            </p>
            <p>
              Previously at Accenture, I implemented SAP MM modules, automated processes with
              Python &amp; SQL, and built executive dashboards in Power BI &amp; Tableau. Certified
              Google Advanced Data Analyst.
            </p>
          </div>
          <div className="bento-card bento-stat glass">
            <strong className="gradient-text">3+</strong>
            <span>Years of<br />Experience</span>
          </div>
          <div className="bento-card bento-stat glass">
            <strong className="gradient-text">M.S.</strong>
            <span>Arizona State<br />University</span>
          </div>
          <div className="bento-card bento-stat glass">
            <strong className="gradient-text">10</strong>
            <span>Industry<br />Certifications</span>
          </div>
          <div className="bento-card bento-wide glass bento-location">
            <span className="loc-dot" />
            <span>Memphis, Tennessee, United States</span>
          </div>
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" label="Work Experience" title="Where I've worked" motion="rise" alt>
        <div className="xp-list">
          {experience.map((job, i) => (
            <div className="xp-item" key={i}>
              <div className="xp-connector">
                <div className="xp-dot" style={{ boxShadow: `0 0 14px ${job.companyColor}` }} />
                {i < experience.length - 1 && <div className="xp-line" />}
              </div>
              <div className="xp-card glass">
                <div className="xp-head">
                  <div>
                    <span className="xp-company" style={{ color: job.companyColor }}>{job.company}</span>
                    <h3 className="xp-role">{job.role}</h3>
                    <span className="xp-loc">{job.location}</span>
                  </div>
                  <span className="xp-period">{job.period}</span>
                </div>
                <ul className="xp-bullets">
                  {job.bullets.map((b) => (
                    <li key={b}>
                      <span className="bullet-arrow">→</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* AWARDS */}
      <Section id="awards" label="Recognition" title="Awards & Achievements" motion="zoom">
        <div className="awards-grid">
          {awards.map((award) => (
            <article className="award-card glass" key={award.title}>
              <div className="award-image-wrap">
                <img
                  className="award-image"
                  src={award.image}
                  alt={`${award.title} certificate`}
                  loading="lazy"
                />
              </div>
              <div className="award-body">
                <p className="award-org">{award.org}</p>
                <h3 className="award-title">{award.title}</h3>
                <p className="award-note">{award.note}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" label="Technical Skills" title="What I work with" motion="tilt">
        <div className="skills-grid">
          {skills.map(({ category, items }) => (
            <div className="skill-card glass" key={category}>
              <h3 className="skill-cat">{category}</h3>
              <div className="skill-pills">
                {items.map((item) => (
                  <span className="pill" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* EDUCATION */}
      <Section id="education" label="Education" title="Academic Journey" motion="right" alt>
        <div className="edu-list">
          {education.map((e) => (
            <div className="edu-card glass" key={e.degree} style={{ '--accent': e.accent }}>
              <div className="edu-accent-bar" />
              <div className="edu-body">
                <span className="edu-period">{e.period}</span>
                <h3 className="edu-degree">{e.degree}</h3>
                <p className="edu-school">{e.school}</p>
                <p className="edu-detail">{e.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CERTIFICATIONS */}
      <Section id="certifications" label="Certifications" title="Credentials & Honors" motion="float">
        <div className="cert-grid">
          {certifications.map((c) => (
            <a
              key={c.name}
              href={c.link}
              target="_blank"
              rel="noreferrer"
              className="cert-card glass cert-link"
              title="View certification"
            >
              <span className="cert-check">✓</span>
              <div>
                <p className="cert-name">{c.name}</p>
                <p className="cert-org">{c.org}</p>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" label="Portfolio" title="My Projects 📚" motion="swing" alt>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <article key={i} className="project-card glass">
              <div className={`project-cover project-cover--${(i % 6) + 1}`}>
                <span className="project-cover-tech">{project.tech}</span>
              </div>
              <button
                className="project-header"
                onClick={() => setActiveProjectIndex(i)}
              >
                <div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-card-sub">Open full case details</p>
                </div>
                <span className="project-toggle">View</span>
              </button>
            </article>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" label="Get In Touch" title="Let's Connect" motion="focus" alt>
        <div className="contact-box glass">
          <div className="contact-layout">
            <div className="contact-copy">
              <p className="contact-eyebrow">Let's work together</p>
              <p className="contact-sub">
                I'm open to full stack developer and data engineering opportunities.
                Drop me a message and I'll get back to you promptly.
              </p>
            </div>

            <div className="contact-panel">
              <a className="contact-mail" href="mailto:murikinatiyoganandareddy@gmail.com">
                murikinatiyoganandareddy@gmail.com
              </a>

              <div className="contact-row">
                <a
                  href="https://www.linkedin.com/in/yogananda-reddy-murikinati/"
                  className="contact-social"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://github.com/ymurikinati"
                  className="contact-social"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <footer className="footer">
        <p>© 2026 Yogananda Reddy Murikinati · Memphis, TN</p>
        <p className="footer-sub">Built with React, Three.js &amp; Vite</p>
      </footer>

      {activeProject && (
        <div className="project-modal-backdrop" onClick={() => setActiveProjectIndex(-1)} role="presentation">
          <div
            className="project-modal glass"
            role="dialog"
            aria-modal="true"
            aria-label={activeProject.title}
            onClick={(event) => event.stopPropagation()}
          >
            <button className="project-modal-close" onClick={() => setActiveProjectIndex(-1)} aria-label="Close project details">
              ×
            </button>

            <div className={`project-modal-hero project-cover--${(activeProjectIndex % 6) + 1}`}>
              <span className="project-cover-tech">{activeProject.tech}</span>
            </div>

            <p className="project-modal-kicker">Project Case</p>
            <h3 className="project-modal-title">{activeProject.title}</h3>
            <p className="project-description">{activeProject.description}</p>

            <div className="project-tech">
              <strong>Stack:</strong> {activeProject.tech}
            </div>

            <div className="project-skills">
              <strong>Skills:</strong>
              <div className="skill-pills">
                {activeProject.skills.map((skill) => (
                  <span className="pill" key={skill}>{skill}</span>
                ))}
              </div>
            </div>

            {Object.keys(activeProject.links).length > 0 && (
              <div className="project-links">
                {activeProject.links.dashboard && (
                  <a href={activeProject.links.dashboard} target="_blank" rel="noreferrer" className="link-btn">
                    View Dashboard ↗
                  </a>
                )}
                {activeProject.links.github && (
                  <a href={activeProject.links.github} target="_blank" rel="noreferrer" className="link-btn">
                    GitHub ↗
                  </a>
                )}
                {activeProject.links.live && (
                  <a href={activeProject.links.live} target="_blank" rel="noreferrer" className="link-btn">
                    Live Demo ↗
                  </a>
                )}
                {activeProject.links.pdf && activeProject.links.pdf !== '#' && (
                  <a href={activeProject.links.pdf} target="_blank" rel="noreferrer" className="link-btn">
                    Read PDF ↗
                  </a>
                )}
                {activeProject.links.pdf && activeProject.links.pdf === '#' && (
                  <span className="link-btn link-btn-disabled">
                    PDF Coming Soon
                  </span>
                )}
              </div>
            )}

            <div className="project-modal-nav">
              <button
                className="project-modal-nav-btn"
                onClick={() => setActiveProjectIndex((i) => (i - 1 + projects.length) % projects.length)}
              >
                ← Previous
              </button>
              <button
                className="project-modal-nav-btn"
                onClick={() => setActiveProjectIndex((i) => (i + 1) % projects.length)}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}