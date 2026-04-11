export default function DownloadButton({ url = '/documents/Habib_Khan_Resume.pdf' }) {
  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = url
    a.download = 'Habib_Khan_Resume.pdf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <button
      onClick={handleDownload}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 24px',
        background: 'var(--accent)',
        color: '#0a0a0a',
        fontFamily: 'Syne, sans-serif',
        fontWeight: 700,
        fontSize: '0.9rem',
        letterSpacing: '0.02em',
        borderRadius: 999,
        border: 'none',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(200,241,53,0.35)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Download CV
    </button>
  )
}
