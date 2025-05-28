import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  CryptoCurrency, 
  PriceAlert, 
  Portfolio, 
  ChartData, 
  AppSettings, 
  MarketStats
} from '../types';
import { CryptoApiService } from '../services/cryptoApi';

interface CryptoStore {
  // Estado
  cryptocurrencies: CryptoCurrency[];
  selectedCrypto: CryptoCurrency | null;
  chartData: ChartData[];
  priceAlerts: PriceAlert[];
  portfolio: Portfolio[];
  marketStats: MarketStats | null;
  isLoading: boolean;
  error: string | null;
  chartTimeframe: number;
  settings: AppSettings;

  // Acciones
  fetchCryptocurrencies: () => Promise<void>;
  fetchMarketStats: () => Promise<void>;
  selectCrypto: (crypto: CryptoCurrency) => void;
  fetchChartData: (coinId: string, days: number) => Promise<void>;
  addPriceAlert: (alert: Omit<PriceAlert, 'id' | 'createdAt'>) => void;
  removePriceAlert: (alertId: string) => void;
  updateChartTimeframe: (days: number) => void;
  checkPriceAlerts: () => void;
  addToPortfolio: (cryptoId: string, amount: number, price: number) => void;
  removeFromPortfolio: (cryptoId: string) => void;
  updatePortfolio: () => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  clearCache: () => void;
}

const defaultSettings: AppSettings = {
  currency: 'USD',
  theme: 'auto',
  refreshInterval: 30000,
  notifications: true,
  language: 'es',
};

export const useCryptoStore = create<CryptoStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      cryptocurrencies: [],
      selectedCrypto: null,
      chartData: [],
      priceAlerts: [],
      portfolio: [],
      marketStats: null,
      isLoading: false,
      error: null,
      chartTimeframe: 7,
      settings: defaultSettings,

      // Acciones
      fetchCryptocurrencies: async () => {
        console.log('🚀 Starting fetchCryptocurrencies...');
        set({ isLoading: true, error: null });
        try {
          console.log('📞 Calling CryptoApiService.getTopCryptocurrencies...');
          const data = await CryptoApiService.getTopCryptocurrencies(50);
          console.log('✅ Received data in store:', data.length, 'items');
          set({ cryptocurrencies: data, isLoading: false });
          
          // Actualizar portfolio después de obtener nuevos precios
          get().updatePortfolio();
        } catch (error) {
          console.error('❌ Error in fetchCryptocurrencies:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Error desconocido',
            isLoading: false 
          });
        }
      },

      fetchMarketStats: async () => {
        try {
          const stats = await CryptoApiService.getGlobalMarketStats();
          set({ marketStats: stats });
        } catch (error) {
          console.error('Error fetching market stats:', error);
        }
      },

      selectCrypto: (crypto) => {
        set({ selectedCrypto: crypto });
        get().fetchChartData(crypto.id, get().chartTimeframe);
      },

      fetchChartData: async (coinId, days) => {
        set({ isLoading: true });
        try {
          const data = await CryptoApiService.getHistoricalData(coinId, days);
          set({ chartData: data, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Error al cargar gráfico',
            isLoading: false 
          });
        }
      },

      addPriceAlert: (alert) => {
        const newAlert: PriceAlert = {
          ...alert,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        
        set(state => ({ 
          priceAlerts: [...state.priceAlerts, newAlert] 
        }));
      },

      removePriceAlert: (alertId) => {
        set(state => ({
          priceAlerts: state.priceAlerts.filter(alert => alert.id !== alertId)
        }));
      },

      updateChartTimeframe: (days) => {
        set({ chartTimeframe: days });
        const selectedCrypto = get().selectedCrypto;
        if (selectedCrypto) {
          get().fetchChartData(selectedCrypto.id, days);
        }
      },

      checkPriceAlerts: () => {
        const { priceAlerts, cryptocurrencies, settings } = get();
        
        priceAlerts.forEach(alert => {
          if (!alert.isActive) return;
          
          const crypto = cryptocurrencies.find(c => c.id === alert.cryptoId);
          if (!crypto) return;
          
          let shouldAlert = false;
          let message = '';
          
          switch (alert.alertType) {
            case 'above':
              shouldAlert = crypto.current_price >= alert.targetPrice;
              message = `${crypto.name} está por encima de ${alert.targetPrice}`;
              break;
            case 'below':
              shouldAlert = crypto.current_price <= alert.targetPrice;
              message = `${crypto.name} está por debajo de ${alert.targetPrice}`;
              break;
            case 'percentage_change':
              shouldAlert = Math.abs(crypto.price_change_percentage_24h) >= alert.targetPrice;
              message = `${crypto.name} ha cambiado ${crypto.price_change_percentage_24h.toFixed(2)}%`;
              break;
          }
          
          if (shouldAlert && settings.notifications) {
            // Mostrar notificación
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification(`Alerta de precio: ${crypto.name}`, {
                body: message,
                icon: crypto.image,
              });
            }
            
            // Marcar como disparada
            set(state => ({
              priceAlerts: state.priceAlerts.map(a => 
                a.id === alert.id 
                  ? { ...a, isActive: false, triggeredAt: new Date().toISOString(), message }
                  : a
              )
            }));
          }
        });
      },

      addToPortfolio: (cryptoId, amount, price) => {
        const crypto = get().cryptocurrencies.find(c => c.id === cryptoId);
        if (!crypto) return;
        
        const { settings } = get();
        
        set(state => {
          const existingItem = state.portfolio.find(p => p.cryptoId === cryptoId);
          
          if (existingItem) {
            // Actualizar posición existente
            const totalAmount = existingItem.amount + amount;
            const totalValue = (existingItem.amount * existingItem.averagePrice) + (amount * price);
            const newAveragePrice = totalValue / totalAmount;
            
            return {
              portfolio: state.portfolio.map(p => 
                p.cryptoId === cryptoId 
                  ? { 
                      ...p, 
                      amount: totalAmount, 
                      averagePrice: newAveragePrice,
                      currentValue: totalAmount * crypto.current_price,
                      profitLoss: (crypto.current_price - newAveragePrice) * totalAmount,
                      profitLossPercentage: ((crypto.current_price - newAveragePrice) / newAveragePrice) * 100
                    } 
                  : p
              )
            };
          } else {
            // Nueva posición
            const newItem: Portfolio = {
              cryptoId,
              symbol: crypto.symbol,
              name: crypto.name,
              amount,
              averagePrice: price,
              currentValue: amount * crypto.current_price,
              profitLoss: (crypto.current_price - price) * amount,
              profitLossPercentage: ((crypto.current_price - price) / price) * 100,
              currency: settings.currency,
              addedAt: new Date().toISOString(),
              image: crypto.image,
            };
            
            return { portfolio: [...state.portfolio, newItem] };
          }
        });
      },

      removeFromPortfolio: (cryptoId) => {
        set(state => ({
          portfolio: state.portfolio.filter(p => p.cryptoId !== cryptoId)
        }));
      },

      updatePortfolio: () => {
        const { portfolio, cryptocurrencies } = get();
        
        set({
          portfolio: portfolio.map(item => {
            const crypto = cryptocurrencies.find(c => c.id === item.cryptoId);
            if (!crypto) return item;
            
            const currentValue = item.amount * crypto.current_price;
            const profitLoss = (crypto.current_price - item.averagePrice) * item.amount;
            const profitLossPercentage = ((crypto.current_price - item.averagePrice) / item.averagePrice) * 100;
            
            return {
              ...item,
              currentValue,
              profitLoss,
              profitLossPercentage,
            };
          })
        });
      },

      updateSettings: (newSettings) => {
        set(state => ({ 
          settings: { ...state.settings, ...newSettings } 
        }));
      },

      clearCache: () => {
        CryptoApiService.clearCache();
      },
    }),
    {
      name: 'crypto-store',
      partialize: (state) => ({
        priceAlerts: state.priceAlerts,
        portfolio: state.portfolio,
        settings: state.settings,
        selectedCrypto: state.selectedCrypto,
        chartTimeframe: state.chartTimeframe,
      }),
    }
  )
); 