import { TrendingUp, Bell, Wallet, Globe, DollarSign, Euro } from 'lucide-react';
import { useCryptoStore } from '../store/cryptoStore';
import { formatPrice, formatMarketCap } from '../utils/formatters';
import { useEffect } from 'react';

const Header = () => {
  const { 
    marketStats, 
    priceAlerts, 
    portfolio, 
    settings, 
    updateSettings,
    fetchMarketStats 
  } = useCryptoStore();

  useEffect(() => {
    fetchMarketStats();
  }, [fetchMarketStats]);

  const activeAlerts = priceAlerts.filter(alert => alert.isActive).length;
  const portfolioValue = portfolio.reduce((total, item) => total + item.currentValue, 0);

  const toggleCurrency = () => {
    updateSettings({ 
      currency: settings.currency === 'USD' ? 'EUR' : 'USD' 
    });
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                CryptoTrader Pro
              </h1>
            </div>

            {/* Estadísticas del mercado */}
            {marketStats && (
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">Cap. Global:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatMarketCap(marketStats.totalMarketCap, settings.currency)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 dark:text-gray-400">Vol. 24h:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatMarketCap(marketStats.total24hVolume, settings.currency)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 dark:text-gray-400">BTC Dom:</span>
                  <span className="font-semibold text-orange-600">
                    {marketStats.btcDominance.toFixed(1)}%
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Selector de moneda */}
            <button
              onClick={toggleCurrency}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {settings.currency === 'USD' ? (
                <DollarSign className="h-4 w-4 text-green-600" />
              ) : (
                <Euro className="h-4 w-4 text-blue-600" />
              )}
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {settings.currency}
              </span>
            </button>

            {/* Alertas activas */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <div className="relative">
                <Bell className="h-4 w-4" />
                {activeAlerts > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {activeAlerts}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">
                {activeAlerts} {activeAlerts === 1 ? 'Alerta' : 'Alertas'}
              </span>
            </div>
            
            {/* Portfolio */}
            <div className="flex items-center space-x-2 text-sm">
              <Wallet className="h-4 w-4 text-green-600" />
              <div className="hidden sm:flex flex-col">
                <span className="text-xs text-gray-500 dark:text-gray-400">Portfolio</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatPrice(portfolioValue, settings.currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 