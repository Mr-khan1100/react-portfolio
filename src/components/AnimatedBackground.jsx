// Subtle ambient background — two slow-drifting blobs
export default function AnimatedBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute',
        width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,241,53,0.08) 0%, transparent 70%)',
        top: '-10%', left: '-10%',
        animation: 'drift1 22s ease-in-out infinite alternate',
        filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute',
        width: 500, height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
        bottom: '-10%', right: '5%',
        animation: 'drift2 18s ease-in-out infinite alternate',
        filter: 'blur(80px)',
      }} />
      <style>{`
        @keyframes drift1 {
          from { transform: translate(0, 0) }
          to   { transform: translate(60px, 40px) }
        }
        @keyframes drift2 {
          from { transform: translate(0, 0) }
          to   { transform: translate(-50px, -30px) }
        }
      `}</style>
    </div>
  )
}
