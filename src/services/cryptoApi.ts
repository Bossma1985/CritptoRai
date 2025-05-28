import { CryptoCurrency, ChartData, MarketStats } from '../types';

const BASE_URL = 'https://api.coingecko.com/api/v3';

// Cache para evitar llamadas innecesarias
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 30000; // 30 segundos

const getCachedData = (key: string) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

export class CryptoApiService {
  static async getTopCryptocurrencies(limit: number = 100): Promise<CryptoCurrency[]> {
    const cacheKey = `top-cryptos-${limit}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    console.log('🔍 Fetching cryptocurrencies from API...');
    
    try {
      // Intentar primero con la API principal
      let url = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h,7d`;
      console.log('📡 API URL:', url);
      
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📊 Response status:', response.status);
      console.log('📊 Response ok:', response.ok);
      
      // Si la primera URL falla, intentar con una versión simplificada
      if (!response.ok) {
        console.log('🔄 Trying simplified API call...');
        url = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1`;
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        console.log('📊 Simplified response status:', response.status);
      }
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error:', errorText);
        
        // Si la API falla, usar datos de fallback
        console.log('🔄 Using fallback data...');
        return this.getFallbackData();
      }
      
      const data = await response.json();
      console.log('✅ Data received:', data.length, 'cryptocurrencies');
      console.log('📋 First crypto:', data[0]?.name);
      
      const formattedData = data.map((coin: any) => ({
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        current_price: coin.current_price,
        price_change_percentage_24h: coin.price_change_percentage_24h || 0,
        price_change_percentage_7d: coin.price_change_percentage_7d_in_currency || 0,
        market_cap: coin.market_cap,
        market_cap_rank: coin.market_cap_rank,
        total_volume: coin.total_volume || 0,
        image: coin.image,
        last_updated: coin.last_updated,
        high_24h: coin.high_24h,
        low_24h: coin.low_24h,
        circulating_supply: coin.circulating_supply,
        total_supply: coin.total_supply,
      }));

      cache.set(cacheKey, { data: formattedData, timestamp: Date.now() });
      console.log('💾 Data cached successfully');
      return formattedData;
    } catch (error) {
      console.error('💥 Error fetching cryptocurrencies:', error);
      console.log('🔄 Using fallback data due to error...');
      return this.getFallbackData();
    }
  }

  static getFallbackData(): CryptoCurrency[] {
    console.log('📦 Returning fallback cryptocurrency data');
    const cryptos = [
      { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', price: 67500, change24h: 2.5, change7d: -1.2, mcap: 1330000000000, rank: 1 },
      { id: 'ethereum', symbol: 'eth', name: 'Ethereum', price: 3200, change24h: 1.8, change7d: -2.1, mcap: 385000000000, rank: 2 },
      { id: 'tether', symbol: 'usdt', name: 'Tether', price: 0.92, change24h: 0.01, change7d: 0.02, mcap: 140000000000, rank: 3 },
      { id: 'ripple', symbol: 'xrp', name: 'XRP', price: 2.04, change24h: -0.78, change7d: -0.9, mcap: 119000000000, rank: 4 },
      { id: 'binancecoin', symbol: 'bnb', name: 'BNB', price: 599.27, change24h: 0.82, change7d: -3.4, mcap: 87000000000, rank: 5 },
      { id: 'solana', symbol: 'sol', name: 'Solana', price: 163.44, change24h: -0.23, change7d: -5.8, mcap: 80000000000, rank: 6 },
      { id: 'usd-coin', symbol: 'usdc', name: 'USDC', price: 0.92, change24h: 0.00, change7d: 0.01, mcap: 54000000000, rank: 7 },
      { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin', price: 0.38, change24h: 3.2, change7d: -2.1, mcap: 56000000000, rank: 8 },
      { id: 'cardano', symbol: 'ada', name: 'Cardano', price: 0.89, change24h: 1.5, change7d: -4.2, mcap: 31000000000, rank: 9 },
      { id: 'avalanche-2', symbol: 'avax', name: 'Avalanche', price: 42.50, change24h: 2.8, change7d: -1.5, mcap: 17000000000, rank: 10 },
      { id: 'chainlink', symbol: 'link', name: 'Chainlink', price: 25.80, change24h: 1.2, change7d: -3.1, mcap: 15000000000, rank: 11 },
      { id: 'polygon', symbol: 'matic', name: 'Polygon', price: 0.95, change24h: 2.1, change7d: -1.8, mcap: 9500000000, rank: 12 },
      { id: 'litecoin', symbol: 'ltc', name: 'Litecoin', price: 105.50, change24h: 0.8, change7d: -2.5, mcap: 7800000000, rank: 13 },
      { id: 'polkadot', symbol: 'dot', name: 'Polkadot', price: 8.90, change24h: 1.9, change7d: -4.1, mcap: 12000000000, rank: 14 },
      { id: 'uniswap', symbol: 'uni', name: 'Uniswap', price: 12.40, change24h: 3.5, change7d: -1.2, mcap: 7400000000, rank: 15 },
      { id: 'stellar', symbol: 'xlm', name: 'Stellar', price: 0.42, change24h: 2.8, change7d: -3.5, mcap: 12500000000, rank: 16 },
      { id: 'algorand', symbol: 'algo', name: 'Algorand', price: 0.35, change24h: 1.1, change7d: -2.8, mcap: 2800000000, rank: 17 },
      { id: 'cosmos', symbol: 'atom', name: 'Cosmos', price: 9.80, change24h: 2.3, change7d: -1.9, mcap: 3800000000, rank: 18 },
      { id: 'filecoin', symbol: 'fil', name: 'Filecoin', price: 6.20, change24h: 1.8, change7d: -4.2, mcap: 3500000000, rank: 19 },
      { id: 'vechain', symbol: 'vet', name: 'VeChain', price: 0.045, change24h: 2.1, change7d: -2.1, mcap: 3200000000, rank: 20 },
      { id: 'tron', symbol: 'trx', name: 'TRON', price: 0.28, change24h: 1.5, change7d: -1.8, mcap: 24000000000, rank: 21 },
      { id: 'ethereum-classic', symbol: 'etc', name: 'Ethereum Classic', price: 32.50, change24h: 0.9, change7d: -3.2, mcap: 4800000000, rank: 22 },
      { id: 'monero', symbol: 'xmr', name: 'Monero', price: 185.20, change24h: 1.2, change7d: -2.5, mcap: 3400000000, rank: 23 },
      { id: 'iota', symbol: 'miota', name: 'IOTA', price: 0.28, change24h: 2.8, change7d: -1.5, mcap: 780000000, rank: 24 },
      { id: 'eos', symbol: 'eos', name: 'EOS', price: 0.85, change24h: 1.1, change7d: -4.1, mcap: 850000000, rank: 25 },
      { id: 'aave', symbol: 'aave', name: 'Aave', price: 180.50, change24h: 2.5, change7d: -1.8, mcap: 2700000000, rank: 26 },
      { id: 'maker', symbol: 'mkr', name: 'Maker', price: 1850.00, change24h: 1.8, change7d: -2.2, mcap: 1800000000, rank: 27 },
      { id: 'compound', symbol: 'comp', name: 'Compound', price: 85.20, change24h: 3.1, change7d: -1.5, mcap: 850000000, rank: 28 },
      { id: 'yearn-finance', symbol: 'yfi', name: 'Yearn Finance', price: 8500.00, change24h: 2.8, change7d: -3.1, mcap: 310000000, rank: 29 },
      { id: 'sushi', symbol: 'sushi', name: 'SushiSwap', price: 1.85, change24h: 1.5, change7d: -2.8, mcap: 240000000, rank: 30 },
      { id: 'curve-dao-token', symbol: 'crv', name: 'Curve DAO Token', price: 0.95, change24h: 2.1, change7d: -1.2, mcap: 380000000, rank: 31 },
      { id: 'pancakeswap-token', symbol: 'cake', name: 'PancakeSwap', price: 2.80, change24h: 1.8, change7d: -2.5, mcap: 450000000, rank: 32 },
      { id: 'thorchain', symbol: 'rune', name: 'THORChain', price: 5.20, change24h: 2.5, change7d: -1.8, mcap: 1700000000, rank: 33 },
      { id: 'terra-luna', symbol: 'luna', name: 'Terra Luna Classic', price: 0.00012, change24h: 5.2, change7d: -8.1, mcap: 850000000, rank: 34 },
      { id: 'near', symbol: 'near', name: 'NEAR Protocol', price: 6.80, change24h: 1.9, change7d: -2.8, mcap: 7200000000, rank: 35 },
      { id: 'fantom', symbol: 'ftm', name: 'Fantom', price: 0.85, change24h: 2.8, change7d: -1.5, mcap: 2400000000, rank: 36 },
      { id: 'harmony', symbol: 'one', name: 'Harmony', price: 0.025, change24h: 1.2, change7d: -3.8, mcap: 320000000, rank: 37 },
      { id: 'elrond-erd-2', symbol: 'egld', name: 'MultiversX', price: 45.20, change24h: 2.1, change7d: -2.1, mcap: 1200000000, rank: 38 },
      { id: 'helium', symbol: 'hnt', name: 'Helium', price: 8.50, change24h: 1.8, change7d: -1.9, mcap: 1400000000, rank: 39 },
      { id: 'flow', symbol: 'flow', name: 'Flow', price: 0.95, change24h: 2.5, change7d: -2.8, mcap: 1500000000, rank: 40 },
      { id: 'internet-computer', symbol: 'icp', name: 'Internet Computer', price: 12.80, change24h: 1.1, change7d: -4.2, mcap: 6000000000, rank: 41 },
      { id: 'theta-token', symbol: 'theta', name: 'Theta Network', price: 2.10, change24h: 2.8, change7d: -1.5, mcap: 2100000000, rank: 42 },
      { id: 'decentraland', symbol: 'mana', name: 'Decentraland', price: 0.58, change24h: 1.5, change7d: -3.1, mcap: 1100000000, rank: 43 },
      { id: 'the-sandbox', symbol: 'sand', name: 'The Sandbox', price: 0.42, change24h: 2.1, change7d: -2.5, mcap: 950000000, rank: 44 },
      { id: 'axie-infinity', symbol: 'axs', name: 'Axie Infinity', price: 8.20, change24h: 1.8, change7d: -1.8, mcap: 620000000, rank: 45 },
      { id: 'enjincoin', symbol: 'enj', name: 'Enjin Coin', price: 0.35, change24h: 2.5, change7d: -2.1, mcap: 320000000, rank: 46 },
      { id: 'chiliz', symbol: 'chz', name: 'Chiliz', price: 0.085, change24h: 1.2, change7d: -3.5, mcap: 760000000, rank: 47 },
      { id: 'basic-attention-token', symbol: 'bat', name: 'Basic Attention Token', price: 0.28, change24h: 1.8, change7d: -2.8, mcap: 420000000, rank: 48 },
      { id: 'gala', symbol: 'gala', name: 'Gala', price: 0.045, change24h: 2.8, change7d: -1.2, mcap: 1600000000, rank: 49 },
      { id: 'apecoin', symbol: 'ape', name: 'ApeCoin', price: 1.85, change24h: 1.5, change7d: -4.1, mcap: 850000000, rank: 50 }
    ];

    return cryptos.map(crypto => ({
      id: crypto.id,
      symbol: crypto.symbol,
      name: crypto.name,
      current_price: crypto.price,
      price_change_percentage_24h: crypto.change24h,
      price_change_percentage_7d: crypto.change7d,
      market_cap: crypto.mcap,
      market_cap_rank: crypto.rank,
      total_volume: crypto.mcap * 0.1,
      image: `https://assets.coingecko.com/coins/images/${crypto.rank}/large/${crypto.id}.png`,
      last_updated: new Date().toISOString(),
      high_24h: crypto.price * 1.05,
      low_24h: crypto.price * 0.95,
      circulating_supply: crypto.mcap / crypto.price,
      total_supply: crypto.mcap / crypto.price * 1.2,
    }));
  }

  static async getCryptocurrencyById(id: string): Promise<CryptoCurrency> {
    try {
      const response = await fetch(
        `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      );
      
      if (!response.ok) {
        throw new Error(`Error al obtener datos de ${id}`);
      }
      
      const data = await response.json();
      
      return {
        id: data.id,
        symbol: data.symbol,
        name: data.name,
        current_price: data.market_data.current_price.usd,
        price_change_percentage_24h: data.market_data.price_change_percentage_24h || 0,
        price_change_percentage_7d: data.market_data.price_change_percentage_7d || 0,
        market_cap: data.market_data.market_cap.usd,
        market_cap_rank: data.market_cap_rank,
        total_volume: data.market_data.total_volume?.usd || 0,
        image: data.image.large,
        last_updated: data.last_updated,
        high_24h: data.market_data.high_24h?.usd,
        low_24h: data.market_data.low_24h?.usd,
        circulating_supply: data.market_data.circulating_supply,
        total_supply: data.market_data.total_supply,
      };
    } catch (error) {
      console.error(`Error fetching ${id}:`, error);
      throw error;
    }
  }

  static async getHistoricalData(
    coinId: string,
    days: number = 7
  ): Promise<ChartData[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`
      );
      
      if (!response.ok) {
        console.log('🔄 Using fallback chart data...');
        return this.getFallbackChartData(coinId, days);
      }
      
      const data = await response.json();
      
      return data.prices.map(([timestamp, price]: [number, number]) => ({
        timestamp,
        price,
      }));
    } catch (error) {
      console.error('Error fetching historical data:', error);
      console.log('🔄 Using fallback chart data...');
      return this.getFallbackChartData(coinId, days);
    }
  }

  static getFallbackChartData(coinId: string, days: number): ChartData[] {
    console.log(`📈 Generating fallback chart data for ${coinId} (${days} days)`);
    
    // Obtener precio base de los datos de fallback
    const cryptos = [
      { id: 'bitcoin', price: 67500 },
      { id: 'ethereum', price: 3200 },
      { id: 'solana', price: 163.44 },
      { id: 'binancecoin', price: 599.27 },
      { id: 'ripple', price: 2.04 },
      { id: 'tether', price: 0.92 },
      { id: 'usd-coin', price: 0.92 },
      { id: 'dogecoin', price: 0.38 },
      { id: 'cardano', price: 0.89 },
      { id: 'avalanche-2', price: 42.50 }
    ];
    
    const crypto = cryptos.find(c => c.id === coinId);
    const basePrice = crypto ? crypto.price : 100;
    
    const chartData: ChartData[] = [];
    const now = Date.now();
    const interval = days <= 7 ? 3600000 : 86400000; // 1 hora para 7 días, 1 día para más
    
    for (let i = days * (days <= 7 ? 24 : 1); i >= 0; i--) {
      const timestamp = now - (i * interval);
      // Generar variación de precio realista
      const variation = (Math.random() - 0.5) * 0.1; // ±5% variación
      const trendFactor = Math.sin((i / (days * 5)) * Math.PI) * 0.05; // Tendencia suave
      const price = basePrice * (1 + variation + trendFactor);
      
      chartData.push({
        timestamp,
        price: Math.max(price, basePrice * 0.8) // Precio mínimo del 80% del base
      });
    }
    
    return chartData.reverse(); // Orden cronológico
  }

  static async searchCryptocurrencies(query: string): Promise<CryptoCurrency[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/search?query=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) {
        throw new Error('Error en la búsqueda');
      }
      
      const data = await response.json();
      
      // Obtener detalles completos de las primeras 10 monedas encontradas
      const coinIds = data.coins.slice(0, 10).map((coin: any) => coin.id);
      
      if (coinIds.length === 0) return [];
      
      const detailsResponse = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&ids=${coinIds.join(',')}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
      );
      
      if (!detailsResponse.ok) {
        throw new Error('Error al obtener detalles de búsqueda');
      }
      
      return await detailsResponse.json();
    } catch (error) {
      console.error('Error searching cryptocurrencies:', error);
      throw error;
    }
  }

  static async getGlobalMarketStats(): Promise<MarketStats> {
    const cacheKey = 'global-stats';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${BASE_URL}/global`);
      
      if (!response.ok) {
        throw new Error('Error al obtener estadísticas globales');
      }
      
      const data = await response.json();
      const stats = {
        totalMarketCap: data.data.total_market_cap.usd || 0,
        total24hVolume: data.data.total_volume.usd || 0,
        btcDominance: data.data.market_cap_percentage.btc || 0,
        activeCryptocurrencies: data.data.active_cryptocurrencies || 0,
      };

      cache.set(cacheKey, { data: stats, timestamp: Date.now() });
      return stats;
    } catch (error) {
      console.error('Error fetching global stats:', error);
      throw error;
    }
  }

  static async getExchangeRates(): Promise<{ eur: number }> {
    const cacheKey = 'exchange-rates';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${BASE_URL}/simple/price?ids=usd&vs_currencies=eur`);
      
      if (!response.ok) {
        // Fallback rate if API fails
        return { eur: 0.92 };
      }
      
      const data = await response.json();
      const rates = { eur: data.usd?.eur || 0.92 };

      cache.set(cacheKey, { data: rates, timestamp: Date.now() });
      return rates;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      return { eur: 0.92 }; // Fallback
    }
  }

  static clearCache() {
    cache.clear();
  }

  static getCacheSize() {
    return cache.size;
  }
} 