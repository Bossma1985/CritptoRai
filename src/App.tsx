import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useCryptoStore } from './store/cryptoStore';
import { exchangeRateManager } from './utils/exchangeRates';
import CryptoList from './components/CryptoList';
import CryptoChart from './components/CryptoChart';
import PriceAlerts from './components/PriceAlerts';
import Portfolio from './components/Portfolio';
import Header from './components/Header';

function App() {
  const { 
    fetchCryptocurrencies, 
    fetchMarketStats,
    checkPriceAlerts, 
    updatePortfolio,
    clearCache
  } = useCryptoStore();

  useEffect(() => {
    // Limpiar caché al inicio para forzar datos frescos
    clearCache();
    
    // Cargar datos iniciales
    fetchCryptocurrencies();
    fetchMarketStats();

    // Inicializar tasas de cambio
    exchangeRateManager.getExchangeRate('EUR');

    // Solicitar permisos de notificación
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Actualizar datos cada 30 segundos
    const interval = setInterval(() => {
      fetchCryptocurrencies();
      fetchMarketStats();
      updatePortfolio();
      checkPriceAlerts();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchCryptocurrencies, fetchMarketStats, updatePortfolio, checkPriceAlerts]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Criptomonedas */}
          <div className="lg:col-span-1">
            <CryptoList />
          </div>
          
          {/* Gráfico y Controles */}
          <div className="lg:col-span-2 space-y-8">
            <CryptoChart />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <PriceAlerts />
              <Portfolio />
            </div>
          </div>
        </div>
      </div>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

export default App; 