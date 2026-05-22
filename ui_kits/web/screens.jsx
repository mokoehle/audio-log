// AudioLog — Web Screens

const SAMPLE_SERIES = [
  { id: 'die-drei', title: 'Die drei ???', cover: '../../assets/covers/die-drei.svg', listened: 38, total: 215, rating: 4.2 },
  { id: 'bibi-blocksberg', title: 'Bibi Blocksberg', cover: '../../assets/covers/bibi-blocksberg.svg', listened: 12, total: 142, rating: 3.8 },
  { id: 'benjamin-bluemchen', title: 'Benjamin Blümchen', cover: '../../assets/covers/benjamin-bluemchen.svg', listened: 4, total: 168 },
  { id: 'fuenf-freunde', title: 'Fünf Freunde', cover: '../../assets/covers/fuenf-freunde.svg', listened: 21, total: 138, rating: 4.0 },
  { id: 'tkkg', title: 'TKKG', cover: '../../assets/covers/tkkg.svg', listened: 8, total: 232, rating: 3.6 },
  { id: 'sandman', title: 'The Sandman', cover: '../../assets/covers/sandman.svg', listened: 3, total: 11, rating: 4.6 },
  { id: 'harry-potter', title: 'Harry Potter', cover: '../../assets/covers/harry-potter.svg', listened: 5, total: 7, rating: 4.8 },
  { id: 'jerry-cotton', title: 'Jerry Cotton', cover: '../../assets/covers/jerry-cotton.svg', listened: 2, total: 156 },
];

const DIE_DREI_EPISODES = [
  { num: 215, title: 'Geisterbucht', duration: '62 min', status: 'recent', lastHeard: '2 weeks ago', rating: 4 },
  { num: 214, title: 'Schwarze Sonne', duration: '58 min', status: 'listened', lastHeard: '1 month ago', rating: 0 },
  { num: 213, title: 'Kontrollverlust', duration: '71 min', status: 'stale', lastHeard: '4 months ago', rating: 0 },
  { num: 212, title: 'Die Spur des Spielers', duration: '64 min', status: 'stale', lastHeard: '6 months ago', rating: 3 },
  { num: 211, title: 'Bermuda-Verschwörung', duration: '69 min', status: 'unheard', rating: 0 },
  { num: 210, title: 'Der Geheimcode', duration: '63 min', status: 'unheard', rating: 0 },
  { num: 209, title: 'Im Tal der Saurier', duration: '68 min', status: 'unheard', rating: 0 },
  { num: 208, title: 'Botschaft aus der Unterwelt', duration: '65 min', status: 'unheard', rating: 0 },
];

const PageHeader = ({ eyebrow, title, lede }) => (
  <header style={{ marginBottom: 36 }}>
    {eyebrow && <div style={{
      fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
      fontWeight: 600, color: 'var(--fg-3)', marginBottom: 10,
    }}>{eyebrow}</div>}
    <h1 style={{
      fontFamily: 'var(--font-serif)', fontSize: 44, fontWeight: 600,
      color: 'var(--fg-1)', margin: '0 0 14px', letterSpacing: '-0.022em',
      lineHeight: 1.15, fontVariationSettings: '"opsz" 144',
    }}>{title}</h1>
    {lede && <p style={{
      fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--fg-2)',
      margin: 0, lineHeight: 1.55, maxWidth: '60ch',
    }}>{lede}</p>}
  </header>
);

// ─── Home ─────────────────────────────────────────────────
function HomeScreen({ onSeriesClick }) {
  return (
    <div>
      <PageHeader
        eyebrow="Welcome back, Anna"
        title="Pick up where you left off."
        lede="It's been two weeks since you finished Folge 215. Three of your series have unheard episodes waiting."
      />

      {/* Continue listening */}
      <SectionHeader eyebrow="Continue" title="Currently listening" action={{label: 'See all'}}/>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16,
        marginBottom: 48,
      }}>
        {SAMPLE_SERIES.slice(0, 3).map(s => (
          <div key={s.id} onClick={() => onSeriesClick(s)} style={{
            background: 'var(--bg-1)', border: '1px solid var(--line-1)', borderRadius: 14,
            padding: 18, display: 'flex', gap: 14, cursor: 'pointer',
            transition: 'box-shadow 140ms var(--ease-out)',
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <Cover src={s.cover} width={80} radius={8}/>
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{fontSize: 11, color: 'var(--fg-3)', marginBottom: 4, fontFamily: 'var(--font-mono)'}}>Folge {DIE_DREI_EPISODES[0].num}</div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 600,
                  color: 'var(--fg-1)', margin: '0 0 4px', lineHeight: 1.2,
                }}>{s.title}</h3>
                <div style={{fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)'}}>{s.listened}/{s.total} listened</div>
              </div>
              <div style={{
                height: 4, background: 'var(--bg-3)', borderRadius: 999, overflow: 'hidden', marginTop: 12,
              }}>
                <div style={{
                  height: '100%', width: `${(s.listened/s.total)*100}%`,
                  background: 'var(--accent)', borderRadius: 999,
                }}/>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stale */}
      <SectionHeader eyebrow="It's been a while" title="Worth a re-listen"/>
      <div style={{
        background: 'var(--bg-1)', border: '1px solid var(--line-1)', borderRadius: 14,
        marginBottom: 48, overflow: 'hidden',
      }}>
        {[
          { num: 213, title: 'Kontrollverlust', series: 'Die drei ???', when: '4 months ago' },
          { num: 89,  title: 'Verhexte Klassenfahrt', series: 'Bibi Blocksberg', when: '6 months ago' },
          { num: 124, title: 'Auf dem Leuchtturm', series: 'Fünf Freunde', when: '8 months ago' },
        ].map((e, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '60px 1fr 1fr auto', gap: 18,
            padding: '14px 20px', alignItems: 'center',
            borderTop: i > 0 ? '1px solid var(--line-1)' : 'none',
          }}>
            <span style={{fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-3)'}}>{e.num}</span>
            <div style={{
              fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600, color: 'var(--fg-1)',
            }}>{e.title}</div>
            <div style={{fontSize: 13, color: 'var(--fg-2)'}}>{e.series}</div>
            <div style={{fontSize: 13, color: 'var(--fg-3)', fontStyle: 'italic'}}>It's been {e.when}.</div>
          </div>
        ))}
      </div>

      {/* Library snapshot */}
      <SectionHeader eyebrow="Your library" title="Series you're tracking" action={{label: 'See all'}}/>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 18,
      }}>
        {SAMPLE_SERIES.slice(0, 6).map(s => (
          <SeriesCard key={s.id} series={s} onClick={() => onSeriesClick(s)}/>
        ))}
      </div>
    </div>
  );
}

// ─── Library ──────────────────────────────────────────────
function LibraryScreen({ onSeriesClick }) {
  const [filter, setFilter] = React.useState('All');
  const filters = ['All', 'Currently listening', 'Stale', 'Completed', 'Unheard'];
  return (
    <div>
      <PageHeader
        eyebrow="Library"
        title="86 episodes across 6 series"
        lede="Your full listening history. Filter by status, sort by recency, or jump to any series."
      />
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '7px 14px', borderRadius: 999, fontSize: 13,
            background: filter === f ? 'var(--fg-1)' : 'var(--bg-2)',
            border: filter === f ? '1px solid var(--fg-1)' : '1px solid var(--line-1)',
            color: filter === f ? 'var(--bg-0)' : 'var(--fg-2)',
            fontFamily: 'var(--font-sans)', cursor: 'pointer',
            transition: 'all 140ms var(--ease-out)',
          }}>{f}</button>
        ))}
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 24,
      }}>
        {SAMPLE_SERIES.map(s => <SeriesCard key={s.id} series={s} onClick={() => onSeriesClick(s)}/>)}
      </div>
    </div>
  );
}

// ─── Series detail ────────────────────────────────────────
function SeriesScreen({ series, onBack }) {
  return (
    <div>
      <button onClick={onBack} style={{
        background: 'none', border: 'none', color: 'var(--fg-3)',
        fontSize: 13, padding: 0, cursor: 'pointer', marginBottom: 24,
        display: 'flex', alignItems: 'center', gap: 6,
        fontFamily: 'var(--font-sans)',
      }}>← Back to library</button>

      <div style={{ display: 'flex', gap: 32, marginBottom: 40, alignItems: 'flex-start' }}>
        <Cover src={series.cover} width={220} radius={12}/>
        <div style={{ flex: 1, paddingTop: 12 }}>
          <div style={{
            fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
            fontWeight: 600, color: 'var(--accent)', marginBottom: 10,
          }}>Hörspielreihe · {series.total} Folgen</div>
          <h1 style={{
            fontFamily: 'var(--font-serif)', fontSize: 52, fontWeight: 600,
            color: 'var(--fg-1)', margin: '0 0 14px', letterSpacing: '-0.022em',
            lineHeight: 1.12, fontVariationSettings: '"opsz" 144',
          }}>{series.title}</h1>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--fg-2)',
            margin: '0 0 24px', lineHeight: 1.55, maxWidth: '54ch',
          }}>The classic German detective series. Three friends, countless mysteries, four decades of Folgen. You've heard {series.listened}.</p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            <Button variant="primary" icon="headphones">Continue listening</Button>
            <Button variant="secondary" icon="bookmark">In library</Button>
            <Button variant="ghost">Share</Button>
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            {[
              { label: 'Listened', value: series.listened, color: 'var(--status-listened)' },
              { label: 'Stale', value: 8, color: 'var(--fg-3)' },
              { label: 'Unheard', value: series.total - series.listened - 8, color: 'var(--fg-4)' },
              { label: 'Avg ★', value: series.rating || '—', color: 'var(--rating)' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 600,
                  color: stat.color, lineHeight: 1, fontVariationSettings: '"opsz" 36',
                }}>{stat.value}</div>
                <div style={{
                  fontSize: 11, color: 'var(--fg-3)', marginTop: 6, letterSpacing: '0.04em',
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionHeader eyebrow="Episodes" title="All Folgen" action={{label: 'Sort by recent'}}/>
      <div style={{
        background: 'var(--bg-1)', border: '1px solid var(--line-1)', borderRadius: 14,
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '50px 1fr 100px 140px 110px', gap: 18,
          padding: '12px 18px', alignItems: 'center',
          fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
          fontWeight: 600, color: 'var(--fg-3)', borderBottom: '1px solid var(--line-1)',
        }}>
          <span>#</span><span>Folge</span><span>Rating</span><span>Status</span><span style={{textAlign: 'right'}}>Length</span>
        </div>
        {DIE_DREI_EPISODES.map(ep => <EpisodeRow key={ep.num} episode={ep}/>)}
      </div>
    </div>
  );
}

// ─── Discover ─────────────────────────────────────────────
function DiscoverScreen({ onSeriesClick }) {
  return (
    <div>
      <PageHeader eyebrow="Discover" title="What others are hearing this week"/>
      <div style={{
        background: 'var(--bg-1)', border: '1px solid var(--line-1)', borderRadius: 14,
        padding: 28, display: 'flex', gap: 28, marginBottom: 48,
      }}>
        <Cover src={SAMPLE_SERIES[5].cover} width={180}/>
        <div style={{ flex: 1, paddingTop: 8 }}>
          <div style={{
            fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
            fontWeight: 600, color: 'var(--accent)', marginBottom: 10,
          }}>Featured this week</div>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 600,
            color: 'var(--fg-1)', margin: '0 0 12px', letterSpacing: '-0.014em',
          }}>The Sandman</h2>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--fg-2)',
            margin: '0 0 18px', lineHeight: 1.55, maxWidth: '52ch',
          }}>An Audible Original starring James McAvoy as the Lord of Dreams. Adapted from the Neil Gaiman comic series.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <Stars value={5} size={16}/>
            <span style={{fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-2)'}}>4.6 · 12,432 ratings</span>
          </div>
          <Button variant="primary" onClick={() => onSeriesClick(SAMPLE_SERIES[5])}>Open series</Button>
        </div>
      </div>

      <SectionHeader eyebrow="Trending" title="In Hörspiele"/>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 20,
        marginBottom: 48,
      }}>
        {SAMPLE_SERIES.slice(0, 6).map(s => <SeriesCard key={s.id} series={s} onClick={() => onSeriesClick(s)}/>)}
      </div>

      <SectionHeader eyebrow="Activity" title="From your friends"/>
      <div style={{
        background: 'var(--bg-1)', border: '1px solid var(--line-1)', borderRadius: 14,
        overflow: 'hidden',
      }}>
        {[
          { user: 'Mira', series: 'Die drei ???', episode: 'Geisterbucht', rating: 4, when: '2 hours ago',
            note: "Surprisingly tense for a late Folge." },
          { user: 'Jonas', series: 'TKKG', episode: 'Der Bankraub', rating: 3, when: 'yesterday', note: '' },
          { user: 'Lena', series: 'Bibi Blocksberg', episode: 'Verhexte Klassenfahrt', rating: 5, when: '3 days ago',
            note: "Pure nostalgia. Heard this twenty times as a kid." },
        ].map((r, i) => (
          <div key={i} style={{
            padding: '20px 24px', display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: 16,
            borderTop: i > 0 ? '1px solid var(--line-1)' : 'none',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 999, background: 'var(--accent-soft)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--accent)', fontSize: 15,
            }}>{r.user[0]}</div>
            <div>
              <div style={{ fontSize: 14, color: 'var(--fg-1)', marginBottom: 4 }}>
                <strong style={{fontWeight: 600}}>{r.user}</strong> rated <em style={{fontFamily: 'var(--font-serif)', fontSize: 16}}>{r.episode}</em> from {r.series}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: r.note ? 8 : 0 }}>
                <Stars value={r.rating} size={12}/>
              </div>
              {r.note && <p style={{
                fontFamily: 'var(--font-serif)', fontSize: 14, fontStyle: 'italic',
                color: 'var(--fg-2)', margin: 0, lineHeight: 1.5,
              }}>"{r.note}"</p>}
            </div>
            <div style={{fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)'}}>{r.when}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Journal ──────────────────────────────────────────────
function JournalScreen() {
  const entries = [
    { ep: 'Geisterbucht', series: 'Die drei ???', when: '2 weeks ago', rating: 4,
      note: 'A surprisingly tense Folge — the pacing felt closer to the early ones. Justus is sharp here.' },
    { ep: 'Verhexte Klassenfahrt', series: 'Bibi Blocksberg', when: 'last month', rating: 5,
      note: "Pure comfort listening. Reminded me of the cassette in my mom's car." },
    { ep: 'Schwarze Sonne', series: 'Die drei ???', when: 'last month', rating: 0,
      note: 'Plot was thin. Skip on a re-listen.' },
    { ep: 'Die Spur des Spielers', series: 'Die drei ???', when: '6 months ago', rating: 3,
      note: "Decent middle Folge. The casino scenes worked, the ending didn't land." },
  ];
  return (
    <div>
      <PageHeader
        eyebrow="Journal"
        title="What you've heard."
        lede="Every note you've made, every rating, in one quiet place."
      />
      <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 0 }}>
        {entries.map((e, i) => (
          <div key={i} style={{
            padding: '28px 0',
            borderTop: i > 0 ? '1px solid var(--line-1)' : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              {e.rating > 0
                ? <Stars value={e.rating} size={14}/>
                : <span style={{fontSize: 12, color: 'var(--fg-3)', fontStyle: 'italic'}}>No rating</span>}
              <span style={{fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)'}}>· {e.when}</span>
            </div>
            <h3 style={{
              fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 600,
              color: 'var(--fg-1)', margin: '0 0 6px',
            }}>{e.ep}</h3>
            <div style={{fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)', marginBottom: 14}}>{e.series}</div>
            <p style={{
              fontFamily: 'var(--font-serif)', fontSize: 18, fontStyle: 'italic',
              color: 'var(--fg-2)', margin: 0, lineHeight: 1.55, maxWidth: '60ch',
            }}>"{e.note}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, LibraryScreen, SeriesScreen, DiscoverScreen, JournalScreen, SAMPLE_SERIES });
