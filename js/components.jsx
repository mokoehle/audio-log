// AudioLog — Web UI Kit components
// Lucide-style 1.5-stroke inline SVG icons.

const Icon = ({ name, size = 18, color = 'currentColor', strokeWidth = 1.5 }) => {
  const paths = {
    library: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>,
    compass: <><circle cx="12" cy="12" r="10"/><polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"/></>,
    search: <><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    journal: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    star: <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>,
    home: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    headphones: <><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z"/></>,
    bookmark: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    chevronRight: <polyline points="9 18 15 12 9 6"/>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{flexShrink: 0}}>
      {paths[name]}
    </svg>
  );
};

const Stars = ({ value = 0, max = 5, size = 14 }) => (
  <div style={{ display: 'inline-flex', gap: 1 }}>
    {Array.from({length: max}, (_, i) => {
      const filled = i < value;
      return (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={filled ? 'var(--rating)' : 'none'}
          stroke={filled ? 'var(--rating)' : 'var(--fg-4)'}
          strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
      );
    })}
  </div>
);

const Button = ({ variant = 'primary', size = 'md', children, onClick, fullWidth, icon }) => {
  const variants = {
    primary:   { bg: 'var(--accent)', color: 'var(--accent-fg)' },
    secondary: { bg: 'var(--bg-2)',   color: 'var(--fg-1)', border: '1px solid var(--line-2)' },
    ghost:     { bg: 'transparent',   color: 'var(--fg-2)' },
  };
  const sizes = {
    sm: { padding: '6px 10px', fontSize: 12, radius: 8 },
    md: { padding: '9px 16px', fontSize: 13, radius: 10 },
    lg: { padding: '12px 22px', fontSize: 14, radius: 10 },
  };
  const v = variants[variant], s = sizes[size];
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7,
      padding: s.padding, borderRadius: s.radius, border: v.border || '1px solid transparent',
      background: v.bg, color: v.color,
      fontFamily: 'var(--font-sans)', fontSize: s.fontSize, fontWeight: 500,
      cursor: 'pointer', transition: 'all 140ms var(--ease-out)',
      width: fullWidth ? '100%' : 'auto',
    }}>
      {icon && <Icon name={icon} size={14}/>}
      {children}
    </button>
  );
};

// ─── Sidebar (web nav) ────────────────────────────────────
const Sidebar = ({ active, onChange }) => {
  const items = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'library', label: 'My library', icon: 'library' },
    { id: 'discover', label: 'Discover', icon: 'compass' },
    { id: 'journal', label: 'Journal', icon: 'journal' },
    { id: 'search', label: 'Search', icon: 'search' },
  ];
  const collections = [
    { id: 'currently', label: 'Currently listening', count: 3 },
    { id: 'queue', label: 'Up next', count: 12 },
    { id: 'rewind', label: 'Worth a re-listen', count: 8 },
  ];
  return (
    <aside className="sidebar-desktop" style={{
      width: 248, flexShrink: 0,
      borderRight: '1px solid var(--line-1)',
      background: 'var(--bg-0)',
      padding: '24px 16px',
      display: 'flex', flexDirection: 'column', gap: 28,
      position: 'sticky', top: 0, height: '100vh', overflow: 'auto',
    }}>
      {/* Logo */}
      <div style={{ padding: '0 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="assets/app-icon.svg" width="28" height="28" style={{borderRadius: 6}} alt="AudioLog"/>
        <span style={{
          fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 600,
          color: 'var(--fg-1)', letterSpacing: '-0.02em',
        }}>Audio<span style={{color: 'var(--accent)'}}>Log</span></span>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(item => (
          <button key={item.id} onClick={() => onChange(item.id)} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '9px 12px', borderRadius: 8, border: 'none',
            background: active === item.id ? 'var(--bg-2)' : 'transparent',
            color: active === item.id ? 'var(--fg-1)' : 'var(--fg-2)',
            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
            cursor: 'pointer', textAlign: 'left',
            transition: 'all 140ms var(--ease-out)',
          }}>
            <Icon name={item.icon} size={16} color={active === item.id ? 'var(--accent)' : 'currentColor'}/>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Collections */}
      <div>
        <div style={{
          padding: '0 12px 8px',
          fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
          fontWeight: 600, color: 'var(--fg-3)',
        }}>Collections</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {collections.map(c => (
            <div key={c.id} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 12px', borderRadius: 8, cursor: 'pointer',
              color: 'var(--fg-2)', fontSize: 13,
              transition: 'background 140ms var(--ease-out)',
            }}>
              <span>{c.label}</span>
              <span style={{fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)'}}>{c.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 'auto', padding: '12px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 999, background: 'var(--accent-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--accent)', fontSize: 14,
        }}>A</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{fontSize: 13, color: 'var(--fg-1)', fontWeight: 500}}>Anna Becker</div>
          <div style={{fontSize: 11, color: 'var(--fg-3)', fontFamily: 'var(--font-mono)'}}>@anna</div>
        </div>
        <Icon name="settings" size={14} color="var(--fg-3)"/>
      </div>
    </aside>
  );
};

// ─── Cover ────────────────────────────────────────────────
const Cover = ({ src, width = 160, radius = 8 }) => (
  <div style={{
    width, aspectRatio: '5/7', borderRadius: radius,
    overflow: 'hidden', boxShadow: 'var(--shadow-cover)',
    flexShrink: 0,
  }}>
    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
  </div>
);

// ─── Series card ──────────────────────────────────────────
const SeriesCard = ({ series, onClick }) => (
  <div onClick={onClick} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10 }}>
    <Cover src={series.cover} width="100%" radius={10}/>
    <div>
      <div style={{
        fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600,
        color: 'var(--fg-1)', lineHeight: 1.2,
      }}>{series.title}</div>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)',
        marginTop: 4,
      }}>{series.listened}/{series.total} {series.rating ? `· ★ ${series.rating}` : ''}</div>
    </div>
  </div>
);

// ─── Episode row (denser, web) ────────────────────────────
const EpisodeRow = ({ episode, onClick }) => {
  const statusColor = {
    listened: 'var(--status-listened)', recent: 'var(--status-recent)', stale: 'var(--fg-3)', unheard: 'var(--fg-4)'
  }[episode.status];
  const statusLabel = {
    listened: 'Listened', recent: episode.lastHeard, stale: episode.lastHeard, unheard: 'Unheard'
  }[episode.status];
  return (
    <div onClick={onClick} style={{
      display: 'grid', gridTemplateColumns: '50px 1fr 100px 140px 110px', gap: 18,
      alignItems: 'center', padding: '14px 18px', cursor: 'pointer',
      borderBottom: '1px solid var(--line-1)',
      transition: 'background 140ms var(--ease-out)',
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <span style={{fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-3)'}}>{episode.num}</span>
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600,
          color: 'var(--fg-1)', lineHeight: 1.25,
        }}>{episode.title}</div>
      </div>
      <div>
        {episode.rating > 0
          ? <Stars value={episode.rating} size={12}/>
          : <span style={{fontSize: 11, color: 'var(--fg-4)', fontStyle: 'italic'}}>—</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: statusColor, flexShrink: 0 }}/>
        <span style={{ fontSize: 12, color: statusColor }}>{statusLabel}</span>
      </div>
      <div style={{fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)', textAlign: 'right'}}>{episode.duration}</div>
    </div>
  );
};

const SectionHeader = ({ eyebrow, title, action }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 18 }}>
    <div>
      {eyebrow && <div style={{
        fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
        fontWeight: 600, color: 'var(--fg-3)', marginBottom: 6,
      }}>{eyebrow}</div>}
      <h2 style={{
        fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 600,
        color: 'var(--fg-1)', margin: 0, letterSpacing: '-0.014em',
        lineHeight: 1.2,
      }}>{title}</h2>
    </div>
    {action && <button onClick={action.onClick} style={{
      background: 'none', border: 'none', color: 'var(--fg-3)',
      fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
      fontFamily: 'var(--font-sans)',
    }}>{action.label} <Icon name="arrowRight" size={13}/></button>}
  </div>
);

// ─── Bottom tab bar (mobile) ──────────────────────────────
const BottomTabBar = ({ active, onChange }) => {
  const items = [
    { id: 'home',     label: 'Home',    icon: 'home' },
    { id: 'library',  label: 'Library', icon: 'library' },
    { id: 'discover', label: 'Discover',icon: 'compass' },
    { id: 'journal',  label: 'Journal', icon: 'journal' },
  ];
  return (
    <nav className="bottom-nav" style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'var(--bg-0)',
      borderTop: '1px solid var(--line-1)',
      display: 'none',
      paddingBottom: 'env(safe-area-inset-bottom)',
      zIndex: 100,
    }}>
      {items.map(item => {
        const isActive = active === item.id;
        return (
          <button key={item.id} onClick={() => onChange(item.id)} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 4, padding: '10px 0 8px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: isActive ? 'var(--accent)' : 'var(--fg-3)',
          }}>
            <Icon name={item.icon} size={22} color={isActive ? 'var(--accent)' : 'var(--fg-3)'}/>
            <span style={{
              fontSize: 10, fontFamily: 'var(--font-sans)', fontWeight: isActive ? 600 : 400,
            }}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

Object.assign(window, { Icon, Stars, Button, Sidebar, Cover, SeriesCard, EpisodeRow, SectionHeader, BottomTabBar });
