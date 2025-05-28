# 🚀 CryptoTrader Pro - Aplicación de Trading de Criptomonedas

Una aplicación web **completamente funcional** para seguimiento y análisis de criptomonedas, construida con React + TypeScript + Vite.

## ✨ Funcionalidades Principales

### 📊 **Dashboard Inteligente**
- **Estadísticas globales** del mercado crypto en tiempo real
- **Capitalización total** del mercado
- **Volumen de trading 24h** 
- **Dominancia de Bitcoin** en porcentaje
- **Contador de alertas activas**
- **Valor total del portfolio** en el header

### 💱 **Soporte Multi-Moneda**
- **USD y EUR** con conversión automática
- **Tasas de cambio en tiempo real** 
- **Botón selector** USD/EUR en el header
- **Persistencia** de preferencias de moneda
- **Formateo automático** de precios y capitalización

### 🔍 **Lista de Criptomonedas (50 principales)**
- **Top 50 criptomonedas** por capitalización de mercado
- **Búsqueda en tiempo real** por nombre o símbolo
- **Sistema de favoritos** con estrellas (⭐)
- **Información completa**: precio, cambio 24h/7d, volumen, market cap
- **Ranking visible** por capitalización

### 📈 **Gráficos Interactivos**
- **Históricos de precios** con datos reales
- **Múltiples períodos**: 7D, 30D, 90D, 1Y
- **Tooltips informativos** con precios formateados
- **Sistema de fallback** si la API externa falla
- **Datos generados dinámicamente** para máxima disponibilidad

### 🔔 **Sistema de Alertas Avanzado**
- **Alertas por precio absoluto** (encima/debajo de X)
- **Notificaciones del navegador** nativas
- **Gestión completa** de alertas (crear/eliminar)
- **Verificación automática** cada 30 segundos
- **Contador visual** en el header

### 💼 **Portfolio Virtual Profesional**
- **Seguimiento de inversiones** con precios actuales
- **Cálculo automático de P&L** (ganancias/pérdidas)
- **Precios promedio** de compra
- **Resumen total** con porcentaje de ganancia
- **Soporte multi-moneda** completo

## 🛠️ Tecnologías y Arquitectura

### **Frontend**
- **React 18** con TypeScript para type safety
- **Vite** como build tool ultrarrápido
- **Tailwind CSS** para estilos modernos y responsive
- **Zustand** para gestión de estado global con persistencia
- **Recharts** para gráficos interactivos profesionales
- **Lucide React** para iconografía moderna

### **APIs y Datos**
- **CoinGecko API** como fuente principal (gratuita)
- **Sistema de caché inteligente** (30 segundos)
- **Datos de fallback** para 50 criptomonedas principales
- **Tasas de cambio** EUR/USD en tiempo real
- **Generación dinámica** de gráficos históricos

### **Optimizaciones de Rendimiento**
- **Caché de API calls** para reducir solicitudes
- **Persistencia local** con Zustand Persist
- **Datos de fallback** para máxima disponibilidad
- **Formateo inteligente** de números y fechas
- **Hot Module Replacement** para desarrollo

## 🚀 Instalación y Ejecución

### **Requisitos**
- Node.js 18+ 
- npm o yarn
- Navegador moderno con soporte para notificaciones

### **Pasos de instalación**
```bash
# 1. Clonar el repositorio
git clone https://github.com/Bossma1985/CriptoRai.git
cd CriptoRai

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:3000
```

### **Build para producción**
```bash
npm run build
npm run preview
```

## 📱 Guía de Uso Completa

### **💱 Cambiar Moneda**
1. Localiza el botón **USD/EUR** en el header superior
2. Haz clic para alternar entre monedas
3. Todos los precios se convierten automáticamente
4. La preferencia se guarda localmente

### **🔍 Buscar Criptomonedas**
1. Usa el campo de búsqueda en la lista de criptos
2. Escribe nombre completo o símbolo (ej: "Bitcoin" o "BTC")
3. Los resultados se filtran en tiempo real
4. Haz clic en la ⭐ para marcar favoritos

### **📊 Ver Gráficos Detallados**
1. Haz clic en cualquier criptomoneda de la lista
2. Se muestra el gráfico con datos históricos
3. Cambia el período con los botones: 7D, 30D, 90D, 1Y
4. Navega por el gráfico para ver precios específicos

### **🔔 Configurar Alertas de Precio**
1. Selecciona una criptomoneda
2. Ve a la sección "Alertas de Precio"
3. Haz clic en "Nueva" para crear una alerta
4. Configura el precio objetivo y tipo (encima/debajo)
5. Permite notificaciones del navegador cuando se solicite
6. ¡Recibirás notificaciones cuando se active!

### **💼 Gestionar Portfolio**
1. Selecciona una criptomoneda
2. Ve a la sección "Portfolio"  
3. Haz clic en "Añadir" para agregar una posición
4. Introduce la cantidad y precio de compra
5. Ve tu P&L actualizado automáticamente en tiempo real
6. El valor total aparece en el header

## 🎯 Características Técnicas Destacadas

### **🚀 Sistema de Fallback Inteligente**
La aplicación **siempre funciona**, incluso si:
- La API de CoinGecko está caída
- Hay problemas de conectividad
- Se exceden los límites de API

**¿Cómo?** Con datos de fallback para 50 criptomonedas principales y generación dinámica de gráficos históricos realistas.

### **💾 Persistencia Completa**
- **Favoritos**: Se guardan localmente
- **Alertas**: Persisten entre sesiones
- **Portfolio**: Datos seguros en localStorage
- **Configuraciones**: Moneda preferida guardada
- **Caché**: Optimización automática de llamadas API

### **🌐 Internacionalización**
- **Formatos de fecha** en español
- **Separadores de miles** localizados
- **Símbolos de moneda** correctos (€/$)
- **Textos** en español

### **📱 Diseño Responsive**
- **Mobile-first** approach
- **Breakpoints** optimizados para todos los dispositivos
- **Touch-friendly** en móviles y tablets
- **Iconografía** consistente y moderna

## 🔧 Configuración Avanzada

### **Variables de Entorno (Opcional)**
```env
# Para más límites de API (versión Pro)
VITE_COINGECKO_API_KEY=tu_api_key_aqui
```

### **Personalización de Datos**
Para añadir más criptomonedas al fallback, edita:
```typescript
// src/services/cryptoApi.ts
getFallbackData(): CryptoCurrency[] {
  // Añade más cryptos aquí
}
```

### **Personalización de Estilos**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Personaliza colores aquí
      }
    }
  }
}
```

## 📊 Datos y APIs

### **Fuentes de Datos**
- **CoinGecko API** (gratuita, sin autenticación)
- **Exchange Rates API** para conversión EUR/USD
- **Datos de fallback** para máxima disponibilidad

### **Frecuencia de Actualización**
- **Precios**: Cada 30 segundos (con caché)
- **Market Stats**: Cada 30 segundos
- **Tasas de Cambio**: Cada 5 minutos
- **Portfolio P&L**: Tiempo real
- **Verificación de Alertas**: Cada 30 segundos

### **Estructura de Datos**
```typescript
interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  market_cap: number;
  market_cap_rank: number;
  // ... más propiedades
}
```

## 🎨 Interfaz de Usuario

### **Paleta de Colores**
- **Verde**: Ganancias y tendencias positivas
- **Rojo**: Pérdidas y tendencias negativas  
- **Azul**: Elementos interactivos y botones
- **Gris**: Información neutral y backgrounds
- **Dorado**: Favoritos y elementos destacados

### **Iconografía**
- 📈 **Tendencias alcistas**
- 📉 **Tendencias bajistas**
- ⭐ **Favoritos**
- 🔔 **Alertas**
- 💼 **Portfolio**
- 💱 **Cambio de moneda**
- 🔍 **Búsqueda**

## 🔒 Seguridad y Privacidad

- ✅ **Sin registro** requerido
- ✅ **Datos almacenados localmente** únicamente
- ✅ **No se comparte** información personal
- ✅ **API pública** sin autenticación sensible
- ✅ **Código abierto** y transparente

## 🐛 Solución de Problemas

### **No aparecen datos de criptomonedas**
- **Solución**: La app usa datos de fallback automáticamente
- **Verifica**: Consola del navegador para logs detallados

### **Notificaciones no funcionan**
- **Causa**: Permisos del navegador
- **Solución**: Permitir notificaciones cuando se solicite

### **Error de CORS**
- **Solución**: Los datos de fallback se activan automáticamente
- **Información**: Es normal con algunas APIs externas

### **Datos no se actualizan**
- **Solución 1**: Refrescar la página (F5)
- **Solución 2**: Limpiar caché del navegador
- **Información**: El caché se renueva cada 30 segundos

## 📈 Funcionalidades Futuras

### **Próximas Mejoras**
- [ ] **Trading real** con APIs de exchanges
- [ ] **Más indicadores técnicos** (RSI, MACD, Bollinger Bands)
- [ ] **News feed** de noticias crypto
- [ ] **Alertas por volumen** y momentum
- [ ] **Exportar portfolio** a CSV/PDF
- [ ] **Modo oscuro/claro** toggle
- [ ] **Más monedas** (GBP, JPY, CAD)
- [ ] **PWA** (Progressive Web App)
- [ ] **Webhooks** para alertas avanzadas

## 🤝 Contribuir al Proyecto

1. **Fork** el repositorio
2. **Crea** una rama nueva (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Abre** un Pull Request

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT** - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Créditos y Agradecimientos

- **[CoinGecko](https://coingecko.com)** - API de datos de criptomonedas
- **[Lucide](https://lucide.dev)** - Biblioteca de iconos moderna
- **[Tailwind CSS](https://tailwindcss.com)** - Framework CSS utility-first
- **[Recharts](https://recharts.org)** - Biblioteca de gráficos para React
- **[Zustand](https://github.com/pmndrs/zustand)** - Gestión de estado minimalista

---

## 🎉 ¡Tu Aplicación Está Lista!

**CryptoTrader Pro** es una aplicación **completamente funcional** que incluye:

✅ **50 criptomonedas** principales con datos actualizados  
✅ **Gráficos interactivos** con múltiples períodos  
✅ **Soporte EUR/USD** con conversión automática  
✅ **Sistema de alertas** con notificaciones nativas  
✅ **Portfolio profesional** con P&L en tiempo real  
✅ **Búsqueda y favoritos** avanzados  
✅ **Datos de fallback** para máxima disponibilidad  
✅ **Interfaz moderna** y completamente responsive  

### 🚀 **¡Comienza a explorar el mundo crypto ahora mismo!**

```bash
npm run dev
# ¡Abre http://localhost:3000 y disfruta!
``` 