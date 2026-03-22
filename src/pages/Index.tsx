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
  projects: [
    {
      title: 'Forex Dashboard',
      desc: 'Торговый дашборд с графиками в реальном времени, журналом сделок и аналитикой по парам. Синхронизация с MT5 через WebSocket.',
      tags: ['React', 'WebSocket', 'Python', 'PostgreSQL'],
      year: '2024',
      status: 'В продакшне',
      url: 'forex-dashboard.app',
    },
    {
      title: 'Investment Tracker',
      desc: 'Платформа для отслеживания инвестиционного портфеля: акции, ETF, облигации. Автоматическое обновление котировок и P&L.',
      tags: ['React', 'TypeScript', 'REST API', 'Chart.js'],
      year: '2023',
      status: 'В продакшне',
      url: 'invest-tracker.io',
    },
    {
      title: 'CRM для брокера',
      desc: 'Внутренняя CRM-система для небольшого форекс-брокера: управление клиентами, KYC, отчётность.',
      tags: ['React', 'Python', 'PostgreSQL', 'Docker'],
      year: '2023',
      status: 'Сдан клиенту',
      url: 'broker-crm.internal',
    },
  ],
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

          {/* Right: photo + roles in single card */}
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--surface-3)', borderRadius: 14, overflow: 'hidden' }}>

            {/* Photo placeholder */}
            <div style={{ width: '100%', aspectRatio: '16 / 7', background: 'var(--surface)', borderBottom: '1px solid var(--surface-3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', border: '1.5px dashed rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="User" size={20} fallback="User" style={{ color: 'var(--text-secondary)', opacity: 0.3 }} />
              </div>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: 'var(--text-secondary)', opacity: 0.3, letterSpacing: '0.12em' }}>ФОТО</span>
            </div>

            {/* Role rows */}
            <div>
              {person.roles.map((role, i) => (
                <div
                  key={role.title}
                  style={{
                    padding: '0.85rem 1.2rem',
                    display: 'flex',
                    gap: '0.85rem',
                    alignItems: 'center',
                    borderTop: i > 0 ? '1px solid var(--surface-3)' : undefined,
                  }}
                >
                  <div style={{ width: 32, height: 32, minWidth: 32, background: 'rgba(102,179,255,0.08)', border: '1px solid rgba(102,179,255,0.15)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={role.icon} size={14} fallback="Code2" style={{ color: 'var(--neon)' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{role.title}</span>
                      <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                        {role.tags.map((t) => (
                          <span key={t} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: 'var(--neon)', background: 'var(--neon-dim)', border: '1px solid rgba(102,179,255,0.15)', padding: '0.05rem 0.4rem', borderRadius: 3 }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>{role.desc}</p>
                  </div>
                </div>
              ))}
            </div>
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

        {/* Projects */}
        <p className="section-label mb-8" style={{ color: 'var(--neon)' }}>— 02 / ПРОЕКТЫ</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem' }}>
          {person.projects.map((project, i) => (
            <div
              key={project.title}
              style={{ background: 'var(--surface-2)', border: '1px solid var(--surface-3)', borderRadius: 14, overflow: 'hidden' }}
            >
              {/* Browser mockup screenshot */}
              <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--surface-3)', padding: '0.6rem 0.75rem 0' }}>
                {/* Browser chrome bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                  </div>
                  <div style={{ flex: 1, height: 18, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, display: 'flex', alignItems: 'center', paddingLeft: '0.5rem', gap: '0.3rem' }}>
                    <Icon name="Lock" size={8} fallback="Lock" style={{ color: 'var(--text-secondary)', opacity: 0.3 }} />
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: 'var(--text-secondary)', opacity: 0.3 }}>{project.url ?? 'localhost'}</span>
                  </div>
                </div>
                {/* Screenshot area */}
                <div style={{ width: '100%', aspectRatio: '16 / 6', background: 'rgba(255,255,255,0.02)', borderRadius: '6px 6px 0 0', border: '1px solid rgba(255,255,255,0.04)', borderBottom: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Icon name="Monitor" size={22} fallback="Monitor" style={{ color: 'var(--text-secondary)', opacity: 0.2 }} />
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: 'var(--text-secondary)', opacity: 0.2, letterSpacing: '0.12em' }}>СКРИНШОТ</span>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '1.2rem 1.4rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>{project.title}</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: 'var(--neon)', background: 'var(--neon-dim)', border: '1px solid rgba(102,179,255,0.15)', padding: '0.1rem 0.5rem', borderRadius: 4 }}>{project.status}</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: 'var(--text-secondary)', marginLeft: 'auto' }}>{project.year}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{project.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {project.tags.map((t) => (
                    <span key={t} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: 'var(--text-secondary)', background: 'var(--surface)', border: '1px solid var(--surface-3)', padding: '0.1rem 0.45rem', borderRadius: 3 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="divider-line mb-6" />
        <p className="section-label text-center" style={{ color: 'var(--surface-3)' }}>made with poehali.dev</p>

      </div>
    </div>
  );
}