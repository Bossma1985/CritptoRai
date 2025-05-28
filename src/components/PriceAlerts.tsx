import { useState } from 'react';
import { Bell, Plus, Trash2 } from 'lucide-react';
import { useCryptoStore } from '../store/cryptoStore';
import { formatPrice } from '../utils/formatters';
import toast from 'react-hot-toast';

const PriceAlerts = () => {
  const { 
    selectedCrypto, 
    priceAlerts, 
    addPriceAlert, 
    removePriceAlert,
    settings 
  } = useCryptoStore();
  
  const [showForm, setShowForm] = useState(false);
  const [targetPrice, setTargetPrice] = useState('');
  const [alertType, setAlertType] = useState<'above' | 'below'>('above');

  const handleAddAlert = () => {
    if (!selectedCrypto) {
      toast.error('Selecciona una criptomoneda primero');
      return;
    }

    const price = parseFloat(targetPrice);
    if (isNaN(price) || price <= 0) {
      toast.error('Introduce un precio válido');
      return;
    }

    addPriceAlert({
      cryptoId: selectedCrypto.id,
      cryptoName: selectedCrypto.name,
      cryptoSymbol: selectedCrypto.symbol,
      targetPrice: price,
      alertType,
      isActive: true,
      currency: settings.currency,
    });

    toast.success(`Alerta creada para ${selectedCrypto.name}`);
    setTargetPrice('');
    setShowForm(false);
  };

  const handleRemoveAlert = (alertId: string) => {
    removePriceAlert(alertId);
    toast.success('Alerta eliminada');
  };



  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Alertas de Precio
          </h3>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span className="text-sm">Nueva</span>
        </button>
      </div>

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
                Precio objetivo (USD)
              </label>
              <input
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                placeholder="0.00"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo de alerta
              </label>
              <select
                value={alertType}
                onChange={(e) => setAlertType(e.target.value as 'above' | 'below')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="above">Por encima de</option>
                <option value="below">Por debajo de</option>
              </select>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleAddAlert}
                disabled={!selectedCrypto}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Crear Alerta
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
        {priceAlerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No tienes alertas configuradas
          </div>
        ) : (
          priceAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {alert.cryptoName}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    alert.isActive 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
                  }`}>
                    {alert.isActive ? 'Activa' : 'Inactiva'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {alert.alertType === 'above' ? 'Por encima de' : 'Por debajo de'} {formatPrice(alert.targetPrice, alert.currency)}
                </p>
              </div>
              
              <button
                onClick={() => handleRemoveAlert(alert.id)}
                className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-md transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PriceAlerts; 