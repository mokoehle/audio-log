// AudioLog — Screens

// ─── iTunes API ───────────────────────────────────────────
const EPISODE_CACHE_KEY = 'audiolog_episodes_v1';
const EPISODE_CACHE_TTL = 24 * 60 * 60 * 1000; // 24h

function parseEpisode(item) {
  const name = item.trackName || item.collectionName || '';
  // Titel-Format: "Die drei ???, Folge 215: Geisterbucht"
  const match = name.match(/Folge\s+(\d+)\s*[:\s–-]+\s*(.+)/i);
  if (!match) return null;
  return {
    num:         parseInt(match[1], 10),
    title:       match[2].trim(),
    duration:    item.trackTimeMillis ? Math.round(item.trackTimeMillis / 60000) : null,
    appleUrl:    item.trackViewUrl || item.collectionViewUrl || null,
    releaseDate: item.releaseDate   || null,
    artwork:     item.artworkUrl100 ? item.artworkUrl100.replace('100x100bb', '400x400bb') : null,
  };
}

function getCachedEpisodes() {
  try {
    const raw = localStorage.getItem(EPISODE_CACHE_KEY);
    if (!raw) return null;
    const { episodes, fetchedAt } = JSON.parse(raw);
    if (Date.now() - fetchedAt < EPISODE_CACHE_TTL) return episodes;
  } catch {}
  return null;
}

async function fetchEpisodes(force = false) {
  if (!force) {
    const cached = getCachedEpisodes();
    if (cached) return cached;
  }

  const params = new URLSearchParams({
    term:    'Die drei ???',
    country: 'de',
    media:   'audiobook',
    limit:   '200',
  });
  const res = await fetch(`https://itunes.apple.com/search?${params}`);
  if (!res.ok) throw new Error(`iTunes API: ${res.status}`);
  const data = await res.json();

  const episodes = data.results
    .map(parseEpisode)
    .filter(ep => ep !== null && ep.num > 0)
    .sort((a, b) => b.num - a.num);

  localStorage.setItem(EPISODE_CACHE_KEY, JSON.stringify({
    episodes,
    fetchedAt: Date.now(),
  }));
  return episodes;
}

// ─── Tracking via localStorage ────────────────────────────
// { listened: { "215": "2024-03-15" }, ratings: { "215": 4 } }

function useTracking() {
  const [t, setT] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('audiolog_tracking') || '{}'); }
    catch { return {}; }
  });

  const persist = (next) => {
    localStorage.setItem('audiolog_tracking', JSON.stringify(next));
    setT(next);
  };

  const toggleListened = (num) => {
    const listened = { ...(t.listened || {}) };
    if (listened[num]) { delete listened[num]; }
    else { listened[num] = new Date().toISOString().slice(0, 10); }
    persist({ ...t, listened });
  };

  const setRating = (num, rating) => {
    const ratings = { ...(t.ratings || {}), [num]: rating };
    persist({ ...t, ratings });
  };

  const isListened   = (num) => !!(t.listened  || {})[num];
  const getRating    = (num) => (t.ratings   || {})[num] || 0;
  const listenedDate = (num) => (t.listened  || {})[num] || null;
  const listenedCount = Object.keys(t.listened || {}).length;

  return { toggleListened, setRating, isListened, getRating, listenedDate, listenedCount };
}

// ─── Hilfsfunktionen ─────────────────────────────────────
function formatDate(iso) {
  if (!iso) return null;
  const diffDays = Math.floor((Date.now() - new Date(iso)) / 86400000);
  if (diffDays === 0)  return 'heute';
  if (diffDays === 1)  return 'gestern';
  if (diffDays < 7)   return `vor ${diffDays} Tagen`;
  if (diffDays < 30)  return `vor ${Math.floor(diffDays / 7)} Wochen`;
  if (diffDays < 365) return `vor ${Math.floor(diffDays / 30)} Monaten`;
  return `vor ${Math.floor(diffDays / 365)} Jahren`;
}

// ─── Home ─────────────────────────────────────────────────
function HomeScreen({ episodes, onRefresh, refreshing }) {
  const tr = useTracking();

  const rated = episodes.filter(ep => tr.getRating(ep.num) > 0);
  const avgRating = rated.length
    ? (rated.reduce((s, ep) => s + tr.getRating(ep.num), 0) / rated.length).toFixed(1)
    : null;

  const nextUnheard = episodes.find(ep => !tr.isListened(ep.num));
  const recentlyListened = episodes
    .filter(ep => tr.isListened(ep.num))
    .sort((a, b) => (tr.listenedDate(b.num) || '') > (tr.listenedDate(a.num) || '') ? 1 : -1);

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>

      {/* Series header */}
      <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', marginBottom: 28 }}>
        <div style={{
          width: 88, aspectRatio: '5/7', borderRadius: 10,
          overflow: 'hidden', boxShadow: 'var(--shadow-cover)', flexShrink: 0,
        }}>
          <img src="assets/covers/die-drei.svg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt=""/>
        </div>
        <div style={{ flex: 1, paddingTop: 4 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--fg-3)', marginBottom: 6 }}>
            Hörspielreihe
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 600, color: 'var(--fg-1)', margin: '0 0 14px', lineHeight: 1.15, letterSpacing: '-0.014em' }}>
            Die drei ???
          </h1>
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { value: tr.listenedCount,                   label: 'gehört' },
              { value: episodes.length,                    label: 'verfügbar' },
              { value: avgRating ? `★ ${avgRating}` : '—', label: 'Ø Wertung' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 600, color: 'var(--fg-1)', lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ height: 5, background: 'var(--bg-3)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 999, background: 'var(--accent)',
            width: `${Math.min(100, (tr.listenedCount / Math.max(episodes.length, 1)) * 100)}%`,
            transition: 'width 400ms var(--ease-out)',
          }}/>
        </div>
        <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>
            {tr.listenedCount} von {episodes.length} Folgen
          </span>
          <button onClick={onRefresh} disabled={refreshing} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 11, color: refreshing ? 'var(--fg-4)' : 'var(--fg-3)',
            fontFamily: 'var(--font-sans)', padding: 0,
          }}>
            {refreshing ? 'Lade…' : '↻ Aktualisieren'}
          </button>
        </div>
      </div>

      {/* Continue listening CTA */}
      {nextUnheard && nextUnheard.appleUrl && (
        <a href={nextUnheard.appleUrl} target="_blank" rel="noopener noreferrer" style={{
          display: 'flex', alignItems: 'center', gap: 14,
          background: 'var(--accent)', borderRadius: 12,
          padding: '14px 18px', marginBottom: 32,
          textDecoration: 'none', color: 'var(--accent-fg)',
          boxShadow: 'var(--shadow-md)',
        }}>
          <Icon name="headphones" size={22} color="var(--accent-fg)"/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 2 }}>
              Weiter hören · Folge {nextUnheard.num}
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 600, lineHeight: 1.2 }}>
              {nextUnheard.title}
            </div>
          </div>
          <Icon name="arrowRight" size={18} color="var(--accent-fg)"/>
        </a>
      )}

      {/* Recently listened */}
      {recentlyListened.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--fg-3)', marginBottom: 12 }}>
            Zuletzt gehört
          </div>
          <div style={{ background: 'var(--bg-1)', border: '1px solid var(--line-1)', borderRadius: 12, overflow: 'hidden' }}>
            {recentlyListened.slice(0, 3).map((ep, i) => (
              <div key={ep.num} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                borderTop: i > 0 ? '1px solid var(--line-1)' : 'none',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', width: 28, textAlign: 'right', flexShrink: 0 }}>
                  {ep.num}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, color: 'var(--fg-1)', lineHeight: 1.25 }}>
                    {ep.title}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>
                    {formatDate(tr.listenedDate(ep.num))}
                  </div>
                </div>
                {tr.getRating(ep.num) > 0 && <Stars value={tr.getRating(ep.num)} size={11}/>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Up next */}
      {episodes.filter(ep => !tr.isListened(ep.num)).length > 1 && (
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--fg-3)', marginBottom: 12 }}>
            Als nächstes
          </div>
          <div style={{ background: 'var(--bg-1)', border: '1px solid var(--line-1)', borderRadius: 12, overflow: 'hidden' }}>
            {episodes.filter(ep => !tr.isListened(ep.num)).slice(0, 3).map((ep, i) => (
              <a key={ep.num} href={ep.appleUrl || '#'} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                borderTop: i > 0 ? '1px solid var(--line-1)' : 'none',
                textDecoration: 'none', color: 'inherit',
                opacity: ep.appleUrl ? 1 : 0.5,
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', width: 28, textAlign: 'right', flexShrink: 0 }}>
                  {ep.num}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, color: 'var(--fg-1)', lineHeight: 1.25 }}>
                    {ep.title}
                  </div>
                  {ep.duration && (
                    <div style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>{ep.duration} min</div>
                  )}
                </div>
                <Icon name="arrowRight" size={14} color="var(--fg-3)"/>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Library ──────────────────────────────────────────────
function LibraryScreen({ episodes }) {
  const tr = useTracking();
  const [filter, setFilter] = React.useState('alle');
  const filters = [
    { id: 'alle',      label: 'Alle' },
    { id: 'gehoert',   label: 'Gehört' },
    { id: 'ungehoert', label: 'Ungehört' },
  ];

  const visible = episodes.filter(ep => {
    if (filter === 'gehoert')   return tr.isListened(ep.num);
    if (filter === 'ungehoert') return !tr.isListened(ep.num);
    return true;
  });

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 600, color: 'var(--fg-1)', margin: '0 0 20px', letterSpacing: '-0.014em' }}>
        Alle Folgen
      </h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: '6px 14px', borderRadius: 999, fontSize: 13,
            background: filter === f.id ? 'var(--fg-1)' : 'var(--bg-2)',
            border: filter === f.id ? '1px solid var(--fg-1)' : '1px solid var(--line-1)',
            color: filter === f.id ? 'var(--bg-0)' : 'var(--fg-2)',
            fontFamily: 'var(--font-sans)', cursor: 'pointer',
            transition: 'all 140ms var(--ease-out)',
          }}>{f.label}</button>
        ))}
      </div>
      <div style={{ background: 'var(--bg-1)', border: '1px solid var(--line-1)', borderRadius: 12, overflow: 'hidden' }}>
        {visible.map((ep, i) => (
          <EpisodeItem key={ep.num} ep={ep} tr={tr} borderTop={i > 0}/>
        ))}
        {visible.length === 0 && (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--fg-3)', fontSize: 14 }}>
            Keine Folgen in dieser Kategorie.
          </div>
        )}
      </div>
    </div>
  );
}

function EpisodeItem({ ep, tr, borderTop }) {
  const listened = tr.isListened(ep.num);
  const rating   = tr.getRating(ep.num);

  return (
    <div style={{ padding: '14px 14px 10px', borderTop: borderTop ? '1px solid var(--line-1)' : 'none' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <button onClick={() => tr.toggleListened(ep.num)} style={{
          width: 22, height: 22, borderRadius: 999, flexShrink: 0, marginTop: 2,
          border: listened ? 'none' : '2px solid var(--line-2)',
          background: listened ? 'var(--status-listened)' : 'transparent',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 140ms var(--ease-out)',
        }}>
          {listened && (
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="2,6 5,9 10,3"/>
            </svg>
          )}
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>{ep.num}</span>
            <span style={{
              fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600, lineHeight: 1.25,
              color: listened ? 'var(--fg-3)' : 'var(--fg-1)',
            }}>{ep.title}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 5 }}>
            {ep.duration && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-4)' }}>{ep.duration} min</span>
            )}
            {listened && tr.listenedDate(ep.num) && (
              <span style={{ fontSize: 11, color: 'var(--status-listened)' }}>
                {formatDate(tr.listenedDate(ep.num))}
              </span>
            )}
          </div>
          {listened && (
            <div style={{ display: 'flex', gap: 2, marginTop: 8 }}>
              {[1,2,3,4,5].map(star => (
                <button key={star} onClick={() => tr.setRating(ep.num, star === rating ? 0 : star)} style={{
                  background: 'none', border: 'none', padding: '0 1px', cursor: 'pointer',
                  fontSize: 17, lineHeight: 1,
                  color: star <= rating ? 'var(--rating)' : 'var(--fg-4)',
                  transition: 'color 100ms',
                }}>★</button>
              ))}
            </div>
          )}
        </div>
        {ep.appleUrl && (
          <a href={ep.appleUrl} target="_blank" rel="noopener noreferrer" style={{
            color: 'var(--fg-4)', flexShrink: 0, padding: 4, marginTop: -2,
          }}>
            <Icon name="headphones" size={16}/>
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Discover ─────────────────────────────────────────────
function DiscoverScreen({ episodes }) {
  const tr = useTracking();
  const unheard = episodes.filter(ep => !tr.isListened(ep.num));
  const newest = episodes.slice(0, 3);

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 600, color: 'var(--fg-1)', margin: '0 0 20px' }}>
        Entdecken
      </h1>
      {newest.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--fg-3)', marginBottom: 12 }}>
            Neueste Folgen
          </div>
          <div style={{ background: 'var(--bg-1)', border: '1px solid var(--line-1)', borderRadius: 12, overflow: 'hidden' }}>
            {newest.map((ep, i) => (
              <EpisodeItem key={ep.num} ep={ep} tr={tr} borderTop={i > 0}/>
            ))}
          </div>
        </div>
      )}
      <div style={{ color: 'var(--fg-3)', fontSize: 14 }}>
        {unheard.length} ungehörte Folgen verfügbar.
      </div>
    </div>
  );
}

// ─── Journal ──────────────────────────────────────────────
function JournalScreen({ episodes }) {
  const tr = useTracking();
  const rated = episodes
    .filter(ep => tr.getRating(ep.num) > 0)
    .sort((a, b) => tr.getRating(b.num) - tr.getRating(a.num));

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 600, color: 'var(--fg-1)', margin: '0 0 6px' }}>
        Journal
      </h1>
      <p style={{ color: 'var(--fg-3)', fontSize: 14, marginBottom: 28 }}>
        Deine Bewertungen, beste Folgen zuerst.
      </p>
      {rated.length === 0 ? (
        <div style={{ color: 'var(--fg-4)', fontSize: 14, padding: '40px 0', textAlign: 'center', lineHeight: 1.6 }}>
          Noch keine bewerteten Folgen.<br/>
          Markiere Folgen als gehört und vergib Sterne.
        </div>
      ) : rated.map((ep, i) => (
        <div key={ep.num} style={{ padding: '20px 0', borderTop: i > 0 ? '1px solid var(--line-1)' : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <Stars value={tr.getRating(ep.num)} size={14}/>
            {tr.listenedDate(ep.num) && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>
                · {formatDate(tr.listenedDate(ep.num))}
              </span>
            )}
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 4 }}>
            {ep.title}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>
            Folge {ep.num}{ep.duration ? ` · ${ep.duration} min` : ''}
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { getCachedEpisodes, fetchEpisodes, HomeScreen, LibraryScreen, DiscoverScreen, JournalScreen });
