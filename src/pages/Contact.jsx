import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiLinkedin, FiGithub, FiSend, FiMail, FiMapPin } from 'react-icons/fi'
import emailjs from 'emailjs-com'
import emailConfig from '../config/config'
import { usePortfolioData } from '../hooks/usePortfolioData'

export default function Contact() {
  const { profile } = usePortfolioData()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSending(true)
    try {
      await emailjs.send(emailConfig.serviceId, emailConfig.templateId, formData, emailConfig.userId)
      setFormData({ name: '', email: '', message: '' })
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    } finally {
      setIsSending(false)
      setTimeout(() => setStatus(''), 4000)
    }
  }

  const socials = [
    {
      href: profile?.linkedin_url || 'https://www.linkedin.com/in/habib-khan-62b63522b/',
      label: 'LinkedIn',
      icon: <FiLinkedin size={20} />,
      color: '#0077b5',
    },
    {
      href: profile?.github_url || 'https://github.com/Mr-khan1100',
      label: 'GitHub',
      icon: <FiGithub size={20} />,
      color: '#f0f0ee',
    },
  ]

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, paddingTop: '6rem', paddingBottom: '4rem' }}>
      <div className="container mx-auto px-6 max-w-5xl">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p style={{ fontFamily: 'Syne', fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Get in touch</p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>
            Let's Work Together
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 480, lineHeight: 1.7, marginBottom: 56, fontWeight: 300 }}>
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12">

          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ flex: '0 0 auto', width: '100%', maxWidth: 260 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {[
                {
                  icon: <FiMail size={18} />,
                  label: 'Email',
                  value: 'hk6632521@email.com',
                  href: 'mailto:hk6632521@email.com',
                },
                {
                  icon: <FiMapPin size={18} />,
                  label: 'Location',
                  value: 'Mumbai, India',
                  href: null,
                },
              ].map(({ icon, label, value, href }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)', flexShrink: 0,
                  }}>
                    {icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Syne', marginBottom: 2 }}>{label}</p>
                    {href
                      ? <a href={href} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textDecoration: 'none' }}>{value}</a>
                      : <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{value}</p>
                    }
                  </div>
                </div>
              ))}

              {/* Socials */}
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Syne', marginBottom: 14 }}>Socials</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  {socials.map(({ href, label, icon, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={label}
                      style={{
                        width: 42, height: 42, borderRadius: 10,
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = color
                        e.currentTarget.style.color = color
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border)'
                        e.currentTarget.style.color = 'var(--text-secondary)'
                        e.currentTarget.style.transform = ''
                      }}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ flex: 1 }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="field"
                  style={{ flex: 1, minWidth: 160 }}
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="field"
                  style={{ flex: 1, minWidth: 160 }}
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <textarea
                placeholder="Your Message"
                rows={6}
                className="field"
                style={{ resize: 'vertical', minHeight: 140 }}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                required
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <button
                  type="submit"
                  disabled={isSending}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    padding: '13px 28px',
                    background: isSending ? 'var(--surface-2)' : 'var(--accent)',
                    color: isSending ? 'var(--text-muted)' : '#0a0a0a',
                    fontFamily: 'Syne', fontWeight: 700, fontSize: '0.9rem',
                    border: 'none', borderRadius: 999,
                    cursor: isSending ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => { if (!isSending) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(200,241,53,0.3)' } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
                >
                  {isSending
                    ? <><span style={{ width: 16, height: 16, border: '2px solid var(--border)', borderTop: '2px solid var(--text-secondary)', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} /> Sending…</>
                    : <><FiSend size={15} /> Send Message</>
                  }
                </button>

                {status === 'success' && (
                  <motion.p initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>
                    ✓ Message sent!
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} style={{ color: '#f87171', fontSize: '0.9rem' }}>
                    ✕ Failed to send. Try again.
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
