# Historial de Versiones (Changelog) - Magia de Emojis ✨🦁🍎

## [v1.2.5] - 2026-03-30 🏷️ (Indicador de Versión)

Mejora visual para el seguimiento del despliegue.

### ✨ Nuevas Características
- **Etiqueta de Versión en UI 🏷️**: Añadido un pequeño indicador de versión (v1.2.5) en la pantalla de inicio para confirmar qué versión se está ejecutando desde GitHub. ✨

---

## [v1.2.4] - 2026-03-30 🪄 (Arreglo Multi-Touch)

Optimización de la lógica táctil para una experiencia más fluida. ✨📱

### ✨ Arreglos
- **Corrección de Spawn Exponencial 🪄**: Cambiada la lógica de detección para que solo aparezcan emojis de los dedos que *acaban* de tocar la pantalla (`changedTouches`). Esto evita que al poner 5 dedos se disparen 25 emojis a la vez por error. ¡Ahora es mucho más preciso!

---

## [v1.2.3] - 2026-03-30 🪄 (Corrección de Emojis)

Pequeña corrección para asegurar que la "lluvia de magia" sea perfecta y sin texto extraño. ✨🧈

### ✨ Arreglos
- **Corrección de Emojis Literales 🧈**: Cambiado el texto 'バター' (mantequilla) por su icono correspondiente `🧈`. ¡La magia solo habla en emojis!

---

## [v1.2.2] - 2026-03-30 🪄 (Arreglo Crítico: Botón de Inicio Táctil)

¡La magia ya no tiene barreras! Esta versión rápida corrige un problema que impedía pulsar el botón de inicio en dispositivos móviles tras la implementación del soporte táctil.

### ✨ Arreglos
- **Arreglo del Botón "Empezar Fiesta" 🪄**: Solucionado el bug donde el interceptor de eventos táctiles bloqueaba el botón de inicio en tablets y móviles. ¡Ahora ya puedes entrar a la fiesta a la primera!

## [v1.2.1] - 2026-03-30 📱 (Mejoras Táctiles)

Pequeña actualización de pulido para dispositivos móviles.

### ✨ Arreglos
- **Corrección de "Doble Emoji" 🛠️**: Solucionado el problema donde algunos dispositivos táctiles generaban dos emojis por cada toque debido a eventos duplicados del navegador.

## [v1.2.0] - 2026-03-30 📱 (Soporte Táctil e Interacción Híbrida)

¡La magia llega a las tablets y pantallas táctiles! Esta versión convierte la app en una experiencia sensorial completa, permitiendo usar las manos directamente sobre el cristal.

### ✨ Nuevas Características
- **Soporte Multi-Touch**: ¡Usa todos los dedos! Los emojis ahora brotan exactamente de donde tocas la pantalla. Si usas las dos manos, crearás una lluvia de emojis masiva.
- **Explosión 360° "Fuegos Artificiales"**: Los emojis ya no solo flotan hacia arriba. Ahora salen disparados en todas direcciones (360 grados), creando un efecto de explosión circular mágica.
- **Interacción Híbrida**: El teclado sigue funcionando para lanzar emojis aleatorios, mientras que el ratón o el dedo permiten lanzarlos con puntería.
- **Bloqueo Táctil Pro**: Añadido `touch-action: none` para evitar que el navegador haga zoom o mueva la pantalla mientras el niño juega. Todo se queda en su sitio.
- **Mejora del "Radar"**: Aumentado el radio de repulsión de las estrellas (`180px`) para que el efecto sea más visible bajo los dedos.
- **Limpieza Automática**: Cuando dejas de tocar o el ratón sale de la pantalla, las estrellas vuelven suavemente a su posición natural.

### 🔧 Mejoras Técnicas
- Refactorización de la función `spawnEmoji` para soportar coordenadas externas.
- Implementación de listeners pasivos para mayor rendimiento en scroll-blocking.
- Corrección de bugs en la detección de teclas de sistema.

---

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
