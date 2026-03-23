import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { trades, groupTradesByMonthYear, Trade } from '@/data/trades';

function DirectionBadge({ direction }: { direction: 'Long' | 'Short' }) {
  const isLong = direction === 'Long';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '2px 8px',
        borderRadius: 4,
        fontSize: '0.65rem',
        fontWeight: 700,
        letterSpacing: '0.05em',
        background: isLong ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
        color: isLong ? '#22c55e' : '#ef4444',
        border: `1px solid ${isLong ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
      }}
    >
      <Icon name={isLong ? 'TrendingUp' : 'TrendingDown'} size={10} fallback="ArrowUp" />
      {direction}
    </span>
  );
}

function ResultBadge({ result, pnl }: { result: Trade['result']; pnl: number }) {
  const cfg = {
    win: { color: '#22c55e', bg: 'rgba(34,197,94,0.1)', label: `+${pnl}%` },
    loss: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', label: `${pnl}%` },
    breakeven: { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', label: 'BE' },
  }[result];
  return (
    <span
      style={{
        padding: '2px 8px',
        borderRadius: 4,
        fontSize: '0.65rem',
        fontWeight: 700,
        background: cfg.bg,
        color: cfg.color,
      }}
    >
      {cfg.label}
    </span>
  );
}

function TradeCard({ trade }: { trade: Trade }) {
  const navigate = useNavigate();
  const d = new Date(trade.date);
  const dateStr = d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
  const timeStr = d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      onClick={() => navigate(`/trade/${trade.id}`)}
      style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--surface-3)',
        borderRadius: 10,
        padding: '14px 16px',
        cursor: 'pointer',
        transition: 'border-color 0.15s, transform 0.1s',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 8,
        alignItems: 'center',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(102,179,255,0.35)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--surface-3)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{trade.pair}</span>
          <DirectionBadge direction={trade.direction} />
          <ResultBadge result={trade.result} pnl={trade.pnlPercent} />
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
            Вход: <span style={{ color: 'var(--text-primary)' }}>{trade.entryPrice}</span>
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
            Выход: <span style={{ color: 'var(--text-primary)' }}>{trade.exitPrice}</span>
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
            RR: <span style={{ color: 'var(--neon)' }}>{trade.rr}</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {trade.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.6rem',
                padding: '1px 6px',
                borderRadius: 3,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--text-secondary)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-primary)', fontWeight: 600 }}>{dateStr}</span>
          <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)' }}>{timeStr}</span>
        </div>
        <Icon name="ChevronRight" size={14} fallback="ChevronRight" style={{ color: 'var(--text-secondary)', opacity: 0.5 }} />
      </div>
    </div>
  );
}

function MonthStats({ monthTrades }: { monthTrades: Trade[] }) {
  const wins = monthTrades.filter((t) => t.result === 'win').length;
  const losses = monthTrades.filter((t) => t.result === 'loss').length;
  const be = monthTrades.filter((t) => t.result === 'breakeven').length;
  const totalPnl = monthTrades.reduce((acc, t) => acc + t.pnlPercent, 0);
  const wr = monthTrades.length > 0 ? Math.round((wins / monthTrades.length) * 100) : 0;

  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
        Сделок: <b style={{ color: 'var(--text-primary)' }}>{monthTrades.length}</b>
      </span>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
        Win Rate: <b style={{ color: '#22c55e' }}>{wr}%</b>
      </span>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
        <b style={{ color: '#22c55e' }}>{wins}W</b> / <b style={{ color: '#ef4444' }}>{losses}L</b>
        {be > 0 && (
          <> / <b style={{ color: '#94a3b8' }}>{be}BE</b></>
        )}
      </span>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
        PnL:{' '}
        <b style={{ color: totalPnl >= 0 ? '#22c55e' : '#ef4444' }}>
          {totalPnl >= 0 ? '+' : ''}{totalPnl.toFixed(1)}%
        </b>
      </span>
    </div>
  );
}

export default function TradingJournal() {
  const groups = groupTradesByMonthYear(trades);
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    new Set(groups.slice(0, 2).map((g) => `${g.year}-${g.month}`))
  );

  const toggle = (key: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <section className="mb-12">
      <p className="section-label mb-2">// торговый журнал</p>
      <div className="divider-line mb-6" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {groups.map((group) => {
          const key = `${group.year}-${group.month}`;
          const isOpen = openGroups.has(key);
          return (
            <div key={key} style={{ border: '1px solid var(--surface-3)', borderRadius: 12, overflow: 'hidden' }}>
              {/* Month header */}
              <button
                onClick={() => toggle(key)}
                style={{
                  width: '100%',
                  background: 'var(--surface-2)',
                  border: 'none',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: 'var(--neon)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {group.label}
                  </span>
                  {!isOpen && (
                    <div style={{ marginTop: 4 }}>
                      <MonthStats monthTrades={group.trades} />
                    </div>
                  )}
                </div>
                <Icon
                  name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                  size={16}
                  fallback="ChevronDown"
                  style={{ color: 'var(--text-secondary)', flexShrink: 0 }}
                />
              </button>

              {/* Month content */}
              {isOpen && (
                <div style={{ padding: '12px 14px 14px', background: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <MonthStats monthTrades={group.trades} />
                  {group.trades.map((trade) => (
                    <TradeCard key={trade.id} trade={trade} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
