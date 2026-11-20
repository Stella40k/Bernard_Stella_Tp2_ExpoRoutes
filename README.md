# Comedor IPF — Sistema de Pedidos y Gestión de Cocina
## Trabajo Práctico N° 2 · Expo Router: rutas, navegación, pilas y colas
**Tecnicatura Superior en Desarrollo de Software Multiplataforma**  
**Instituto Politécnico Formosa — Cátedra: Taller Complementario – React Native II**

---

## 1. Árbol de Carpetas (`src/app`) y Navegadores de cada `_layout`

El enrutamiento de la aplicación sigue estrictamente las especificaciones de la consigna G1, implementando navegadores jerárquicos anidados:

```
src/app/
├── _layout.tsx                     <-- [Stack Raíz] Gestiona Tabs, modales, deep links y Stack.Protected
├── +not-found.tsx                  <-- Pantalla 404 para URLs inexistentes
├── buscar.tsx                      <-- /buscar?q=&categoria= (Stack raíz)
├── confirmar.tsx                   <-- /confirmar (Modal del Stack raíz, presentation: "modal")
├── login.tsx                       <-- /login (Modal del Stack raíz, protegido: solo sin sesión)
├── pedido.tsx                      <-- /pedido (Redirección con <Redirect href="/carrito" />)
│
├── (tabs)/                         <-- [Tabs Layout] Barra de navegación inferior
│   ├── _layout.tsx                 <-- Configura las pestañas Inicio, Menú y Carrito (con badge)
│   ├── index.tsx                   <-- / (Pantalla principal con tarjetas de acceso rápido)
│   │
│   ├── menu/                       <-- [Stack Propio de Menú] Mantiene la barra de pestañas visible
│   │   ├── _layout.tsx             <-- Stack anidado para la navegación interna del menú
│   │   ├── index.tsx               <-- /menu (Platos agrupados por categoría)
│   │   └── [id].tsx                <-- /menu/[id] (Detalle con header dinámico y validación de ID)
│   │
│   └── carrito/                    <-- [Stack Propio de Carrito] Mantiene la barra de pestañas visible
│       ├── _layout.tsx             <-- Stack anidado para el carrito y notas
│       ├── index.tsx               <-- /carrito (Lista de ítems, total y botón "Deshacer" con Pila LIFO)
│       └── nota.tsx                <-- /carrito/nota (Aclaración para cocina, presentation: "formSheet")
│
├── categorias/
│   └── [categoria].tsx             <-- /categorias/[categoria] (Stack raíz con validación)
│
├── turno/
│   └── [numero].tsx                <-- /turno/[numero] (Stack raíz: número de turno y cálculo de espera)
│
├── cocina/                         <-- [Drawer Layout] Panel lateral, protegido: solo con sesión
│   ├── _layout.tsx                 <-- Drawer Navigator de Cocina (GestureHandlerRootView)
│   ├── index.tsx                   <-- /cocina (Frente de la cola FIFO y botón "Atender siguiente")
│   └── atendidos.tsx               <-- /cocina/atendidos (Historial en Pila LIFO de pedidos despachados)
│
└── ayuda/
    ├── index.tsx                   <-- /ayuda (Índice de artículos de ayuda)
    └── [...slug].tsx               <-- /ayuda/... (Catch-all comodín para artículos de profundidad variable)
```

### Navegadores implementados en cada `_layout`:
1. `src/app/_layout.tsx`: **Stack Navigator Raíz**. Envuelve toda la aplicación con `GestureHandlerRootView`, `AppProvider` (contexto global), `StatusBar` y maneja las pantallas modales (`confirmar`, `login`), el deep link anchor (`(tabs)`), y la protección declarativa de rutas (`Stack.Protected`).
2. `src/app/(tabs)/_layout.tsx`: **Tabs Navigator**. Maneja las pestañas principales (`Inicio`, `Menú`, `Carrito` con badge dinámico de ítems).
3. `src/app/(tabs)/menu/_layout.tsx`: **Stack Navigator Anidado**. Permite navegar de `/menu` a `/menu/[id]` manteniendo la barra de pestañas inferior visible en todo momento.
4. `src/app/(tabs)/carrito/_layout.tsx`: **Stack Navigator Anidado**. Gestiona el flujo entre la lista del carrito y la nota de cocina modal/hoja inferior (`formSheet`).
5. `src/app/cocina/_layout.tsx`: **Drawer Navigator**. Panel deslizable exclusivo para el personal de cocina con accesos a la cola en espera (`/cocina`) y al historial de despachados (`/cocina/atendidos`).

---

## 2. Justificación Técnica: `replace` vs `push` en la Confirmación

En el flujo de compra, al presionar **"Confirmar y Enviar a Cocina"** en `/confirmar`:
* **Se utilizó:** `router.replace('/turno/' + numeroTurno)`
* **Justificación:**
  Una confirmación de pedido es una operación transaccional no idempotente (desencadena la creación del pedido y su encolamiento correlativo). Si se utilizara `router.push`:
  1. La pantalla `/confirmar` permanecería apilada en el Stack justo debajo de la pantalla de turno.
  2. Si el usuario toca el botón nativo de **"Atrás"** desde la pantalla del turno, el Stack desapilaría y regresaría a `/confirmar`.
  3. Esto generaría confusión, inconsistencia visual (el carrito ya fue vaciado) o el riesgo crítico de que el usuario vuelva a tocar "Confirmar", duplicando la orden y generando comandas repetidas en la cocina.
  Al emplear `router.replace`, la pantalla modal de confirmación es sustituida y destruida de la pila, garantizando que el usuario solo pueda avanzar o volver a la pantalla principal sin re-ejecutar transacciones.

---

## 3. Deep Link de Prueba para Expo Go

Con la app ejecutándose en desarrollo y la máquina conectada a la red local:
* **Deep link oficial de prueba (Plato 7 - Agua Mineral):**
  ```text
  exp://192.168.1.20:8081/--/menu/7
  ```
* **Para una build de producción propia (Standalone/APK):**
  ```text
  comedoripf://menu/7
  ```
* **Comportamiento verificado:**
  Al abrir este enlace, gracias a `export const unstable_settings = { anchor: "(tabs)" }` configurado en `src/app/_layout.tsx`, el enrutador abre directamente el detalle del plato #7 manteniendo construida la jerarquía de pestañas por debajo en la pila.

---

## 4. Credenciales de Acceso a Cocina
* **Usuario:** `cocina` (o `admin`)
* **Contraseña:** `1234`
* Al iniciar sesión con éxito, `Stack.Protected` detecta el cambio de estado (`conSesion = true`), desmonta el modal de login de forma automática y habilita el acceso a la sección `/cocina`. Al cerrar sesión, la sección de cocina desaparece inmediatamente del historial.

---

## 5. Preguntas para la Defensa Oral (G6)

### 1. ¿Qué método usaste para pasar de `/confirmar` a `/turno/[numero]` y qué pasaría si usaras `push`?
Usé `router.replace("/turno/" + numero)`. Si se usara `push`, la pantalla modal de confirmación quedaría almacenada en la pila del Stack por debajo del turno. Al tocar el botón "Atrás", el usuario volvería a la pantalla de confirmación con el carrito ya procesado, pudiendo enviar accidentalmente un pedido duplicado a la cocina. Con `replace`, la pantalla se sobreescribe y se elimina del historial.

### 2. Si la cocina cierra sesión estando en `/cocina/atendidos`, ¿qué ocurre con esa pantalla? ¿Por qué no hace falta llamar a `router.back()`?
Al cerrar sesión, la variable de estado `usuario` pasa a ser `null`, lo que provoca que el guard de `Stack.Protected` asociado a la sección de cocina pase a `false`. Al volverse falso el guard, Expo Router desmonta y remueve inmediatamente todas las pantallas de cocina del árbol de navegación activo, redirigiendo de forma reactiva al usuario fuera de esa zona protegida sin requerir llamadas imperativas a `router.back()`.

### 3. ¿Por qué “Deshacer” usa una pila y no una cola? ¿Y por qué los pedidos usan una cola y no una pila?
* **"Deshacer" en el carrito usa una Pila (LIFO):** Porque la semántica de deshacer exige revertir la acción más reciente agregada; el último plato colocado en el carrito debe ser el primero en ser removido.
* **Los pedidos en cocina usan una Cola (FIFO):** Porque el comedor atiende por estricto orden de llegada y equidad para los comensales; el primer alumno en confirmar su pedido debe ser el primero en recibir su comida en el mostrador. Nadie debe "colarse".

### 4. ¿Qué pasa si alguien abre `comedoripf://menu/999`? ¿Y `comedoripf://no-existe`?
* Si se abre `comedoripf://menu/999`, la pantalla `/menu/[id]` recibe el parámetro `"999"`, ejecuta la validación numérica y la búsqueda en el catálogo `PLATOS`. Al no encontrar el plato, muestra la interfaz de error controlada: *"Plato no encontrado: El plato con identificador 999 no existe en el menú"* con un botón para regresar.
* Si se abre `comedoripf://no-existe`, la URL no coincide con ninguna ruta registrada del file-system, por lo que Expo Router renderiza automáticamente la pantalla especial `+not-found.tsx`, mostrando el código 404, la URL inválida y un botón para volver al Inicio.

### 5. Si tocás “Agregar al carrito” y enseguida el link al carrito, ¿en qué orden se procesan esas acciones de navegación y por qué?
Se procesan en **estricto orden de llegada (FIFO)** porque internamente Expo Router y React Navigation encolan las acciones de navegación en una cola de despacho (`ActionQueue`). Primero se despacha la mutación del estado del carrito y posteriormente se procesa la transición de pantalla al carrito.

### 6. ¿Qué pantalla queda debajo cuando se abre `/categorias/bebidas` desde un deep link? ¿Qué configuración lo decide?
Queda construida debajo la pantalla de **`(tabs)`** (Inicio). La configuración que lo decide es la propiedad `export const unstable_settings = { anchor: "(tabs)" };` definida en el layout raíz `src/app/_layout.tsx`, la cual instruye a Expo Router a montar el navegador de pestañas como ancla de base en la pila.

---

## 6. Capturas de Pantalla y Demostración del Sistema (G5)

| Flujo / Funcionalidad | Descripción |
| :--- | :--- |
| **Carrito y Deshacer (Pila LIFO)** | Muestra la lista de ítems agregados, el cálculo del total y cómo el botón "Deshacer último" desapila el último ítem y se deshabilita cuando la pila queda vacía. |
| **Confirmación y Turno** | Flujo modal `/confirmar`, transición con `router.replace` a `/turno/[numero]`, cálculo de pedidos en cola y tiempo estimado (~3 min por comanda). |
| **Monitor de Cocina (Cola FIFO)** | Muestra el pedido en el frente de la cola, la cantidad total en espera y la acción del botón "Atender siguiente" (desencola en O(1)). |
| **Historial de Atendidos (Pila)** | Sección `/cocina/atendidos` que muestra los pedidos despachados ordenados del tope a la base (el más reciente arriba de todo). |
| **Login y Logout Protegidos** | Modal de autenticación con credenciales fijas (`cocina` / `1234`), cierre automático por guard de `Stack.Protected` y desaparición de cocina al salir. |
| **Manejo de Errores y 404** | Pantalla `+not-found.tsx` atrapando URLs erróneas con link de retorno y componente inspector `¿Dónde estoy?`. |

---

## 7. Instrucciones para Ejecutar el Proyecto

1. Abrir la terminal en la carpeta del proyecto:
   ```bash
   cd comedor_YPF
   ```
2. Instalar dependencias con el comando oficial de Expo:
   ```bash
   npx expo install
   ```
3. Iniciar el servidor de desarrollo:
   ```bash
   npx expo start
   ```
4. Para abrir en el navegador web:
   ```bash
   npx expo start --web
   ```
5. Para probar en un teléfono físico con Expo Go, escanear el código QR que se visualiza en la terminal o presionar `a` para Android Emulator.
