import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiDownload, FiX } from 'react-icons/fi'
import Slider from 'react-slick'
import { usePortfolioData } from '../hooks/usePortfolioData'

// ── Local image fallbacks (used when Supabase image_urls are empty) ──────────
import dashboard1 from '../assets/images/Dashboard1.png'
import dashboard2 from '../assets/images/Dashboard2.png'
import dashboard3 from '../assets/images/Dashboard3.png'
import freshLogo from '../assets/images/fresh-logo.png'
import FreshNewsImg1 from '../assets/images/FreshNews1.jpeg'
import FreshNewsImg2 from '../assets/images/FreshNews2.jpeg'
import FreshNewsImg3 from '../assets/images/FreshNews3.jpeg'
import FreshNewsImg4 from '../assets/images/FreshNews4.jpeg'
import FreshNewsImg5 from '../assets/images/FreshNews5.jpeg'
import QuickHrLogo from '../assets/images/QuickHrLogo.jpg'
import QuickHr1 from '../assets/images/QuickHr1.jpeg'
import QuickHr2 from '../assets/images/QuickHr2.jpeg'
import QuickHr3 from '../assets/images/QuickHr3.jpeg'
import QuickHr4 from '../assets/images/QuickHr4.jpeg'
import formsLogo from '../assets/images/fromsLogo.png'
import Form1 from '../assets/images/Form1.jpeg'
import Form2 from '../assets/images/Form2.jpeg'
import Form3 from '../assets/images/Form3.jpeg'
import Form4 from '../assets/images/Form4.jpeg'

const LOCAL_IMAGES = {
  'Sales Dashboard':         [dashboard1, dashboard2, dashboard3],
  'Fresh News':              [freshLogo, FreshNewsImg1, FreshNewsImg2, FreshNewsImg3, FreshNewsImg4, FreshNewsImg5],
  'HRMS – Leave Management': [QuickHrLogo, QuickHr1, QuickHr2, QuickHr3, QuickHr4],
  'Employee Form App':       [formsLogo, Form1, Form2, Form3, Form4],
}

// ── Play Store icon SVG ───────────────────────────────────────────────────────
function PlayStoreIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 512 512" fill="currentColor">
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l2.7 1.5 246.9-246.9v-5.8L47 0zm301.6 319.5l-82.3-82.3v-5.8l82.3-82.3 18.3 10.5 97.7 55.5c27.9 15.8 27.9 41.8 0 57.7l-97.7 55.5-18.3 10.5zm-219.2 80.7L373.5 279.5l-51.5-51.5L47 512l82.4-111.8z"/>
    </svg>
  )
}

// ── Carousel arrow ────────────────────────────────────────────────────────────
function Arrow({ dir, onClick }) {
  return (
    <div style={{ position: 'absolute', [dir === 'next' ? 'right' : 'left']: 8, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
      <button
        onClick={onClick}
        style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--surface)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--text-primary)', cursor: 'pointer', transition: 'border-color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        {dir === 'next' ? <FiChevronRight size={16} /> : <FiChevronLeft size={16} />}
      </button>
    </div>
  )
}

// ── Project action buttons ────────────────────────────────────────────────────
// Priority: APK download > Play Store > Live site
// If none → no button shown
function ProjectActions({ project }) {
  const { apk, playstore_url, url } = project

  // APK download (local bundle, always available for the 3 mobile apps)
  if (apk) {
    return (
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        <a
          href={apk.path}
          download={apk.filename}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', borderRadius: 999,
            background: 'var(--accent)', color: '#0a0a0a',
            fontFamily: 'Syne', fontWeight: 700, fontSize: '0.85rem',
            textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(200,241,53,0.3)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
        >
          <FiDownload size={15} /> Download APK
        </a>

        {/* Also show Play Store link alongside APK if available */}
        {playstore_url && (
          <a
            href={playstore_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 20px', borderRadius: 999,
              border: '1px solid var(--border)', color: 'var(--text-secondary)',
              fontFamily: 'Syne', fontWeight: 600, fontSize: '0.85rem',
              textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#01875f'; e.currentTarget.style.color = '#01875f' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            <PlayStoreIcon /> Play Store
          </a>
        )}
      </div>
    )
  }

  // Play Store only (future — once published, add playstore_url in Supabase)
  if (playstore_url) {
    return (
      <a
        href={playstore_url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '10px 20px', borderRadius: 999,
          background: '#01875f', color: '#fff',
          fontFamily: 'Syne', fontWeight: 700, fontSize: '0.85rem',
          textDecoration: 'none', transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        <PlayStoreIcon /> View on Play Store
      </a>
    )
  }

  // Live website (web projects like Sales Dashboard)
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '10px 20px', borderRadius: 999,
          border: '1px solid var(--border)', color: 'var(--text-primary)',
          fontFamily: 'Syne', fontWeight: 600, fontSize: '0.85rem',
          textDecoration: 'none', transition: 'border-color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        <FiExternalLink size={15} /> Open Site
      </a>
    )
  }

  return null
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Projects() {
  const { projects } = usePortfolioData()
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeDot, setActiveDot] = useState(0)
  const [popupDot, setPopupDot] = useState(0)
  const sliderRef = useRef(null)

  // Merge Supabase data with local image fallbacks
  const projectsData = (projects || []).map(p => ({
    ...p,
    images: p.image_urls?.length > 0 ? p.image_urls : (LOCAL_IMAGES[p.title] || []),
  }))

  const carouselSettings = {
    infinite: true,
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 450,
    dots: true,
    arrows: true,
    nextArrow: <Arrow dir="next" />,
    prevArrow: <Arrow dir="prev" />,
    beforeChange: (_, i) => setActiveDot(i),
    afterChange: i => setActiveSlide(i),
    customPaging: i => (
      <div style={{
        width: i === activeDot ? 20 : 8, height: 8, borderRadius: 999,
        background: i === activeDot ? 'var(--accent)' : 'var(--border)',
        transition: 'width 0.3s, background 0.3s',
      }} />
    ),
    appendDots: dots => (
      <div style={{ marginTop: 32 }}>
        <ul style={{ display: 'flex', gap: 6, justifyContent: 'center', listStyle: 'none', padding: 0 }}>{dots}</ul>
      </div>
    ),
    responsive: [{ breakpoint: 768, settings: { slidesToShow: 1, centerPadding: '32px' } }],
  }

  return (
    <section style={{ minHeight: '100vh', position: 'relative', zIndex: 1, paddingTop: '6rem', paddingBottom: '4rem' }}>
      <div style={{ width: '92%', maxWidth: 1100, margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: 'Syne', fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Portfolio</p>
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: 'var(--text-primary)' }}>My Work</h1>
        </motion.div>

        {/* Carousel */}
        <Slider ref={sliderRef} {...carouselSettings}>
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              style={{ padding: '0 8px', paddingBottom: 16 }}
              onClick={() => {
                sliderRef.current?.slickGoTo(idx)
                setSelectedProject(project)
              }}
            >
              <div className="project-card">
                <div style={{ height: 200, overflow: 'hidden', background: 'var(--surface-2)' }}>
                  {project.images[0] && (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>
                <div style={{ padding: '20px 24px' }}>
                  <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: 10 }}>
                    {project.title}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {(project.tags || []).slice(0, 3).map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 16, zIndex: 100,
              }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                onClick={e => e.stopPropagation()}
                style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 640,
                  maxHeight: '90vh', overflow: 'auto',
                }}
              >
                {/* Header */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  padding: '24px 28px', borderBottom: '1px solid var(--border)',
                }}>
                  <div>
                    <h3 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: 10 }}>
                      {selectedProject.title}
                    </h3>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {(selectedProject.tags || []).map(tag => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    style={{
                      background: 'var(--surface-2)', border: '1px solid var(--border)',
                      borderRadius: 10, width: 36, height: 36, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--text-secondary)', cursor: 'pointer', marginLeft: 12,
                    }}
                  >
                    <FiX size={16} />
                  </button>
                </div>

                {/* Image slider */}
                <div style={{ padding: '24px 28px 8px' }}>
                  <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', background: 'var(--surface-2)', position: 'relative' }}>
                    <Slider
                      infinite={false}
                      slidesToShow={1}
                      dots={true}
                      arrows={true}
                      nextArrow={<Arrow dir="next" />}
                      prevArrow={<Arrow dir="prev" />}
                      beforeChange={(_, i) => setPopupDot(i)}
                      customPaging={i => (
                        <div style={{
                          width: i === popupDot ? 16 : 6, height: 6, borderRadius: 999,
                          background: i === popupDot ? 'var(--accent)' : 'var(--border)',
                          transition: 'width 0.3s',
                        }} />
                      )}
                      appendDots={dots => (
                        <div style={{ paddingBottom: 10 }}>
                          <ul style={{ display: 'flex', gap: 4, justifyContent: 'center', listStyle: 'none', padding: 0, marginTop: 8 }}>{dots}</ul>
                        </div>
                      )}
                    >
                      {selectedProject.images.map((src, i) => (
                        <div key={i}>
                          <img
                            src={src}
                            alt={`${selectedProject.title} ${i}`}
                            style={{ width: '100%', height: 280, objectFit: 'contain', background: 'var(--surface-2)' }}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '16px 28px 28px' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 24 }}>
                    {selectedProject.description}
                  </p>
                  <ProjectActions project={selectedProject} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
