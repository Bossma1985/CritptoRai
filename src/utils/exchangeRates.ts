import { Currency } from '../types';

class ExchangeRateManager {
  private rates: { [key: string]: number } = { EUR: 0.92 };
  private lastUpdate: number = 0;
  private readonly UPDATE_INTERVAL = 300000; // 5 minutos

  async getExchangeRate(targetCurrency: Currency): Promise<number> {
    if (targetCurrency === 'USD') return 1;
    
    const now = Date.now();
    
    // Actualizar si han pasado más de 5 minutos
    if (now - this.lastUpdate > this.UPDATE_INTERVAL) {
      await this.updateRates();
    }
    
    return this.rates[targetCurrency] || 0.92;
  }

  private async updateRates(): Promise<void> {
    try {
      // En una app real, esto haría una llamada a una API de tasas de cambio
      // Por ahora usamos la API de CoinGecko que ya tenemos
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=eur');
      
      if (response.ok) {
        const data = await response.json();
        if (data.usd?.eur) {
          this.rates.EUR = data.usd.eur;
          this.lastUpdate = Date.now();
        }
      }
    } catch (error) {
      console.warn('No se pudieron actualizar las tasas de cambio, usando valores por defecto');
    }
  }

  convertPrice(amount: number, fromCurrency: Currency, toCurrency: Currency): number {
    if (fromCurrency === toCurrency) return amount;
    
    // Convertir a USD primero si es necesario
    let usdAmount = amount;
    if (fromCurrency === 'EUR') {
      usdAmount = amount / (this.rates.EUR || 0.92);
    }
    
    // Convertir de USD a la moneda objetivo
    if (toCurrency === 'EUR') {
      return usdAmount * (this.rates.EUR || 0.92);
    }
    
    return usdAmount;
  }

  getRates(): { [key: string]: number } {
    return { ...this.rates };
  }
}

export const exchangeRateManager = new ExchangeRateManager(); 