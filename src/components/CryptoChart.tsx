import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useCryptoStore } from '../store/cryptoStore';
import { formatPrice, formatPercentage, formatDateShort, getPercentageColor } from '../utils/formatters';

const CryptoChart = () => {
  const { 
    selectedCrypto, 
    chartData, 
    chartTimeframe, 
    updateChartTimeframe, 
    isLoading,
    settings 
  } = useCryptoStore();

  const timeframes = [
    { label: '7D', value: 7 },
    { label: '30D', value: 30 },
    { label: '90D', value: 90 },
    { label: '1Y', value: 365 },
  ];

  const formatChartData = () => {
    return chartData.map(point => ({
      date: formatDateShort(point.timestamp),
      price: point.price,
      fullDate: new Date(point.timestamp).toLocaleDateString('es-ES'),
    }));
  };

  if (!selectedCrypto) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400 text-lg">
            Selecciona una criptomoneda para ver su gráfico
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <img 
            src={selectedCrypto.image} 
            alt={selectedCrypto.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {selectedCrypto.name}
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatPrice(selectedCrypto.current_price, settings.currency)}
            </p>
            <p className={`text-sm ${getPercentageColor(selectedCrypto.price_change_percentage_24h)}`}>
              {formatPercentage(selectedCrypto.price_change_percentage_24h)} (24h)
            </p>
          </div>
        </div>

        <div className="flex space-x-2">
          {timeframes.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => updateChartTimeframe(value)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                chartTimeframe === value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-96">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formatChartData()}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="currentColor"
                className="text-gray-600 dark:text-gray-400"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="currentColor"
                className="text-gray-600 dark:text-gray-400"
                tickFormatter={(value) => formatPrice(value, settings.currency)}
              />
              <Tooltip
                formatter={(value: number) => [formatPrice(value, settings.currency), 'Precio']}
                labelFormatter={(label) => `Fecha: ${label}`}
                contentStyle={{
                  backgroundColor: 'rgba(31, 41, 55, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500 dark:text-gray-400">
              No hay datos disponibles para el período seleccionado
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoChart; 