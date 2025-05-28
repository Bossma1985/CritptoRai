import { exchangeRateManager } from './exchangeRates';

export type Currency = 'USD' | 'EUR';

// Función síncrona que usa la última tasa conocida
export const formatPrice = (price: number, currency: Currency = 'USD') => {
  const rates = exchangeRateManager.getRates();
  const convertedPrice = currency === 'EUR' ? price * (rates.EUR || 0.92) : price;
  
  return new Intl.NumberFormat(currency === 'EUR' ? 'es-ES' : 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: price < 1 ? 6 : 2,
  }).format(convertedPrice);
};

export const formatPercentage = (percentage: number) => {
  const sign = percentage >= 0 ? '+' : '';
  return `${sign}${percentage.toFixed(2)}%`;
};

export const formatNumber = (num: number, decimals: number = 4) => {
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const formatMarketCap = (marketCap: number, currency: Currency = 'USD') => {
  const rates = exchangeRateManager.getRates();
  const convertedCap = currency === 'EUR' ? marketCap * (rates.EUR || 0.92) : marketCap;
  
  if (convertedCap >= 1e12) {
    return `${(convertedCap / 1e12).toFixed(2)}T ${currency}`;
  } else if (convertedCap >= 1e9) {
    return `${(convertedCap / 1e9).toFixed(2)}B ${currency}`;
  } else if (convertedCap >= 1e6) {
    return `${(convertedCap / 1e6).toFixed(2)}M ${currency}`;
  }
  return formatPrice(convertedCap, currency);
};

export const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('es-ES', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateShort = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('es-ES', {
    month: 'short',
    day: 'numeric',
  });
};

export const getPercentageColor = (percentage: number) => {
  return percentage >= 0 ? 'text-green-600' : 'text-red-600';
};

export const getPercentageIcon = (percentage: number) => {
  return percentage >= 0 ? '📈' : '📉';
}; 