export type Timeframe = '1m' | '5m' | '15m' | '1h' | '4h' | 'D' | 'W';

export interface TradePhoto {
  url: string;
  timeframe: Timeframe;
  caption?: string;
}

export interface Trade {
  id: string;
  date: string; // ISO
  pair: string;
  direction: 'Long' | 'Short';
  entryPrice: number;
  exitPrice: number;
  sl: number;
  tp: number;
  rr: string; // e.g. "1:3"
  result: 'win' | 'loss' | 'breakeven';
  pnlPercent: number;
  photos: TradePhoto[];
  description: string;
  analysisPerTf: { tf: Timeframe; text: string }[];
  tags: string[];
}

export const trades: Trade[] = [
  {
    id: 'trade-001',
    date: '2025-03-12T10:30:00',
    pair: 'EUR/USD',
    direction: 'Long',
    entryPrice: 1.0842,
    exitPrice: 1.0921,
    sl: 1.0810,
    tp: 1.0938,
    rr: '1:2.5',
    result: 'win',
    pnlPercent: 2.3,
    photos: [],
    description:
      'Импульсный пробой уровня 1.0840 после накопления ликвидности под сессионным минимумом. Структура цены указывала на смену характера — BOS на H1. Вошёл после ретеста пробитого уровня с подтверждением на M15.',
    analysisPerTf: [
      { tf: 'D', text: 'Цена в восходящем тренде. Ключевой уровень поддержки 1.0800. Общий байас — Long.' },
      { tf: '4h', text: 'BOS вверх. Формирование OB на откате. Поток ордеров в пользу покупателей.' },
      { tf: '1h', text: 'Пробой структуры, подтверждение смены тренда. Целевая зона 1.0920–1.0940.' },
      { tf: '15m', text: 'Вход после ретеста 1.0842. Стоп под локальным минимумом 1.0810.' },
    ],
    tags: ['Price Action', 'BOS', 'OB', 'SMC'],
  },
  {
    id: 'trade-002',
    date: '2025-03-05T14:15:00',
    pair: 'GBP/USD',
    direction: 'Short',
    entryPrice: 1.2745,
    exitPrice: 1.2680,
    sl: 1.2780,
    tp: 1.2660,
    rr: '1:2.4',
    result: 'win',
    pnlPercent: 1.8,
    photos: [],
    description:
      'Отработка зоны дистрибьюции на H4. Ложный пробой уровня 1.2750 с последующим разворотом. Ликвидность выше была сметена, после чего цена резко ушла вниз. Классический Stop Hunt + распределение.',
    analysisPerTf: [
      { tf: 'D', text: 'Цена у значимого уровня сопротивления. Дивергенция. Байас — Short.' },
      { tf: '4h', text: 'Зона дистрибьюции. Ложный пробой 1.2750. Медвежий OB.' },
      { tf: '1h', text: 'Подтверждение разворота. BOS вниз на 1h.' },
      { tf: '5m', text: 'Точный вход после ретеста зоны входа. Агрессивная точка — лимитный ордер.' },
    ],
    tags: ['Stop Hunt', 'Distribution', 'OB', 'Liquidity'],
  },
  {
    id: 'trade-003',
    date: '2025-02-18T09:00:00',
    pair: 'USD/JPY',
    direction: 'Long',
    entryPrice: 149.20,
    exitPrice: 148.95,
    sl: 148.80,
    tp: 150.10,
    rr: '1:2.25',
    result: 'loss',
    pnlPercent: -1.1,
    photos: [],
    description:
      'Вход по структуре на H1, но фундаментальный фактор (внезапное заявление BoJ) перевесил технический сигнал. Получил стоп. Ошибка — не учёл новостной фон. Сделка технически правильная, но нарушил риск-протокол по фундаментальному контексту.',
    analysisPerTf: [
      { tf: 'D', text: 'Диапазон 148.50–150.50. Нейтральный байас внутри флета.' },
      { tf: '4h', text: 'Попытка восстановления от нижней границы диапазона. OB на 148.80–149.00.' },
      { tf: '1h', text: 'BOS вверх. Ожидал продолжение к 150.10.' },
      { tf: '15m', text: 'Вход по ретесту. Стоп под OB. Не прошёл из-за новостей BoJ.' },
    ],
    tags: ['Loss', 'Fundamental Risk', 'Lesson'],
  },
  {
    id: 'trade-004',
    date: '2025-02-07T11:45:00',
    pair: 'EUR/USD',
    direction: 'Short',
    entryPrice: 1.0398,
    exitPrice: 1.0310,
    sl: 1.0430,
    tp: 1.0280,
    rr: '1:3',
    result: 'win',
    pnlPercent: 3.1,
    photos: [],
    description:
      'Снятие ликвидности с максимумов предыдущей недели. Инверсия FVG на H4 выступила точкой входа. Отличная сделка по соотношению риск/прибыль. Один из лучших сетапов месяца.',
    analysisPerTf: [
      { tf: 'W', text: 'Нисходящий тренд. Цена в зоне сопротивления недельного уровня.' },
      { tf: 'D', text: 'Снятие ликвидности с максимума 1.0400. Reversal сигнал.' },
      { tf: '4h', text: 'Инверсия FVG. Медвежий импульс после дистрибьюции.' },
      { tf: '1h', text: 'Точка входа — инверсия FVG. Стоп над ликвидностью 1.0430.' },
    ],
    tags: ['FVG', 'Liquidity Sweep', 'SMC', 'Inversion'],
  },
  {
    id: 'trade-005',
    date: '2025-01-22T16:00:00',
    pair: 'GBP/JPY',
    direction: 'Long',
    entryPrice: 191.50,
    exitPrice: 192.80,
    sl: 191.00,
    tp: 193.10,
    rr: '1:3.2',
    result: 'win',
    pnlPercent: 2.7,
    photos: [],
    description:
      'Лондонская сессия. Накопление под круглым уровнем 191.00. Ложный пробой поддержки — классический MMXM. Вошёл по рыночной цене с подтверждением на M15. Тейк выставил к следующей зоне ликвидности.',
    analysisPerTf: [
      { tf: 'D', text: 'Восходящий тренд. Откат в зону интереса 190.50–191.50.' },
      { tf: '4h', text: 'Накопление. Ложный пробой поддержки. Структура сохранена.' },
      { tf: '1h', text: 'Bullish engulfing на H1. Подтверждение разворота.' },
      { tf: '15m', text: 'Вход по M15 после поглощения. Стоп под 191.00.' },
    ],
    tags: ['MMXM', 'Accumulation', 'London Session', 'Sweep'],
  },
  {
    id: 'trade-006',
    date: '2025-01-08T08:30:00',
    pair: 'EUR/USD',
    direction: 'Short',
    entryPrice: 1.0510,
    exitPrice: 1.0510,
    sl: 1.0545,
    tp: 1.0440,
    rr: '1:2',
    result: 'breakeven',
    pnlPercent: 0,
    photos: [],
    description:
      'Перевёл в безубыток после достижения 50% тейка. Цена вернулась и закрыла по безубытку. Решение верное — предпочёл сохранить капитал. Сетап был рабочим, но рынок не дал полного профита.',
    analysisPerTf: [
      { tf: 'D', text: 'Нейтральный байас. Диапазонная торговля.' },
      { tf: '4h', text: 'Отскок от сопротивления 1.0510.' },
      { tf: '1h', text: 'Медвежий OB. Ожидал движение к 1.0440.' },
      { tf: '15m', text: 'Вход на ретесте. Перевёл в безубыток на 1R.' },
    ],
    tags: ['Breakeven', 'Risk Management'],
  },
];

export function groupTradesByMonthYear(tradesArr: Trade[]) {
  const sorted = [...tradesArr].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const groups: { label: string; year: number; month: number; trades: Trade[] }[] = [];
  for (const trade of sorted) {
    const d = new Date(trade.date);
    const year = d.getFullYear();
    const month = d.getMonth();
    const label = `${new Date(d).toLocaleString('ru-RU', { month: 'long' })} ${year}`;
    const existing = groups.find((g) => g.year === year && g.month === month);
    if (existing) {
      existing.trades.push(trade);
    } else {
      groups.push({ label, year, month, trades: [trade] });
    }
  }
  return groups;
}
