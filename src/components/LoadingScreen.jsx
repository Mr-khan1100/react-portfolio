import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed', inset: 0,
        background: 'var(--bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 48, height: 48,
          borderRadius: '50%',
          border: '2px solid var(--border)',
          borderTop: '2px solid var(--accent)',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 16px',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        <p style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans', fontSize: '0.85rem' }}>Loading…</p>
      </div>
    </motion.div>
  )
}
