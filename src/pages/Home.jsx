import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import DownloadCV from '../components/DownloadButton'
import { usePortfolioData } from '../hooks/usePortfolioData'
import profileImageFallback from '../assets/images/ProfileImage.jpg'

export default function Home() {
  const { profile, loading } = usePortfolioData()

  const profileImage = profile?.profile_image_url || profileImageFallback
  const resumeUrl = profile?.resume_url || '/documents/Habib_Khan_Resume.pdf'

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <div className="container mx-auto px-6 max-w-5xl" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
        <div className="flex flex-col md:flex-row items-center gap-16">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <div style={{
              display: 'inline-block',
              padding: '4px 14px',
              borderRadius: 999,
              background: 'var(--accent-dim)',
              border: '1px solid rgba(200,241,53,0.2)',
              marginBottom: 24,
            }}>
              <span style={{ fontFamily: 'DM Sans', fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Available for work
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>
              Hi, I'm<br />
              <span className="typewriter" style={{ color: 'var(--accent)' }}>
                {profile?.name || 'Habib Khan'}
              </span>
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: 32, maxWidth: 460, lineHeight: 1.7, fontWeight: 300 }}>
              {profile?.bio || 'Frontend Developer who builds sleek, responsive websites with React.js and cross-platform mobile apps with React Native.'}
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <DownloadCV url={resumeUrl} />
              <Link
                to="/projects"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 24px',
                  borderRadius: 999,
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                View Work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </Link>
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
              {[
                { href: profile?.linkedin_url || 'https://www.linkedin.com/in/habib-khan-62b63522b/', label: 'LinkedIn', icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                )},
                { href: profile?.github_url || 'https://github.com/Mr-khan1100', label: 'GitHub', icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                )},
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  style={{
                    width: 40, height: 40,
                    borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.transform = '' }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ flexShrink: 0 }}
          >
            <div style={{ position: 'relative', width: 280, height: 280 }}>
              {/* Accent ring */}
              <div style={{
                position: 'absolute', inset: -3,
                borderRadius: '50%',
                background: 'conic-gradient(var(--accent) 0deg 90deg, transparent 90deg)',
                animation: 'ring-spin 8s linear infinite',
              }} />
              <style>{`@keyframes ring-spin { to { transform: rotate(360deg) } }`}</style>
              {/* Image */}
              <div style={{
                position: 'absolute', inset: 3,
                borderRadius: '50%',
                background: 'var(--surface)',
                overflow: 'hidden',
                border: '2px solid var(--surface)',
              }}>
                <img
                  src={profileImage}
                  alt="Habib Khan"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </motion.div>

        </div>

        {/* Role label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ marginTop: 80, paddingTop: 40, borderTop: '1px solid var(--border)', display: 'flex', gap: 40, flexWrap: 'wrap' }}
        >
          {[
            { label: 'Role', value: profile?.role || 'Frontend Developer' },
            { label: 'Location', value: 'Mumbai, India' },
            { label: 'Focus', value: 'React · React Native' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4, fontFamily: 'Syne' }}>{label}</p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{value}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
