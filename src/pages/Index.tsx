import Icon from '@/components/ui/icon';

const person = {
  name: 'Андрей Литвинов',
  initials: 'AL',
  tagline: 'Web-разработчик · Forex-трейдер · Инвестор',
  bio: [
    <>Занимаюсь веб-разработкой более <strong>5 лет</strong> — от архитектуры до деплоя. Специализируюсь на React-приложениях, финансовых дашбордах и платформах с работой в реальном времени.</>,
    <>Параллельно торгую на <strong>Forex</strong> — вручную, без алго-систем. Работаю с Price Action и Smart Money Concepts. Торговля для меня — это дисциплина, статистика и управление рисками.</>,
    <>Формирую долгосрочный инвестиционный портфель. Верю в сложный процент и последовательную стратегию — без спекуляций.</>,
  ],
  stats: [
    { value: '5+', label: 'лет в разработке' },
    { value: '4+', label: 'лет на Forex' },
    { value: '20+', label: 'проектов' },
  ],
  roles: [
    {
      icon: 'Code2',
      title: 'Web-разработчик',
      tags: ['React', 'TypeScript', 'Python', 'PostgreSQL'],
      desc: 'Создаю SPA-приложения, REST API и финансовые инструменты.',
    },
    {
      icon: 'BarChart2',
      title: 'Forex-трейдер',
      tags: ['Ручной трейдинг', 'Price Action', 'SMC'],
      desc: 'Торгую мажорными парами. Строгое управление рисками — до 1–2% на сделку.',
    },
    {
      icon: 'TrendingUp',
      title: 'Инвестор',
      tags: ['Акции', 'ETF', 'Облигации'],
      desc: 'Долгосрочный портфель, ориентированный на рост капитала через диверсификацию.',
    },
  ],
  stack: ['React', 'TypeScript', 'Python', 'PostgreSQL', 'Node.js', 'REST API', 'WebSocket', 'Vite', 'Docker', 'Git'],
  tools: ['VS Code', 'Figma', 'MetaTrader 5', 'TradingView', 'Git', 'Linux'],
  nav: ['ГЛАВНАЯ', 'О МНЕ', 'ПРОЕКТЫ', 'ТОРГОВЛЯ', 'ИНВЕСТИЦИИ', 'КОНТАКТЫ'],
};

export default function Index() {
  return (
    <div style={{ background: 'var(--surface)', color: 'var(--text-primary)', minHeight: '100vh', fontFamily: "'Golos Text', sans-serif" }}>

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid var(--surface-3)', background: 'var(--surface-2)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
            AL<span style={{ color: 'var(--neon)' }}>.</span>
          </span>
          <div className="hidden md:flex items-center gap-8">
            {person.nav.map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  color: item === 'О МНЕ' ? 'var(--neon)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Breadcrumb */}
        <p className="section-label mb-8" style={{ color: 'var(--neon)' }}>
          — 01 / О МНЕ
        </p>

        {/* Hero grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

          {/* Left: name + bio + stats */}
          <div>
            <h1 style={{ fontWeight: 900, fontSize: 'clamp(2.8rem, 7vw, 5rem)', lineHeight: 1.0, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
              Андрей<br />Литвинов
            </h1>
            <div style={{ width: 60, height: 2, background: 'var(--neon)', marginBottom: '2rem' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              {person.bio.map((p, i) => (
                <p key={i} style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.95rem' }}>{p}</p>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid var(--surface-3)', borderLeft: '1px solid var(--surface-3)' }}>
              {person.stats.map((s) => (
                <div key={s.label} style={{ padding: '1.2rem 1rem', borderRight: '1px solid var(--surface-3)', borderBottom: '1px solid var(--surface-3)', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '1.6rem', fontWeight: 700, color: 'var(--neon)', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '0.4rem', letterSpacing: '0.05em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: photo placeholder (red square) + roles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Photo — красный квадрат */}
            <div style={{ width: '100%', aspectRatio: '1 / 1', background: '#cc0000', borderRadius: 12, border: '1px solid var(--surface-3)', maxWidth: 340, margin: '0 auto 0.5rem' }} />

            {/* Role cards */}
            {person.roles.map((role) => (
              <div
                key={role.title}
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--surface-3)',
                  borderRadius: 10,
                  padding: '1rem 1.2rem',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ width: 36, height: 36, minWidth: 36, background: 'rgba(102,179,255,0.10)', border: '1px solid rgba(102,179,255,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={role.icon} size={16} fallback="Code2" style={{ color: 'var(--neon)' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{role.title}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.5rem' }}>
                    {role.tags.map((t) => (
                      <span key={t} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: 'var(--neon)', background: 'var(--neon-dim)', border: '1px solid rgba(102,179,255,0.2)', padding: '0.1rem 0.45rem', borderRadius: 4 }}>{t}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{role.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stack + Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--surface-3)', borderRadius: 10, padding: '1.5rem' }}>
            <p className="section-label mb-4">СТЕК</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {person.stack.map((t) => (
                <span key={t} className="tag-tech">{t}</span>
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--surface-3)', borderRadius: 10, padding: '1.5rem' }}>
            <p className="section-label mb-4">ИНСТРУМЕНТЫ</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {person.tools.map((t) => (
                <span key={t} className="tag-tech">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="divider-line mb-6" />
        <p className="section-label text-center" style={{ color: 'var(--surface-3)' }}>made with poehali.dev</p>

      </div>
    </div>
  );
}
