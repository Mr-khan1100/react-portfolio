import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { path: '/about', name: 'About' },
    { path: '/projects', name: 'Projects' },
    { path: '/contact', name: 'Contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed w-full z-50" style={{ borderBottom: '1px solid var(--border)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(10,10,10,0.8)' }}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-5xl">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div style={{
            width: 32, height: 32,
            background: 'var(--accent)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 0.2s'
          }} className="group-hover:scale-110">
            <img src="/MyLogo.png" alt="Logo" style={{ width: 22, height: 22, objectFit: 'contain', borderRadius: 4 }} />
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
            habib<span style={{ color: 'var(--accent)' }}>.k</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.9rem',
                fontWeight: isActive(link.path) ? 500 : 400,
                color: isActive(link.path) ? 'var(--accent)' : 'var(--text-secondary)',
                transition: 'color 0.2s',
                position: 'relative',
                textDecoration: 'none',
              }}
              onMouseEnter={e => { if (!isActive(link.path)) e.target.style.color = 'var(--text-primary)' }}
              onMouseLeave={e => { if (!isActive(link.path)) e.target.style.color = 'var(--text-secondary)' }}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.span
                  layoutId="nav-indicator"
                  style={{
                    position: 'absolute', bottom: -4, left: 0, right: 0,
                    height: 2, background: 'var(--accent)', borderRadius: 2
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg"
          style={{ color: 'var(--text-secondary)', background: 'var(--surface-2)', border: '1px solid var(--border)' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {isOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', overflow: 'hidden' }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    style={{
                      color: isActive(link.path) ? 'var(--accent)' : 'var(--text-secondary)',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '1rem',
                      textDecoration: 'none',
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
