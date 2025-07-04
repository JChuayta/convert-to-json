# Convert to JSON - Dark Theme

Una aplicación web moderna con elegante tema dark para convertir texto a formato JSON. Esta herramienta está diseñada para limpiar y transformar datos JSON complejos en un formato más legible y estructurado, con una interfaz oscura que cuida tus ojos.

## 🌙 Características

- **Tema Dark Elegante** - Interfaz oscura moderna con acentos cyan
- Conversión de texto a JSON formateado
- Limpieza automática de datos JSON
- Copia al portapapeles con un clic
- Interfaz simple y fácil de usar
- Diseño responsivo
- Efectos visuales y animaciones suaves
- Scrollbar personalizada para el tema dark
- **📊 Sistema de Estadísticas Persistente** - Rastrea conversiones y uso

## 📊 Estadísticas

<img src="https://visitor-badge.laobi.icu/badge?page_id=convert-to-json" alt="visitors"/>

### **Métricas que se Rastrean:**
- 🔄 **Conversiones por sesión** - Se resetea al cerrar el navegador
- 🎯 **Total de conversiones** - Persiste entre sesiones y despliegues
- 🕒 **Última actividad** - Timestamp de la última conversión
- 📈 **Estadísticas de visitantes** - Integrado con visitor-badge

## 🛠️ Tecnologías Utilizadas

- React 18
- TypeScript
- Vite
- CSS3 con gradientes y animaciones
- Tema Dark personalizado
- LocalStorage para persistencia de datos

## 🚀 Instalación y Uso

1. Clona el repositorio:
```bash
git clone <tu-repositorio>
cd convert-to-json
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 📝 Uso

1. Pega tu texto JSON en el área de entrada
2. Haz clic en "🔄 Convertir a JSON"
3. El resultado formateado aparecerá en el área de salida
4. Usa "📋 Copiar al Portapapeles" para copiar el resultado
5. Usa "🗑️ Limpiar Todo" para limpiar ambos campos

## 🎨 Paleta de Colores

- **Fondo principal**: `#0f0f23` - `#1a1a2e` - `#16213e`
- **Contenedor**: `#1e1e2e` - `#2d2d44`
- **Acentos**: `#a855f7` (púrpura) - `#3b82f6` (azul)
- **Texto**: `#ffffff` (blanco) - `#b8b8d1` (gris claro)
- **Bordes**: `#3a3a5a` (gris oscuro)
- **Éxito**: `#10b981` (verde suave)

## 📊 Sistema de Estadísticas

Las estadísticas se mantienen automáticamente usando **localStorage**:

- ✅ **Persistencia entre despliegues** - Los datos sobreviven a actualizaciones del sitio
- ✅ **Funciona offline** - No requiere conexión a internet
- ✅ **Rastreo automático** - Se incrementa con cada conversión exitosa
- ✅ **Múltiples métricas** - Conversiones, totales, sesiones y timestamps

Para más detalles sobre el sistema de estadísticas, consulta [STATS.md](./STATS.md).

## 🏗️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la build de producción
- `npm run lint` - Ejecuta el linter
- `npm run deploy` - Despliega a GitHub Pages

## 🚀 Despliegue

El proyecto incluye configuración automática para GitHub Actions:

1. **Push a main** - Despliegue automático a GitHub Pages
2. **Pull Requests** - Preview automático
3. **Estadísticas preservadas** - Los datos se mantienen entre despliegues

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**✨ Disfruta de la experiencia dark mode mientras conviertes tus JSON y rastreas tu progreso!**
