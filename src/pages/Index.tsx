import Icon from '@/components/ui/icon';

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

        {/* Screenshot browser mockup */}
        <div className="mb-12">
          <p className="section-label mb-3">// скриншоты</p>
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--surface-3)', borderRadius: 12, overflow: 'hidden' }}>
            {/* Browser chrome */}
            <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--surface-3)', padding: '0.6rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
              </div>
              <div style={{ flex: 1, height: 22, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 5, display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0 0.6rem' }}>
                <Icon name="Lock" size={9} fallback="Lock" style={{ color: 'var(--text-secondary)', opacity: 0.3 }} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: 'var(--text-secondary)', opacity: 0.3 }}>example.com</span>
              </div>
            </div>
            {/* Screenshot area */}
            <div style={{ width: '100%', aspectRatio: '16 / 7', background: '#cc0000' }} />
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