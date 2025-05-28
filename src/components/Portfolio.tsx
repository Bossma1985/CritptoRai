import { useState } from 'react';
import { Wallet, Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { useCryptoStore } from '../store/cryptoStore';
import { formatPrice, formatNumber, getPercentageColor } from '../utils/formatters';
import toast from 'react-hot-toast';

const Portfolio = () => {
  const { 
    selectedCrypto, 
    portfolio, 
    addToPortfolio, 
    removeFromPortfolio,
    settings 
  } = useCryptoStore();
  
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [buyPrice, setBuyPrice] = useState('');

  const handleAddToPortfolio = () => {
    if (!selectedCrypto) {
      toast.error('Selecciona una criptomoneda primero');
      return;
    }

    const qty = parseFloat(amount);
    const price = parseFloat(buyPrice);
    
    if (isNaN(qty) || qty <= 0) {
      toast.error('Introduce una cantidad válida');
      return;
    }
    
    if (isNaN(price) || price <= 0) {
      toast.error('Introduce un precio válido');
      return;
    }

    addToPortfolio(selectedCrypto.id, qty, price);
    toast.success(`${selectedCrypto.name} añadido al portfolio`);
    
    setAmount('');
    setBuyPrice('');
    setShowForm(false);
  };

  const handleRemoveFromPortfolio = (cryptoId: string) => {
    removeFromPortfolio(cryptoId);
    toast.success('Eliminado del portfolio');
  };



  const getTotalValue = () => {
    return portfolio.reduce((total, item) => total + item.currentValue, 0);
  };

  const getTotalProfitLoss = () => {
    return portfolio.reduce((total, item) => total + item.profitLoss, 0);
  };

  const totalValue = getTotalValue();
  const totalProfitLoss = getTotalProfitLoss();
  const totalProfitLossPercentage = totalValue > 0 ? (totalProfitLoss / (totalValue - totalProfitLoss)) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Wallet className="h-5 w-5 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Portfolio
          </h3>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span className="text-sm">Añadir</span>
        </button>
      </div>

      {/* Resumen del Portfolio */}
      {portfolio.length > 0 && (
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Valor Total</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {formatPrice(totalValue, settings.currency)}
              </p>
            </div>
            
            <div className="overflow-hidden">
              <p className="text-sm text-gray-600 dark:text-gray-400">P&L Total</p>
              <div className="flex items-center space-x-1 overflow-hidden">
                {totalProfitLoss >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600 flex-shrink-0" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600 flex-shrink-0" />
                )}
                <div className="flex flex-col min-w-0 flex-1">
                  <span className={`text-lg font-bold ${getPercentageColor(totalProfitLoss)} truncate`}>
                    {formatPrice(Math.abs(totalProfitLoss), settings.currency)}
                  </span>
                  <span className={`text-sm ${getPercentageColor(totalProfitLoss)} truncate`}>
                    ({totalProfitLossPercentage >= 0 ? '+' : ''}{totalProfitLossPercentage.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Criptomoneda
              </label>
              <input
                type="text"
                value={selectedCrypto?.name || 'Selecciona una criptomoneda'}
                disabled
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cantidad
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.00000001"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Precio de compra (USD)
              </label>
              <input
                type="number"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                placeholder={selectedCrypto ? selectedCrypto.current_price.toString() : '0.00'}
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleAddToPortfolio}
                disabled={!selectedCrypto}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Añadir al Portfolio
              </button>
              
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {portfolio.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Tu portfolio está vacío
          </div>
        ) : (
          portfolio.map((item) => (
            <div
              key={item.cryptoId}
              className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white uppercase">
                    {item.symbol}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatNumber(item.amount)} unidades
                  </span>
                </div>
                
                <button
                  onClick={() => handleRemoveFromPortfolio(item.cryptoId)}
                  className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-md transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                                 <div>
                   <p className="text-gray-500 dark:text-gray-400">Precio promedio</p>
                   <p className="font-medium text-gray-900 dark:text-white">
                     {formatPrice(item.averagePrice, settings.currency)}
                   </p>
                 </div>
                 
                 <div>
                   <p className="text-gray-500 dark:text-gray-400">Valor actual</p>
                   <p className="font-medium text-gray-900 dark:text-white">
                     {formatPrice(item.currentValue, settings.currency)}
                   </p>
                 </div>
                 
                 <div>
                   <p className="text-gray-500 dark:text-gray-400">P&L</p>
                   <p className={`font-medium ${getPercentageColor(item.profitLoss)}`}>
                     {formatPrice(Math.abs(item.profitLoss), settings.currency)}
                   </p>
                 </div>
                 
                 <div>
                   <p className="text-gray-500 dark:text-gray-400">% P&L</p>
                   <p className={`font-medium ${getPercentageColor(item.profitLossPercentage)}`}>
                     {item.profitLossPercentage >= 0 ? '+' : ''}{item.profitLossPercentage.toFixed(2)}%
                   </p>
                 </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Portfolio; 