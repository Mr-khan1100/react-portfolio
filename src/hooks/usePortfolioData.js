import { useState, useEffect } from 'react'
import { supabase, getPublicUrl } from '../config/supabase'

// ─── Local APK imports (always served from bundle — Supabase free tier is 50MB) ───
import FreshNewsApk from '../assets/apk/Fresh-news.apk'
import QuickHrApk from '../assets/apk/QuickHr.apk'
import EmployeeFormApk from '../assets/apk/Employee-Form.apk'

// Keyed by project title (matches what's stored in Supabase)
const LOCAL_APKS = {
  'Fresh News':              { path: FreshNewsApk,     filename: 'Fresh-News.apk' },
  'HRMS – Leave Management': { path: QuickHrApk,       filename: 'QuickHr.apk' },
  'Employee Form App':       { path: EmployeeFormApk,  filename: 'Employee-Form.apk' },
}

// ─── Fallback static data (used when Supabase tables are empty / not yet set up) ───

const FALLBACK_PROFILE = {
  name: 'Habib Khan',
  role: 'Frontend Developer',
  bio: 'Frontend Developer who builds sleek, responsive websites with React.js and cross-platform mobile apps with React Native. I turn designs into pixel-perfect, high-performance interfaces that delight users on any device.',
  profile_image_url: null,
  resume_url: '/documents/Habib_Khan_Resume.pdf',
  linkedin_url: 'https://www.linkedin.com/in/habib-khan-62b63522b/',
  github_url: 'https://github.com/Mr-khan1100',
}

const FALLBACK_SKILLS = [
  { name: 'JavaScript', level: 90, color: '#F7DF1E', years: 2,   icon: 'SiJavascript' },
  { name: 'React',      level: 85, color: '#61DAFB', years: 2,   icon: 'SiReact' },
  { name: 'Node.js',   level: 80, color: '#68A063', years: 2,   icon: 'SiNodedotjs' },
  { name: 'Python',    level: 65, color: '#3776AB', years: 0.6, icon: 'SiPython' },
  { name: 'MongoDB',   level: 60, color: '#47A248', years: 0.6, icon: 'SiMongodb' },
  { name: 'Git',       level: 70, color: '#F05032', years: 2,   icon: 'SiGit' },
  { name: 'MySQL',     level: 85, color: '#0089D6', years: 2,   icon: 'SiMysql' },
  { name: 'Firebase',  level: 85, color: '#FFCA28', years: 2,   icon: 'SiFirebase' },
  { name: 'HTML5',     level: 90, color: '#E34F26', years: 2,   icon: 'SiHtml5' },
  { name: 'CSS',       level: 90, color: '#1572B6', years: 2,   icon: 'SiCss3' },
]

const FALLBACK_EDUCATION = [
  {
    degree: 'B.Tech in Information Technology',
    university: "Vasantdada Patil Pratishthan's College of Engineering | Mumbai University",
    duration: '2019 – 2023',
    logo_url: null,
  },
]

const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'Sales Dashboard',
    description: 'Dynamic Sales Dashboard with Charts to show growth, manage sign-in, and traffic on your website. Responsive design with minimalistic colors and icons.',
    url: 'https://nova-sales-dashboard.netlify.app/',
    playstore_url: null,
    apk: null,           // no APK — has live URL instead
    image_urls: [],
    tags: ['React', 'Charts', 'Responsive'],
  },
  {
    id: 2,
    title: 'Fresh News',
    description: 'Mobile app for reading the latest news from all over the world. Bookmark articles, filter by category, date and country. Search and read in WebView.',
    url: null,
    playstore_url: null, // set your Play Store URL in Supabase when published
    apk: LOCAL_APKS['Fresh News'],
    image_urls: [],
    tags: ['React Native', 'News API', 'Mobile'],
  },
  {
    id: 3,
    title: 'HRMS – Leave Management',
    description: 'A leave management app with role-based access. Managers can approve or reject leave. Real-time status reflection and leave count with full validations.',
    url: null,
    playstore_url: null,
    apk: LOCAL_APKS['HRMS – Leave Management'],
    image_urls: [],
    tags: ['React Native', 'Firebase', 'HRMS'],
  },
  {
    id: 4,
    title: 'Employee Form App',
    description: 'Multi-step form app enforcing required fields with dynamic popups. Supports file upload as blob and many more features.',
    url: null,
    playstore_url: null,
    apk: LOCAL_APKS['Employee Form App'],
    image_urls: [],
    tags: ['React Native', 'Forms', 'Validation'],
  },
]

// ─── Fetch helpers ────────────────────────────────────────────────────────────

async function fetchProfile() {
  const { data, error } = await supabase.from('profile').select('*').single()
  if (error || !data) return FALLBACK_PROFILE
  if (data.profile_image_path) data.profile_image_url = getPublicUrl('assets', data.profile_image_path)
  if (data.resume_path)        data.resume_url        = getPublicUrl('assets', data.resume_path)
  return { ...FALLBACK_PROFILE, ...data }
}

async function fetchSkills() {
  const { data, error } = await supabase.from('skills').select('*').order('level', { ascending: false })
  if (error || !data || data.length === 0) return FALLBACK_SKILLS
  return data
}

async function fetchEducation() {
  const { data, error } = await supabase.from('education').select('*').order('id')
  if (error || !data || data.length === 0) return FALLBACK_EDUCATION
  return data.map(edu => ({
    ...edu,
    logo_url: edu.logo_path ? getPublicUrl('assets', edu.logo_path) : null,
  }))
}

async function fetchProjects() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*, project_images(path, sort_order)')
    .order('sort_order')

  if (error || !projects || projects.length === 0) return FALLBACK_PROJECTS

  return projects.map(p => {
    // Images always come from Supabase storage
    const image_urls = (p.project_images || [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(img => getPublicUrl('assets', img.path))

    // APK: use local bundle if this project has one — never from Supabase storage
    const apk = LOCAL_APKS[p.title] ?? null

    return {
      ...p,
      image_urls,
      apk,
      // playstore_url and url come straight from the Supabase row
      playstore_url: p.playstore_url ?? null,
      url:           p.url           ?? null,
      tags:          p.tags          ?? [],
    }
  })
}

// ─── Main hook ────────────────────────────────────────────────────────────────

export function usePortfolioData() {
  const [data, setData] = useState({ profile: null, skills: null, education: null, projects: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [profile, skills, education, projects] = await Promise.all([
        fetchProfile(), fetchSkills(), fetchEducation(), fetchProjects(),
      ])
      setData({ profile, skills, education, projects })
      setLoading(false)
    }
    load()
  }, [])

  return { ...data, loading }
}
