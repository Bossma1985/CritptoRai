import { useCryptoStore } from '../store/cryptoStore';
import { CryptoCurrency } from '../types';
import { formatPrice, formatPercentage, formatMarketCap, getPercentageColor } from '../utils/formatters';
import { Search, Star, StarOff } from 'lucide-react';
import { useState, useMemo } from 'react';

const CryptoList = () => {
  const { 
    cryptocurrencies, 
    selectedCrypto, 
    selectCrypto, 
    isLoading,
    settings 
  } = useCryptoStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem('crypto-favorites') || '[]')
  );

  const filteredCryptos = useMemo(() => {
    return cryptocurrencies.filter(crypto =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cryptocurrencies, searchTerm]);

  const toggleFavorite = (cryptoId: string) => {
    const newFavorites = favorites.includes(cryptoId)
      ? favorites.filter(id => id !== cryptoId)
      : [...favorites, cryptoId];
    
    setFavorites(newFavorites);
    localStorage.setItem('crypto-favorites', JSON.stringify(newFavorites));
  };

  if (isLoading && cryptocurrencies.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Criptomonedas
        </h2>
        <div className="space-y-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Top Criptomonedas
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {filteredCryptos.length} monedas
        </span>
      </div>

      {/* Buscador */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar criptomoneda..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {filteredCryptos.map((crypto: CryptoCurrency) => (
          <div
            key={crypto.id}
            onClick={() => selectCrypto(crypto)}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              selectedCrypto?.id === crypto.id
                ? 'bg-blue-100 dark:bg-blue-900 border-blue-500'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src={crypto.image} 
                  alt={crypto.name}
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(crypto.id);
                  }}
                  className="absolute -top-1 -right-1 p-1"
                >
                  {favorites.includes(crypto.id) ? (
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  ) : (
                    <StarOff className="h-3 w-3 text-gray-400" />
                  )}
                </button>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {crypto.name}
                      </p>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                        #{crypto.market_cap_rank}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                      {crypto.symbol}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatPrice(crypto.current_price, settings.currency)}
                    </p>
                    <div className="flex items-center space-x-1">
                      <p className={`text-xs ${getPercentageColor(crypto.price_change_percentage_24h)}`}>
                        {formatPercentage(crypto.price_change_percentage_24h)}
                      </p>
                      {crypto.price_change_percentage_7d !== undefined && (
                        <p className={`text-xs ${getPercentageColor(crypto.price_change_percentage_7d)}`}>
                          (7d: {formatPercentage(crypto.price_change_percentage_7d)})
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Cap: {formatMarketCap(crypto.market_cap, settings.currency)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoList; 