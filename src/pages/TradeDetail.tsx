import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Bar,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import Icon from '@/components/ui/icon';
import { trades, Trade, Timeframe } from '@/data/trades';

// --- Candle generator seeded by trade ---
function generateCandles(trade: Trade, tf: Timeframe, count = 60) {
  const seed = trade.entryPrice;
  let price = seed * 0.995;
  const candles = [];
  const tfMultiplier: Record<Timeframe, number> = {
    '1m': 1, '5m': 5, '15m': 15, '1h': 60, '4h': 240, 'D': 1440, 'W': 10080,
  };
  const vol = seed * 0.0025;
  const entryIdx = Math.floor(count * 0.4);
  const exitIdx = Math.floor(count * 0.8);

  for (let i = 0; i < count; i++) {
    const r = Math.sin(i * 127.1 + seed * 31.4) * 0.5 + Math.sin(i * 311.7 + seed * 17.3) * 0.3;
    const trend = trade.direction === 'Long' ? 0.0003 : -0.0003;
    const change = r * vol + trend;

    const open = price;
    price += change;
    const close = price;
    const high = Math.max(open, close) + Math.abs(r * vol * 0.5);
    const low = Math.min(open, close) - Math.abs(r * vol * 0.4);

    candles.push({
      i,
      open: +open.toFixed(5),
      close: +close.toFixed(5),
      high: +high.toFixed(5),
      low: +low.toFixed(5),
      isUp: close >= open,
      isEntry: i === entryIdx,
      isExit: i === exitIdx,
      label: String(i),
    });
  }
  return { candles, entryIdx, exitIdx, tfMultiplier };
}

interface CandleData { open: number; close: number; high: number; low: number; isUp: boolean; i: number; label: string; isEntry: boolean; isExit: boolean; }

// Custom candle tooltip
function CandleTooltip({ active, payload }: { active?: boolean; payload?: { payload: CandleData }[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  return (
    <div
      style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--surface-3)',
        borderRadius: 8,
        padding: '8px 12px',
        fontSize: '0.72rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.8,
      }}
    >
      <div style={{ color: d.isUp ? '#22c55e' : '#ef4444', fontWeight: 700, marginBottom: 2 }}>
        {d.isUp ? '▲' : '▼'} {d.isUp ? 'Бычья' : 'Медвежья'}
      </div>
      <div>O: <b style={{ color: 'var(--text-primary)' }}>{d.open}</b></div>
      <div>H: <b style={{ color: 'var(--text-primary)' }}>{d.high}</b></div>
      <div>L: <b style={{ color: 'var(--text-primary)' }}>{d.low}</b></div>
      <div>C: <b style={{ color: 'var(--text-primary)' }}>{d.close}</b></div>
    </div>
  );
}

interface CandleBarProps { x?: number; y?: number; width?: number; height?: number; payload?: CandleData; }

// Custom candle bar shape
function CandleBar(props: CandleBarProps) {
  const { x, y, width, height, payload } = props;
  if (!payload) return null;
  const { open, close, high, low, isUp } = payload;
  const color = isUp ? '#22c55e' : '#ef4444';
  const bodyTop = Math.min(open, close);
  const bodyBottom = Math.max(open, close);
  const allPrices = [open, close, high, low];
  const minP = Math.min(...allPrices);
  const maxP = Math.max(...allPrices);
  const range = maxP - minP || 0.0001;

  const chartH = height + y - y;
  const pxPerUnit = Math.abs(height) / range;

  const bodyH = Math.max(1, Math.abs(open - close) * pxPerUnit);
  const bodyY = y + (maxP - bodyBottom) * pxPerUnit;
  const wickTopY = y;
  const wickBottomY = y + range * pxPerUnit;
  const wickHighY = y + (maxP - high) * pxPerUnit;
  const wickLowY = y + (maxP - low) * pxPerUnit;
  const cx = x + width / 2;
  const bodyWidth = Math.max(3, width - 2);
  const bodyX = x + (width - bodyWidth) / 2;

  return (
    <g>
      <line x1={cx} y1={wickHighY} x2={cx} y2={bodyY} stroke={color} strokeWidth={1} />
      <line x1={cx} y1={bodyY + bodyH} x2={cx} y2={wickLowY} stroke={color} strokeWidth={1} />
      <rect x={bodyX} y={bodyY} width={bodyWidth} height={Math.max(1, bodyH)} fill={color} opacity={0.85} rx={1} />
    </g>
  );
}

const TIMEFRAMES: Timeframe[] = ['1m', '5m', '15m', '1h', '4h', 'D', 'W'];

export default function TradeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const trade = trades.find((t) => t.id === id);
  const [activeTf, setActiveTf] = useState<Timeframe>('1h');
  const [activeTab, setActiveTab] = useState<'chart' | 'analysis'>('chart');

  const { candles } = useMemo(() => {
    if (!trade) return { candles: [], entryIdx: 0, exitIdx: 0 };
    return generateCandles(trade, activeTf);
  }, [trade, activeTf]);

  if (!trade) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ background: 'var(--surface)', color: 'var(--text-secondary)' }}
      >
        <p>Сделка не найдена</p>
        <button onClick={() => navigate(-1)} style={{ marginTop: 16, color: 'var(--neon)' }}>
          ← Назад
        </button>
      </div>
    );
  }

  const isLong = trade.direction === 'Long';
  const dirColor = isLong ? '#22c55e' : '#ef4444';
  const resultColor = trade.result === 'win' ? '#22c55e' : trade.result === 'loss' ? '#ef4444' : '#94a3b8';
  const resultLabel = trade.result === 'win' ? `+${trade.pnlPercent}%` : trade.result === 'loss' ? `${trade.pnlPercent}%` : 'BE';

  const tfAnalysis = trade.analysisPerTf.find((a) => a.tf === activeTf);

  const priceMin = Math.min(...candles.map((c) => c.low));
  const priceMax = Math.max(...candles.map((c) => c.high));
  const pricePad = (priceMax - priceMin) * 0.1;

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--surface)', color: 'var(--text-primary)', fontFamily: "'Golos Text', sans-serif" }}
    >
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--surface-3)', background: 'var(--surface-2)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--neon)', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}
          >
            <Icon name="ArrowLeft" size={16} fallback="ArrowLeft" />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem' }}>назад</span>
          </button>
          <span style={{ color: 'var(--surface-3)' }}>|</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
            // сделка / {trade.pair}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Trade header */}
        <div className="mb-6 flex flex-wrap gap-4 items-start justify-between">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
              <h1 style={{ fontFamily: "'Golos Text', sans-serif", fontWeight: 900, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', lineHeight: 1.1, margin: 0 }}>
                {trade.pair}
              </h1>
              <span
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 12px',
                  borderRadius: 6, fontSize: '0.8rem', fontWeight: 700,
                  background: isLong ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                  color: dirColor, border: `1px solid ${isLong ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                }}
              >
                <Icon name={isLong ? 'TrendingUp' : 'TrendingDown'} size={14} fallback="ArrowUp" />
                {trade.direction}
              </span>
              <span style={{ padding: '4px 12px', borderRadius: 6, fontSize: '0.8rem', fontWeight: 700, color: resultColor, background: `${resultColor}18` }}>
                {resultLabel}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {[
                { label: 'Вход', val: trade.entryPrice },
                { label: 'Выход', val: trade.exitPrice },
                { label: 'SL', val: trade.sl },
                { label: 'TP', val: trade.tp },
              ].map(({ label, val }) => (
                <div key={label}>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', marginBottom: 2 }}>{label}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600 }}>{val}</div>
                </div>
              ))}
              <div>
                <div style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', marginBottom: 2 }}>RR</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.82rem', color: 'var(--neon)', fontWeight: 700 }}>{trade.rr}</div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              {new Date(trade.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' })}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: 2 }}>
              {new Date(trade.date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 2, marginBottom: 16, borderBottom: '1px solid var(--surface-3)', paddingBottom: 0 }}>
          {(['chart', 'analysis'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px',
                fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', fontWeight: 600,
                color: activeTab === tab ? 'var(--neon)' : 'var(--text-secondary)',
                borderBottom: activeTab === tab ? '2px solid var(--neon)' : '2px solid transparent',
                marginBottom: -1, transition: 'color 0.15s',
              }}
            >
              {tab === 'chart' ? '// график' : '// анализ'}
            </button>
          ))}
        </div>

        {activeTab === 'chart' && (
          <div>
            {/* Timeframe switcher */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 12, flexWrap: 'wrap' }}>
              {TIMEFRAMES.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setActiveTf(tf)}
                  style={{
                    padding: '5px 12px', borderRadius: 6, border: '1px solid',
                    borderColor: activeTf === tf ? 'var(--neon)' : 'var(--surface-3)',
                    background: activeTf === tf ? 'rgba(102,179,255,0.12)' : 'var(--surface-2)',
                    color: activeTf === tf ? 'var(--neon)' : 'var(--text-secondary)',
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Chart */}
            <div
              style={{
                background: 'var(--surface-2)', border: '1px solid var(--surface-3)',
                borderRadius: 12, padding: '16px 8px 8px', marginBottom: 16,
              }}
            >
              <div style={{ display: 'flex', gap: 16, marginBottom: 8, paddingLeft: 8 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: '#22c55e', display: 'inline-block' }} />
                  Бычья
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: '#ef4444', display: 'inline-block' }} />
                  Медвежья
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                  <span style={{ width: 2, height: 10, background: '#facc15', display: 'inline-block' }} />
                  Вход / Выход
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.65rem', color: '#ef4444' }}>
                  <span style={{ width: 10, border: '1px dashed #ef4444', display: 'inline-block' }} />
                  SL
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.65rem', color: '#22c55e' }}>
                  <span style={{ width: 10, border: '1px dashed #22c55e', display: 'inline-block' }} />
                  TP
                </span>
              </div>

              <ResponsiveContainer width="100%" height={320}>
                <ComposedChart data={candles} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="i" hide />
                  <YAxis
                    domain={[priceMin - pricePad, priceMax + pricePad]}
                    tickFormatter={(v) => v.toFixed(4)}
                    width={70}
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CandleTooltip />} />

                  {/* Entry line */}
                  <ReferenceLine
                    y={trade.entryPrice}
                    stroke="#facc15"
                    strokeWidth={1.5}
                    strokeDasharray="6 3"
                    label={{ value: `Вход ${trade.entryPrice}`, position: 'insideTopLeft', fill: '#facc15', fontSize: 9 }}
                  />
                  {/* Exit line */}
                  <ReferenceLine
                    y={trade.exitPrice}
                    stroke="#facc15"
                    strokeWidth={1.5}
                    strokeDasharray="6 3"
                    label={{ value: `Выход ${trade.exitPrice}`, position: 'insideBottomLeft', fill: '#facc15', fontSize: 9 }}
                  />
                  {/* SL */}
                  <ReferenceLine
                    y={trade.sl}
                    stroke="#ef4444"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    label={{ value: `SL ${trade.sl}`, position: 'insideTopLeft', fill: '#ef4444', fontSize: 9 }}
                  />
                  {/* TP */}
                  <ReferenceLine
                    y={trade.tp}
                    stroke="#22c55e"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    label={{ value: `TP ${trade.tp}`, position: 'insideTopLeft', fill: '#22c55e', fontSize: 9 }}
                  />

                  <Bar dataKey="high" shape={<CandleBar />} isAnimationActive={false}>
                    {candles.map((entry, index) => (
                      <Cell key={index} fill={entry.isUp ? '#22c55e' : '#ef4444'} />
                    ))}
                  </Bar>
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* TF-specific analysis */}
            {tfAnalysis && (
              <div
                style={{
                  background: 'rgba(102,179,255,0.05)', border: '1px solid rgba(102,179,255,0.15)',
                  borderRadius: 10, padding: '14px 16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: 'var(--neon)', fontWeight: 700 }}>
                    {activeTf}
                  </span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                    // логика по таймфрейму
                  </span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                  {tfAnalysis.text}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analysis' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Main description */}
            <section>
              <p className="section-label mb-3">// общее описание</p>
              <div className="divider-line mb-4" />
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.93rem' }}>
                {trade.description}
              </p>
            </section>

            {/* Per-TF analysis — full cards W → 5m */}
            <section>
              <p className="section-label mb-3">// разбор по таймфреймам</p>
              <div className="divider-line mb-5" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {trade.analysisPerTf.map((tfa) => {
                  const biasColor = tfa.bias === 'bullish' ? '#22c55e' : tfa.bias === 'bearish' ? '#ef4444' : '#94a3b8';
                  const biasLabel = tfa.bias === 'bullish' ? '▲ Бычий' : tfa.bias === 'bearish' ? '▼ Медвежий' : '◆ Нейтральный';
                  const tfLabels: Record<string, string> = {
                    W: 'Недельный', D: 'Дневной', '4h': '4 часа', '1h': '1 час', '15m': '15 минут', '5m': '5 минут', '1m': '1 минута',
                  };
                  return (
                    <div
                      key={tfa.tf}
                      style={{
                        background: 'var(--surface-2)',
                        border: '1px solid var(--surface-3)',
                        borderRadius: 12,
                        overflow: 'hidden',
                      }}
                    >
                      {/* TF header */}
                      <div
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '12px 16px',
                          borderBottom: '1px solid var(--surface-3)',
                          background: 'rgba(255,255,255,0.02)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span
                            style={{
                              fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.78rem', fontWeight: 700,
                              color: 'var(--neon)', background: 'rgba(102,179,255,0.1)',
                              border: '1px solid rgba(102,179,255,0.25)', borderRadius: 5,
                              padding: '3px 10px',
                            }}
                          >
                            {tfa.tf}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                            {tfLabels[tfa.tf] ?? tfa.tf}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: '0.7rem', fontWeight: 700, color: biasColor,
                            background: `${biasColor}18`, border: `1px solid ${biasColor}40`,
                            borderRadius: 5, padding: '2px 10px',
                          }}
                        >
                          {biasLabel}
                        </span>
                      </div>

                      {/* TF body */}
                      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 12px' }}>
                            <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontFamily: "'IBM Plex Mono', monospace", marginBottom: 4, letterSpacing: '0.06em' }}>
                              КЛЮЧЕВЫЕ УРОВНИ
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                              {tfa.keyLevels}
                            </div>
                          </div>
                          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 12px' }}>
                            <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontFamily: "'IBM Plex Mono', monospace", marginBottom: 4, letterSpacing: '0.06em' }}>
                              СТРУКТУРА РЫНКА
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                              {tfa.marketStructure}
                            </div>
                          </div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 12px' }}>
                          <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontFamily: "'IBM Plex Mono', monospace", marginBottom: 4, letterSpacing: '0.06em' }}>
                            СЕТАП / ПЛАН
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--neon)', lineHeight: 1.5 }}>
                            {tfa.setup}
                          </div>
                        </div>
                        <div style={{ borderLeft: `2px solid ${biasColor}60`, paddingLeft: 12 }}>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
                            {tfa.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Tags */}
            <section>
              <p className="section-label mb-3">// теги сетапа</p>
              <div className="divider-line mb-4" />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {trade.tags.map((tag) => (
                  <span key={tag} className="tag-tech">{tag}</span>
                ))}
              </div>
            </section>

          </div>
        )}

      </div>
    </div>
  );
}