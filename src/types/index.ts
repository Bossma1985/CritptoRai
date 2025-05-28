export type Currency = 'USD' | 'EUR';
export type AlertType = 'above' | 'below' | 'percentage_change';
export type OrderType = 'buy' | 'sell';
export type OrderStatus = 'pending' | 'completed' | 'cancelled';
export type TimeFrame = 1 | 7 | 30 | 90 | 365;

export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d?: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  image: string;
  last_updated: string;
  high_24h?: number;
  low_24h?: number;
  circulating_supply?: number;
  total_supply?: number;
}

export interface PriceAlert {
  id: string;
  cryptoId: string;
  cryptoName: string;
  cryptoSymbol: string;
  targetPrice: number;
  alertType: AlertType;
  isActive: boolean;
  currency: Currency;
  createdAt: string;
  triggeredAt?: string;
  message?: string;
}

export interface ChartData {
  timestamp: number;
  price: number;
  volume?: number;
}

export interface Portfolio {
  cryptoId: string;
  symbol: string;
  name: string;
  amount: number;
  averagePrice: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  currency: Currency;
  addedAt: string;
  image: string;
}

export interface TradeOrder {
  id: string;
  cryptoId: string;
  cryptoSymbol: string;
  type: OrderType;
  amount: number;
  price: number;
  currency: Currency;
  timestamp: string;
  status: OrderStatus;
  totalValue: number;
}

export interface AppSettings {
  currency: Currency;
  theme: 'light' | 'dark' | 'auto';
  refreshInterval: number;
  notifications: boolean;
  language: 'es' | 'en';
}

export interface MarketStats {
  totalMarketCap: number;
  total24hVolume: number;
  btcDominance: number;
  activeCryptocurrencies: number;
} 