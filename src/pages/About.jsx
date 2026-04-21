import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  SiJavascript, SiReact, SiNodedotjs, SiPython,
  SiMongodb, SiGit, SiMysql, SiFirebase, SiHtml5, SiCss3, SiSupabase,
  SiPostgresql
} from 'react-icons/si'
import { usePortfolioData } from '../hooks/usePortfolioData'
import UniversityLogoFallback from '../assets/images/UniversityLogo.png'

const ICON_MAP = {
  SiJavascript: <SiJavascript />,
  SiReact: <SiReact />,
  SiNodedotjs: <SiNodedotjs />,
  SiPython: <SiPython />,
  SiMongodb: <SiMongodb />,
  SiGit: <SiGit />,
  SiMysql: <SiMysql />,
  SiFirebase: <SiFirebase />,
  SiHtml5: <SiHtml5 />,
  SiCss3: <SiCss3 />,
  SiSupabase: <SiSupabase />,
  SiPostgresql: <SiPostgresql />
}

export default function About() {
  const { skills, education, loading } = usePortfolioData()
  const [selected, setSelected] = useState(null)

  const skillsData = skills || []
  const educationData = education || []

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, paddingTop: '6rem', paddingBottom: '4rem' }}>
      <div className="container mx-auto px-6 max-w-5xl">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p style={{ fontFamily: 'Syne', fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Who I am</p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 60 }}>
            About Me
          </h1>
        </motion.div>

        {/* Education */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: 72 }}
        >
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 24 }}>Education</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {educationData.map((edu, i) => (
              <div key={i} style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
              }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: 6 }}>{edu.degree}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 4 }}>{edu.university}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{edu.duration}</p>
                </div>
                <div style={{
                  width: 64, height: 64, borderRadius: 12,
                  border: '1px solid var(--border)',
                  background: 'var(--surface-2)',
                  overflow: 'hidden', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img
                    src={edu.logo_url || UniversityLogoFallback}
                    alt="University"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }}
                    onError={e => { e.target.src = UniversityLogoFallback }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 24 }}>Technical Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {skillsData.map((skill, index) => (
              <motion.button
                key={skill.name}
                className="skill-pill"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                onClick={() => setSelected(selected === index ? null : index)}
                style={{
                  border: selected === index ? `1px solid ${skill.color}40` : undefined,
                  background: selected === index ? `${skill.color}12` : undefined,
                  cursor: 'pointer',
                }}
              >
                <span style={{ color: skill.color, fontSize: '1.15rem' }}>
                  {ICON_MAP[skill.icon] || <SiReact />}
                </span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 400 }}>{skill.name}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: 4 }}>{skill.level}%</span>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Skill detail overlay */}
        <AnimatePresence>
          {selected !== null && skillsData[selected] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 100,
              }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={e => e.stopPropagation()}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '40px 48px',
                  textAlign: 'center',
                  minWidth: 240,
                  position: 'relative',
                }}
              >
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    position: 'absolute', top: 16, right: 16,
                    background: 'var(--surface-2)', border: '1px solid var(--border)',
                    borderRadius: 8, width: 32, height: 32,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-secondary)', cursor: 'pointer',
                  }}
                >
                  ✕
                </button>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: `${skillsData[selected].color}18`,
                  border: `2px solid ${skillsData[selected].color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '2.2rem',
                  color: skillsData[selected].color,
                }}>
                  {ICON_MAP[skillsData[selected].icon] || <SiReact />}
                </div>
                <h3 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: 8 }}>
                  {skillsData[selected].name}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 20 }}>
                  {skillsData[selected].years}+ years experience
                </p>
                {/* Progress bar */}
                <div style={{ background: 'var(--surface-2)', borderRadius: 999, height: 6, overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skillsData[selected].level}%` }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    style={{ height: '100%', borderRadius: 999, background: skillsData[selected].color }}
                  />
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 8 }}>{skillsData[selected].level}% proficiency</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
