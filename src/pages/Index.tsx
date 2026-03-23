import Icon from '@/components/ui/icon';
import TradingJournal from '@/components/TradingJournal';

const project = {
  logo: null,
  photo: null,
  name: 'Название проекта',
  tagline: 'Короткая цепляющая фраза о проекте',
  status: 'В разработке',
  year: '2024',
  description:
    'Подробное описание проекта. Что это такое, какую проблему решает и почему это важно. Здесь можно написать несколько предложений о концепции и идее, стоящей за продуктом.',
  goal:
    'Основная цель проекта — автоматизировать рутинные процессы и сократить время на выполнение задач в несколько раз. Сделать продукт доступным и удобным для пользователей без технических знаний.',
  audience:
    'Малый и средний бизнес, менеджеры и предприниматели, которые хотят автоматизировать рутину без найма разработчиков.',
  technologies: ['React', 'TypeScript', 'Python', 'PostgreSQL', 'Docker', 'AWS S3', 'Vite', 'Tailwind CSS'],
  links: [
    { label: 'Telegram', icon: 'Send', href: 'https://t.me/username' },
    { label: 'GitHub', icon: 'Github', href: 'https://github.com/username/project' },
    { label: 'Сайт проекта', icon: 'Globe', href: 'https://example.com' },
    { label: 'YouTube', icon: 'Youtube', href: 'https://youtube.com' },
  ],
};

export default function Index() {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--surface)', color: 'var(--text-primary)', fontFamily: "'Golos Text', sans-serif" }}
    >
      {/* Header strip */}
      <div style={{ borderBottom: '1px solid var(--surface-3)', background: 'var(--surface-2)' }}>
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="section-label" style={{ color: 'var(--neon)' }}>
            // portfolio.project
          </span>
          <span
            className="font-mono-custom text-xs px-2 py-1 rounded"
            style={{
              background: 'rgba(102,179,255,0.12)',
              border: '1px solid rgba(102,179,255,0.25)',
              color: 'var(--neon)',
            }}
          >
            {project.status}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Hero */}
        <div className="flex gap-6 items-start mb-12">
          {/* Logo 1:1 */}
          <div
            style={{
              width: 80,
              height: 80,
              minWidth: 80,
              background: '#cc0000',
              borderRadius: 12,
              border: '1px solid var(--surface-3)',
            }}
          />
          <div>
            <h1
              style={{
                fontFamily: "'Golos Text', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                lineHeight: 1.1,
                color: 'var(--text-primary)',
                marginBottom: '0.4rem',
              }}
            >
              {project.name}
            </h1>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.9rem', color: 'var(--neon)' }}>
              {project.tagline}
            </p>
            <div className="mt-3">
              <span className="section-label">{project.year}</span>
            </div>
          </div>
        </div>

        {/* Screenshot — vertical phone mockup with Telegram chat */}
        <div className="mb-12 flex justify-center">
          <div style={{ width: 280, flexShrink: 0 }}>
            <p className="section-label mb-3">// скриншоты</p>
            {/* Phone shell */}
            <div style={{ background: '#1c1c1e', border: '2px solid #3a3a3c', borderRadius: 36, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.6)' }}>

              {/* Status bar */}
              <div style={{ background: '#1c1c1e', padding: '10px 20px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'system-ui', fontSize: '0.65rem', fontWeight: 600, color: '#fff' }}>9:41</span>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <Icon name="Signal" size={10} fallback="Signal" style={{ color: '#fff' }} />
                  <Icon name="Wifi" size={10} fallback="Wifi" style={{ color: '#fff' }} />
                  <Icon name="Battery" size={12} fallback="Battery" style={{ color: '#fff' }} />
                </div>
              </div>

              {/* TG header */}
              <div style={{ background: '#1c1c1e', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '6px 14px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <Icon name="ChevronLeft" size={18} fallback="ChevronLeft" style={{ color: '#2aabee' }} />
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #2aabee, #1a7bbf)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>АЛ</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>Андрей Литвинов</div>
                  <div style={{ fontSize: '0.62rem', color: '#2aabee' }}>онлайн</div>
                </div>
                <Icon name="Phone" size={16} fallback="Phone" style={{ color: '#2aabee' }} />
              </div>

              {/* Chat messages */}
              <div style={{ background: '#0d1117', padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 6, minHeight: 380 }}>

                {/* Date divider */}
                <div style={{ textAlign: 'center', margin: '4px 0 8px' }}>
                  <span style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: '2px 10px', fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)' }}>сегодня</span>
                </div>

                {/* Incoming */}
                <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', maxWidth: '80%' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #2aabee, #1a7bbf)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginBottom: 2 }}>
                    <span style={{ fontSize: '0.5rem', fontWeight: 700, color: '#fff' }}>АЛ</span>
                  </div>
                  <div style={{ background: '#212d3b', borderRadius: '12px 12px 12px 2px', padding: '7px 10px 5px' }}>
                    <p style={{ fontSize: '0.72rem', color: '#e8e8e8', lineHeight: 1.4, margin: 0 }}>Привет! Готов обсудить проект 👋</p>
                    <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.35)', float: 'right', marginLeft: 8 }}>10:24</span>
                  </div>
                </div>

                {/* Outgoing */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ background: '#2b5278', borderRadius: '12px 12px 2px 12px', padding: '7px 10px 5px', maxWidth: '75%' }}>
                    <p style={{ fontSize: '0.72rem', color: '#e8e8e8', lineHeight: 1.4, margin: 0 }}>Да, расскажи подробнее о задаче</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 3, marginTop: 2 }}>
                      <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.35)' }}>10:25</span>
                      <Icon name="CheckCheck" size={11} fallback="Check" style={{ color: '#2aabee' }} />
                    </div>
                  </div>
                </div>

                {/* Incoming */}
                <div style={{ maxWidth: '80%', marginLeft: 28 }}>
                  <div style={{ background: '#212d3b', borderRadius: '12px 12px 12px 2px', padding: '7px 10px 5px' }}>
                    <p style={{ fontSize: '0.72rem', color: '#e8e8e8', lineHeight: 1.4, margin: 0 }}>Нужен дашборд для трейдинга. Графики, журнал сделок, статистика в реальном времени</p>
                    <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.35)', float: 'right', marginLeft: 8 }}>10:26</span>
                  </div>
                </div>

                {/* Outgoing */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ background: '#2b5278', borderRadius: '12px 12px 2px 12px', padding: '7px 10px 5px', maxWidth: '75%' }}>
                    <p style={{ fontSize: '0.72rem', color: '#e8e8e8', lineHeight: 1.4, margin: 0 }}>Понял. Сделаю на React + WebSocket. Сроки?</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 3, marginTop: 2 }}>
                      <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.35)' }}>10:28</span>
                      <Icon name="CheckCheck" size={11} fallback="Check" style={{ color: '#2aabee' }} />
                    </div>
                  </div>
                </div>

                {/* Incoming */}
                <div style={{ maxWidth: '80%', marginLeft: 28 }}>
                  <div style={{ background: '#212d3b', borderRadius: '12px 12px 12px 2px', padding: '7px 10px 5px' }}>
                    <p style={{ fontSize: '0.72rem', color: '#e8e8e8', lineHeight: 1.4, margin: 0 }}>Желательно 2 недели 🙏</p>
                    <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.35)', float: 'right', marginLeft: 8 }}>10:29</span>
                  </div>
                </div>

                {/* Outgoing */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ background: '#2b5278', borderRadius: '12px 12px 2px 12px', padding: '7px 10px 5px', maxWidth: '75%' }}>
                    <p style={{ fontSize: '0.72rem', color: '#e8e8e8', lineHeight: 1.4, margin: 0 }}>Берусь. Скину макет завтра ✅</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 3, marginTop: 2 }}>
                      <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.35)' }}>10:31</span>
                      <Icon name="CheckCheck" size={11} fallback="Check" style={{ color: '#2aabee' }} />
                    </div>
                  </div>
                </div>

              </div>

              {/* Input bar */}
              <div style={{ background: '#1c1c1e', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, background: '#2c2c2e', borderRadius: 20, padding: '7px 14px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)' }}>Сообщение</div>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#2aabee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="Mic" size={14} fallback="Mic" style={{ color: '#fff' }} />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Info sections */}
        <div className="flex flex-col gap-8 mb-12">

          <section>
            <p className="section-label mb-2">// описание</p>
            <div className="divider-line mb-4" />
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              {project.description}
            </p>
          </section>

          <section>
            <p className="section-label mb-2">// цель проекта</p>
            <div className="divider-line mb-4" />
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              {project.goal}
            </p>
          </section>

          <section>
            <p className="section-label mb-2">// целевая аудитория</p>
            <div className="divider-line mb-4" />
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              {project.audience}
            </p>
          </section>

        </div>

        {/* Trading Journal */}
        <TradingJournal />

        {/* Technologies */}
        <section className="mb-12">
          <p className="section-label mb-3">// технологии и инструменты</p>
          <div className="divider-line mb-5" />
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="tag-tech">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Links */}
        <section className="mb-10">
          <p className="section-label mb-3">// ссылки</p>
          <div className="divider-line mb-5" />
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="link-social">
                <Icon name={link.icon} size={15} fallback="Link" />
                {link.label}
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="divider-line mb-6" />
        <p className="section-label text-center" style={{ color: 'var(--surface-3)' }}>
          made with poehali.dev
        </p>

      </div>
    </div>
  );
}