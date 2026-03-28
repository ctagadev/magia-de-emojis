# Historial de Versiones (Changelog) - Magia de Emojis ✨🦁🍎

## [v1.1.0] - 2026-03-28 🚀 (Mejoras de Rendimiento y Dinamismo)

¡La magia ahora es más robusta y visualmente espectacular! Esta versión se enfoca en optimizar la experiencia para que los peques puedan interactuar de forma intensa sin que el navegador sufra.

### ✨ Nuevas Características
- **Explosión Dinámica**: ¡Los emojis ya no solo flotan hacia arriba! Ahora salen disparados en ángulos y rotaciones aleatorias, creando un efecto de "fiesta" mucho más real.
- **Rendimiento Inteligente**: Límite de **50 emojis activos** simultáneamente. Ideal para proteger el rendimiento en móviles y tablets, o para cuando el peque aporrea el teclado con mucha energía. 🎹💥
- **Estabilidad de Redimensionado**: Implementado un sistema de *debounce* (espera inteligente) al cambiar el tamaño de la ventana para que las estrellas no se vuelvan locas.
- **Accesibilidad (A11y)**: Añadido soporte para `aria-live` en el contenedor de emojis.

### 🔧 Mejoras Técnicas
- Optimización del bucle de animación.
- Uso de variables CSS para mayor fluidez visual.
- Limpieza de código en los listeners de teclado.

---

## [v1.0.0] - 2026-03-28 ✨ (Versión Inicial)
- Lanzamiento inicial con estrellas interactivas (efecto repulsión).
- Catálogo de emojis de comida, animales y naturaleza.
- Sonidos de "pop" mediante Web Audio API.
- Modo pantalla completa con protección de teclas de sistema (Windows, F-keys).
