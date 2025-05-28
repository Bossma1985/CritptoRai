# 🚀 CryptoTrader Pro - Versión Optimizada

Una aplicación **ultra-moderna** de trading de criptomonedas construida con las **tecnologías más avanzadas**. Incluye soporte **multi-moneda (USD/EUR)**, datos en tiempo real, gráficos interactivos y un sistema completo de alertas.

## ✨ **Nuevas Características Optimizadas**

### 💱 **Soporte Multi-Moneda**
- **USD y EUR** con tasas de cambio en tiempo real
- Conversión automática de precios y market caps
- Selector de moneda en el header (botón USD/EUR)
- Persistencia de preferencias de moneda

### 📊 **Dashboard Mejorado**
- **Estadísticas globales del mercado** en tiempo real
- Capitalización total, volumen 24h, dominancia BTC
- **Contador de alertas activas** con badge visual
- **Valor total del portfolio** en header

### 🔍 **Búsqueda y Favoritos**
- **Búsqueda en tiempo real** de criptomonedas
- Sistema de **favoritos** con estrellas (⭐)
- Filtrado instantáneo por nombre o símbolo
- Ranking de market cap visible

### 📈 **Gráficos Avanzados**
- Gráficos con **datos de 7 días y cambio porcentual**
- Tooltips mejorados con precios formateados
- Múltiples períodos: 1D, 7D, 30D, 90D, 1Y
- Responsive design optimizado

### 🔔 **Sistema de Alertas Inteligente**
- Alertas por **precio absoluto** (encima/debajo)
- Alertas por **cambio porcentual** 
- **Notificaciones del navegador** nativas
- Historial de alertas disparadas

### 💼 **Portfolio Profesional**
- **P&L automático** con precios actuales
- Precios promedio de compra
- **Resumen total** con ganancias/pérdidas
- Soporte multi-moneda completo

### ⚡ **Rendimiento Optimizado**
- **Sistema de caché inteligente** (30s)
- Tasas de cambio en tiempo real
- **Persistencia con Zustand** 
- Minimización de llamadas API

## 🛠️ **Stack Tecnológico Avanzado**

- **React 18** + **TypeScript** - Base sólida
- **Vite** - Build ultrarrápido
- **Zustand + Persist** - Estado global optimizado
- **Tailwind CSS** - Estilos modernos
- **Recharts** - Gráficos profesionales
- **Lucide React** - Iconografía moderna
- **React Hot Toast** - Notificaciones elegantes
- **CoinGecko API** - Datos fiables y gratuitos

## 🚀 **Instrucciones de Instalación**

### 1. **Clonar y Configurar**
```bash
cd crypto-trading-app
npm install
```

### 2. **Desarrollo**
```bash
npm run dev
```
**URL**: `http://localhost:3000`

### 3. **Producción**
```bash
npm run build
npm run preview
```

## 📱 **Guía de Uso Completa**

### **💱 Cambiar Moneda**
- Haz clic en el botón **USD/EUR** en el header
- Todos los precios se convierten automáticamente
- Las preferencias se guardan

### **🔍 Buscar Criptomonedas**
- Escribe en el buscador de la lista
- Busca por nombre o símbolo (ej: "Bitcoin" o "BTC")
- Marca favoritos con la estrella ⭐

### **📊 Ver Gráficos**
- Haz clic en cualquier criptomoneda
- Cambia períodos con los botones (7D, 30D, etc.)
- Navega por el gráfico para ver detalles

### **🔔 Configurar Alertas**
1. Selecciona una criptomoneda
2. Ve a "Alertas de Precio" → "Nueva"
3. Configura precio objetivo y tipo
4. ¡Recibirás notificaciones!

### **💼 Gestionar Portfolio**
1. Selecciona una criptomoneda
2. Ve a "Portfolio" → "Añadir"
3. Introduce cantidad y precio de compra
4. Ve tu P&L actualizado en tiempo real

## 🎯 **Características Técnicas Avanzadas**

### **🚀 Optimizaciones de Rendimiento**
- **Caché inteligente** para reducir llamadas API
- **Lazy loading** de componentes
- **Debounced search** para búsqueda eficiente
- **Memoización** de cálculos complejos

### **💾 Persistencia de Datos**
- **Zustand Persist** para configuraciones
- **LocalStorage** para favoritos y alertas
- **Recovery automático** al reiniciar

### **🌐 Internacionalización**
- Formatos de fecha en **español**
- Números con separadores locales
- Monedas con símbolos correctos (€/$)

### **📱 Responsive Design**
- **Mobile-first** approach
- Breakpoints optimizados
- **Touch-friendly** en móviles

## 🔧 **Configuraciones Disponibles**

### **⚙️ Settings Store**
```typescript
interface AppSettings {
  currency: 'USD' | 'EUR';        // Moneda preferida
  theme: 'light' | 'dark' | 'auto'; // Tema visual
  refreshInterval: number;         // Intervalo de actualización
  notifications: boolean;          // Habilitar notificaciones
  language: 'es' | 'en';          // Idioma
}
```

### **📊 Market Stats**
- Capitalización global
- Volumen 24h global  
- Dominancia Bitcoin
- Número de criptomonedas activas

## 🎨 **Personalización**

### **Colores del Tema**
- Verde: Ganancias y tendencias positivas
- Rojo: Pérdidas y tendencias negativas
- Azul: Elementos interactivos
- Gris: Información neutral

### **Iconografía**
- 📈 Tendencias alcistas
- 📉 Tendencias bajistas  
- ⭐ Favoritos
- 🔔 Alertas
- 💼 Portfolio

## 🔄 **Actualizaciones Automáticas**

- **Precios**: Cada 30 segundos
- **Market Stats**: Cada 30 segundos  
- **Tasas de Cambio**: Cada 5 minutos
- **Portfolio P&L**: En tiempo real
- **Alertas**: Verificación continua

## 🔒 **Seguridad y Privacidad**

- **No registro** requerido
- **Datos locales** únicamente
- **API sin autenticación** (CoinGecko público)
- **No compartir** información personal

## 🎯 **Roadmap Futuro**

### **Próximas Funcionalidades**
- [ ] **Trading real** con Binance/Coinbase
- [ ] **Más indicadores técnicos** (RSI, MACD)
- [ ] **News feed** de criptomonedas
- [ ] **Alertas por volumen** y momentum
- [ ] **Exportar portfolio** a CSV/PDF
- [ ] **Dark/Light mode** toggle
- [ ] **Más monedas** (GBP, JPY, etc.)
- [ ] **Webhooks** para alertas
- [ ] **API propia** de análisis

### **Mejoras Técnicas**
- [ ] **PWA** (Progressive Web App)
- [ ] **Service Workers** para offline
- [ ] **WebSockets** para datos en tiempo real
- [ ] **AI predictions** con machine learning
- [ ] **Backend propio** con base de datos

## 🐛 **Solución de Problemas**

### **Error: "Cannot connect"**
- Verifica tu conexión a internet
- CoinGecko API podría estar temporalmente caído

### **Notificaciones no funcionan**
- Permite permisos de notificación en el navegador
- Verifica que esté habilitado en configuraciones

### **Datos no se actualizan**
- Refresca la página (F5)
- Limpia caché del navegador

## 🤝 **Contribuir**

1. **Fork** del repositorio
2. **Crea** una rama (`git checkout -b feature/amazing-feature`)
3. **Commit** cambios (`git commit -m 'Add amazing feature'`)
4. **Push** (`git push origin feature/amazing-feature`)
5. **Abre** un Pull Request

## 📄 **Licencia**

Este proyecto está bajo la **Licencia MIT**. 

---

## 🎉 **¡Tu App Está Lista!**

**CryptoTrader Pro** ahora incluye:

✅ **Soporte EUR/USD** con tasas reales  
✅ **Dashboard profesional** con stats globales  
✅ **Búsqueda y favoritos** avanzados  
✅ **Portfolio optimizado** con P&L automático  
✅ **Alertas inteligentes** con notificaciones  
✅ **Rendimiento optimizado** con caché  
✅ **Interfaz moderna** y responsive  

**¡Comienza a explorar el mundo de las criptomonedas! 🚀** 