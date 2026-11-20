# Instituto Politécnico Formosa
## Tecnicatura Superior en Desarrollo de Software Multiplataforma
### Taller Complementario – React Native II
#### Trabajo Práctico N° 2 — Expo Router: rutas, navegación, pilas y colas

---

## Parte A · Estructuras de datos: la pila y la cola

### A1. Conceptos
**a) ¿Qué significan LIFO y FIFO? ¿Cuál corresponde a la pila y cuál a la cola?**
* **LIFO (*Last In, First Out* / Último en entrar, primero en salir):** El último elemento que ingresa a la estructura es obligatoriamente el primer elemento en ser retirado. Corresponde a la **Pila** (*Stack*).
* **FIFO (*First In, First Out* / Primero en entrar, primero en salir):** El primer elemento que ingresa a la estructura es obligatoriamente el primero en ser procesado o retirado, respetando el orden estricto de llegada. Corresponde a la **Cola** (*Queue*).

**b) ¿Por qué extremo entra y por qué extremo sale un elemento en cada estructura?**
* **Pila (LIFO):** Los elementos entran y salen por el **mismo extremo**, denominado **tope** (*top*). La base permanece fija.
* **Cola (FIFO):** Los elementos entran por un extremo denominado **final** o **cola** (*rear* / *back* / *tail*) y salen por el extremo opuesto denominado **frente** o **cabeza** (*front* / *head*).

**c) Dá un ejemplo de la vida real y otro de una aplicación móvil para cada una.**
* **Pila (Stack):**
  * *Vida real:* Una pila de platos en un restaurante o una pila de libros sobre una mesa (el último que se apila arriba es el primero que se levanta).
  * *App móvil:* El historial de navegación de un Stack de pantallas (al entrar en detalles de un producto se apila la pantalla; al tocar el botón nativo de "Atrás", se desapila la pantalla actual del tope volviendo a la anterior). También la función "Deshacer" (*Undo*) del carrito o de un editor de texto.
* **Cola (Queue):**
  * *Vida real:* La fila de clientes en la caja de un supermercado o el dispenser de turnos en un banco (el primero que llega saca turno y es atendido primero).
  * *App móvil:* La cola de pedidos de un restaurante/cocina (los pedidos confirmados entran a la cola y los cocineros los van despachando en orden de llegada). Otro ejemplo es la cola de subida de imágenes o sincronización en segundo plano (*Background Sync Queue*).

---

### A2. Seguimiento de una pila
Código bajo análisis:
```javascript
const p = new Pila();
p.push('Inicio');      // Pila: ['Inicio'] (tope: 'Inicio')
p.push('Productos');   // Pila: ['Inicio', 'Productos'] (tope: 'Productos')
p.push('Detalle 3');   // Pila: ['Inicio', 'Productos', 'Detalle 3'] (tope: 'Detalle 3')
p.pop();               // Extrae 'Detalle 3'. Pila: ['Inicio', 'Productos']
p.push('Perfil');      // Pila: ['Inicio', 'Productos', 'Perfil'] (tope: 'Perfil')
console.log(p.tope()); // (1)
console.log(p.pop());  // (2)
console.log(p.tope()); // (3)
console.log(p.vacia);  // (4)
```

* **Salida de cada `console.log`:**
  * **(1)** `p.tope()` $\rightarrow$ Imprime: `'Perfil'` *(observa el elemento en el tope sin modificar la pila)*.
  * **(2)** `p.pop()` $\rightarrow$ Imprime: `'Perfil'` *(desapila y devuelve el elemento del tope; la pila queda con `['Inicio', 'Productos']`)*.
  * **(3)** `p.tope()` $\rightarrow$ Imprime: `'Productos'` *(el nuevo tope actual tras haber extraído 'Perfil')*.
  * **(4)** `p.vacia` $\rightarrow$ Imprime: `false` *(la pila aún contiene 2 elementos: 'Inicio' y 'Productos', por ende no está vacía)*.

* **Estado de la pila al final (de base a tope):**
  `['Inicio', 'Productos']` *(Base: 'Inicio' — Tope: 'Productos')*.

---

### A3. Seguimiento de una cola
Código bajo análisis:
```javascript
const c = new Cola();
c.encolar('Ana');      // Cola: ['Ana'] (frente: 'Ana')
c.encolar('Beto');     // Cola: ['Ana', 'Beto'] (frente: 'Ana')
c.desencolar();        // Desencola 'Ana'. Cola: ['Beto'] (frente: 'Beto')
c.encolar('Caro');     // Cola: ['Beto', 'Caro']
c.encolar('Dani');     // Cola: ['Beto', 'Caro', 'Dani']
console.log(c.frente());       // (1)
console.log(c.desencolar());   // (2)
console.log(c.vacia);          // (3)
```

* **Salida de cada `console.log`:**
  * **(1)** `c.frente()` $\rightarrow$ Imprime: `'Beto'` *(consulta el elemento que está a la cabeza de la fila sin extraerlo)*.
  * **(2)** `c.desencolar()` $\rightarrow$ Imprime: `'Beto'` *(extrae y devuelve el elemento del frente; la cola queda con `['Caro', 'Dani']`)*.
  * **(3)** `c.vacia` $\rightarrow$ Imprime: `false` *(la cola tiene 2 personas en espera: 'Caro' y 'Dani', por ende no está vacía)*.

* **Estado de la cola al final (de frente a final):**
  `['Caro', 'Dani']` *(Frente: 'Caro' — Final: 'Dani')*.

---

### A4. Análisis de la implementación
**a) En las clases de clase, el array se declara como `#items`. ¿Qué significa el `#` y qué problema evita?**
* **Significado:** El prefijo `#` es la sintaxis nativa de JavaScript moderno (ES2022+) para definir **campos privados de clase** (*private class fields*). A diferencia del modificador `private` de TypeScript (que sólo chequea tipos en compilación y desaparece en runtime) o la convención cosmética `_items`, `#` garantiza privacidad y encapsulamiento estricto a nivel de motor de ejecución (V8 / Hermes).
* **Problema que evita:** Evita que código externo acceda, altere o corrompa arbitrariamente la estructura interna (por ejemplo ejecutando `p.#items.splice(...)` o `p.#items = []`), forzando a que las únicas operaciones posibles sean las expuestas por los métodos públicos contractuales (`push`, `pop`, `encolar`, `desencolar`), protegiendo los principios LIFO y FIFO.

**b) La cola usa `array.shift()` para desencolar. ¿Qué problema de rendimiento tiene con colas muy grandes? ¿Cómo lo resuelven las colas “serias”?**
* **Problema de rendimiento:** `array.shift()` extrae el elemento en el índice `0` del arreglo y obliga al motor a reindexar y desplazar los $N-1$ elementos restantes una posición a la izquierda en memoria continua. Esto tiene una complejidad algorítmica de **$O(N)$**. Si la cola tiene $100.000$ elementos, desencolar implica $100.000$ desplazamientos en cada operación, degradando severamente los FPS y la CPU.
* **Cómo lo resuelven las colas "serias":**
  1. **Puntero o índice de frente (`#frente`):** En lugar de mover el arreglo, se mantiene un índice que avanza en **$O(1)$** al desencolar, aplicando opcionalmente compactación periódica o buffer circular.
  2. **Lista enlazada (*Linked List*):** Implementando nodos con punteros al `siguiente`, donde desencolar de la cabeza y encolar en la cola toma tiempo constante **$O(1)$** sin recolocación de memoria.

**c) ¿Qué método de array usa la pila para sacar y cuál usa la cola? ¿Por qué no pueden usar el mismo?**
* **Métodos utilizados:** La Pila usa `pop()` (saca del final del array) y la Cola usa `shift()` (saca del principio del array).
* **Por qué no pueden usar el mismo:** Porque la Pila inserta y extrae por el mismo extremo (el final del arreglo, donde `push` y `pop` son ambos $O(1)$). La Cola, en cambio, debe extraer obligatoriamente por el extremo opuesto al de inserción para cumplir el principio FIFO (el primero que entró). Si la cola utilizara `pop()`, extraería el último que entró, mutando su comportamiento a LIFO (una pila) y rompiendo el orden de llegada.

---

### A5. Programación: una cola eficiente
Implementación en JavaScript de la clase `ColaEficiente` sin `shift()`, con campo privado para el índice del frente:

```javascript
export class ColaEficiente {
  #items = [];
  #frente = 0;

  // Encola al final en O(1)
  encolar(x) {
    this.#items.push(x);
  }

  // Desencola del frente en O(1) avanzando el puntero
  desencolar() {
    if (this.vacia) return undefined;
    const elemento = this.#items[this.#frente];
    this.#items[this.#frente] = undefined; // Permite recolectar basura
    this.#frente++;

    // Compactación opcional cuando el puntero avanza demasiado
    if (this.#frente > 50 && this.#frente * 2 >= this.#items.length) {
      this.#items = this.#items.slice(this.#frente);
      this.#frente = 0;
    }

    return elemento;
  }

  // Consulta el elemento del frente sin extraerlo en O(1)
  frente() {
    if (this.vacia) return undefined;
    return this.#items[this.#frente];
  }

  // Getter de verificación de vaciado
  get vacia() {
    return this.tamanio === 0;
  }

  // Getter de tamaño efectivo de la cola
  get tamanio() {
    return this.#items.length - this.#frente;
  }

  // Copia del contenido en cola en formato Array tradicional
  aArray() {
    return this.#items.slice(this.#frente).filter((item) => item !== undefined);
  }
}
```

---

### A6. Pila y cola dentro de Expo Router
**a) ¿Qué estructura describe el historial de pantallas de un Stack? ¿Qué pantalla es la visible y qué operación hace “atrás”?**
* La estructura es una **Pila (*Stack* / LIFO)**.
* La pantalla visible es siempre la que reside en el **tope de la pila** (*top*).
* La operación "Atrás" ejecuta un **`pop()`**: extrae y destruye la pantalla visible del tope, dejando visible la pantalla que estaba inmediatamente por debajo.

**b) ¿Qué estructura usa Expo Router para las acciones de navegación? ¿Qué pasa si el usuario toca dos links muy rápido?**
* Utiliza una **Cola (*Queue* / FIFO)** de despachos de navegación (*ActionQueue*).
* Si el usuario toca dos enlaces rápidamente, ambas intenciones de navegación se encolan y se procesan de manera secuencial, una tras otra, en estricto orden de llegada (FIFO). Esto previene inconsistencias de estado, carreras de concurrencia y transiciones de pantalla superpuestas.

---

## Parte B · Rutas basadas en archivos

### B1. Del archivo a la URL
| Archivo | URL que genera / función |
| :--- | :--- |
| `src/app/(tabs)/index.tsx` | URL: `/` (La carpeta `(tabs)` es un Route Group que no suma segmentos a la URL, e `index.tsx` mapea a la raíz). |
| `src/app/acerca.tsx` | URL: `/acerca` (Ruta estática que muestra la pantalla Acerca de). |
| `src/app/(tabs)/perfil.tsx` | URL: `/perfil` (Pantalla de perfil contenida dentro del grupo visual de pestañas). |
| `src/app/(tabs)/productos/index.tsx` | URL: `/productos` (Listado principal de productos). |
| `src/app/(tabs)/productos/[id].tsx` | URL dinámica: `/productos/:id` (ej. `/productos/42`, capturando el id como parámetro dinámico). |
| `src/app/docs/[...slug].tsx` | URL comodín: `/docs/*` (Catch-all route: captura cualquier profundidad de subsegmentos como `/docs/react` o `/docs/react/hooks/useState`). |
| `src/app/_layout.tsx` | Función: No genera una pantalla visitable. Es el layout raíz que define la estructura envolvente común (Stack, contexto global, tema, header) de todas las rutas hijas. |
| `src/app/+not-found.tsx` | Función: Pantalla 404 especial. Se renderiza automáticamente cuando la URL no coincide con ninguna ruta válida definida en la aplicación. |
| `src/app/Boton.tsx` | **Genera un problema:** Expo Router interpreta cualquier archivo sin prefijo especial (`_` o `+`) como una pantalla visitable en `/Boton`. Los componentes auxiliares reutilizables deben residir en `src/components/`, nunca en `src/app/`. |

---

### B2. De la URL al archivo
| URL | Archivo (ruta completa dentro de `src/app`) |
| :--- | :--- |
| `/categorias/bebidas` (y cualquier otra categoría) | `src/app/categorias/[categoria].tsx` |
| `/buscar?q=mate&categoria=kiosco` | `src/app/buscar.tsx` *(los query params no van en el nombre del archivo)* |
| `/ayuda/pagos/tarjeta` y `/ayuda/horarios` | `src/app/ayuda/[...slug].tsx` *(catch-all de profundidad variable)* |
| `/ayuda` (con una pantalla propia) | `src/app/ayuda/index.tsx` |

---

### B3. Verdadero o falso
* **a) Con Expo Router, cada pantalla nueva se debe registrar en una tabla de configuración.**
  * **FALSO.** Expo Router utiliza enrutamiento basado en archivos (*file-based routing*). Crear un archivo dentro de `src/app` genera y registra la ruta automáticamente.
* **b) Los archivos `_layout.tsx` son pantallas que el usuario puede visitar.**
  * **FALSO.** Los archivos `_layout.tsx` son componentes contenedores (*wrappers*) que configuran navegadores (Stack, Tabs, Drawer) o Providers y renderizan a las pantallas hijas a través de `<Slot />` o `<Stack />`. No son URLs navegables.
* **c) Una carpeta entre paréntesis, como `(tabs)`, no aparece en la URL.**
  * **VERDADERO.** Los paréntesis definen un *Route Group*, el cual permite organizar layouts y pantallas lógicamente sin agregar su nombre como segmento en la URL.
* **d) Para agregar una librería conviene usar `npm install`, porque siempre trae la última versión.**
  * **FALSO.** En proyectos de Expo debe utilizarse `npx expo install`, ya que este comando consulta la matriz de compatibilidad oficial del SDK de Expo en uso e instala la versión exacta compatible con el runtime de React Native y Expo Go, evitando conflictos de dependencias.
* **e) En `package.json`, `"main": "expo-router/entry"` reemplaza al viejo `App.tsx`.**
  * **VERDADERO.** Define el punto de entrada oficial de Expo Router para iniciar el enrutador universal.
* **f) La ruta `/_sitemap` lista todas las rutas de la app y sirve para depurar.**
  * **VERDADERO.** Expo Router provee internamente la ruta `/_sitemap` en entornos de desarrollo para inspeccionar el árbol completo de rutas detectadas.
* **g) Si existen `docs/index.tsx` y `docs/[...slug].tsx`, la URL `/docs` muestra `docs/index.tsx`.**
  * **VERDADERO.** Expo Router aplica precedencia de rutas: las rutas estáticas e índices exactos tienen mayor prioridad que los comodines catch-all dinámicos.
* **h) En SDK 57, `expo-router` usa el mismo número de versión mayor que el SDK (57).**
  * **VERDADERO / ENFOQUE SDK 57.** En Expo SDK 57, Expo consolidó el esquema de versionado para alinear los paquetes núcleo (`expo-router: ~57.0.x`), facilitando la coherencia de dependencias entre el SDK y sus librerías satélite.

---

## Parte C · Navegar: `<Link>`, router y la pila

### C1. Métodos de router
| Método | Qué le hace a la pila |
| :--- | :--- |
| `router.push(href)` | Apila (*push*) una nueva pantalla en el tope de la pila, superponiéndola sobre la actual. |
| `router.navigate(href)` | Navega a la ruta: si la pantalla ya existe previamente en la pila, retrocede hacia ella desapilando las intermedias; si no existe, la apila en el tope. |
| `router.replace(href)` | Reemplaza la pantalla actual en el tope de la pila por la nueva ruta, destruyendo la pantalla anterior sin aumentar la altura de la pila. |
| `router.back()` | Desapila (*pop*) la pantalla del tope de la pila, volviendo a la pantalla inmediata anterior. |
| `router.dismissTo(href)` | Cierra y desapila pantallas modales o pantallas intermedias retrocediendo de un solo salto hasta la ruta destino especificada. |
| `router.dismissAll()` | Desapila y cierra todas las pantallas modales activas, retornando a la raíz del stack. |
| `router.canGoBack()` | No altera la pila; consulta si la pila tiene más de un elemento y es posible retroceder (retorna `true` o `false`). |
| `router.setParams({...})` | No altera la estructura de la pila (no agrega ni quita pantallas); actualiza los parámetros de búsqueda (*query params*) de la pantalla que está en el tope. |

---

### C2. Simulación de la pila
Estado inicial: `[ /productos ]`

| # | Instrucción | Pila resultante (de base a tope) |
| :---: | :--- | :--- |
| **1** | `router.push("/productos/1")` | `[ /productos, /productos/1 ]` |
| **2** | `router.push("/productos/2")` | `[ /productos, /productos/1, /productos/2 ]` |
| **3** | `router.navigate("/productos/5")` | `[ /productos, /productos/1, /productos/2, /productos/5 ]` |
| **4** | `router.push("/perfil")` | `[ /productos, /productos/1, /productos/2, /productos/5, /perfil ]` |
| **5** | `router.replace("/buscar")` | `[ /productos, /productos/1, /productos/2, /productos/5, /buscar ]` |
| **6** | `router.back()` | `[ /productos, /productos/1, /productos/2, /productos/5 ]` |
| **7** | `router.dismissTo("/productos")` | `[ /productos ]` |
| **8** | `router.canGoBack()` $\rightarrow$ ¿qué devuelve? | **`false`** *(sólo queda la pantalla raíz `/productos`, no hay pantallas previas a las cuales retroceder)* |

---

### C3. ¿Link o router?
* **a) El usuario toca la tarjeta de un producto en una lista:**
  * **Uso:** `<Link href="/menu/123">`.
  * *Justificación:* Es una acción de navegación declarativa activada directamente por un toque de usuario en un componente visual estático. Garantiza accesibilidad y pre-renderizado.
* **b) Se guarda un formulario, la API responde OK y hay que mostrar la pantalla de éxito:**
  * **Uso:** `router.replace("/exito")` (o `router.push("/exito")`).
  * *Justificación:* Es navegación imperativa disparada dentro de una función de callback tras resolver una promesa asíncrona de lógica de negocio.
* **c) Botón “Cancelar” dentro de un modal:**
  * **Uso:** `router.back()`.
  * *Justificación:* Desapila y descarta el modal actual para regresar exactamente a la pantalla que lo había invocado.
* **d) Después de un login exitoso hay que ir a la pantalla principal:**
  * **Uso:** `router.replace("/")`.
  * *Justificación:* Se debe reemplazar la pantalla de login en la pila para que el usuario autenticado no pueda presionar el botón físico de "Atrás" y volver al formulario de login.
* **e) Volver desde el detalle de un pedido directamente a la lista de pedidos, que quedó tres pantallas más abajo:**
  * **Uso:** `router.dismissTo("/pedidos")` (o `router.navigate("/pedidos")`).
  * *Justificación:* Desenrolla las pantallas intermedias en un solo paso sin obligar a disparar tres `router.back()` sucesivos.

---

### C4. Escribí el código
**a) Un `<Link>` que abra el producto con id 8 usando href como objeto:**
```tsx
<Link
  href={{
    pathname: "/menu/[id]",
    params: { id: 8 },
  }}
>
  Ver Plato #8
</Link>
```

**b) Un `<Link>` a `/perfil` que siempre apile, aunque la pantalla ya exista:**
```tsx
<Link href="/perfil" push>
  Mi Perfil
</Link>
```

**c) Un botón (Pressable) propio que funcione como link a `/carrito` usando `asChild`:**
```tsx
<Link href="/carrito" asChild>
  <Pressable style={estilos.botonPersonalizado}>
    <Text style={estilos.textoBoton}>Ver Carrito</Text>
  </Pressable>
</Link>
```

---

### C5. Pensar
* **En la web:** Renderizar un `<a href>` real ofrece indexación SEO completa para motores de búsqueda, permite abrir enlaces en nuevas pestañas con clic central o clic derecho ("Abrir en pestaña nueva"), copiar la URL al portapapeles y previsualizar el destino en la barra de estado del navegador al hacer hover.
* **En el celular:** No hay barra de direcciones visual, pero Expo Router traduce esas rutas declarativas en **Deep Links** nativos. Esto permite que el sistema operativo enlace notificaciones push, códigos QR o mensajes externos directo a pantallas internas profundas de la aplicación.

---

## Parte D · Navegadores: Stack, Tabs y Drawer

### D1. Comparación
| Característica | Stack | Tabs | Drawer |
| :--- | :--- | :--- | :--- |
| **¿Apila pantallas?** | **Sí** (modelo LIFO estricto en profundidad). | **No** (mantiene vistas paralelas e independientes en cada tab). | **No** (mantiene una pantalla activa y un panel lateral). |
| **¿Cómo cambia de pantalla el usuario?** | Tocando botones para avanzar o "Atrás" / gesto swipe para desapilar. | Tocando los iconos en la barra de pestañas (inferior o superior). | Deslizando desde el lateral de la pantalla o tocando el icono de menú hamburguesa. |
| **¿Desde dónde se importa en SDK 57?** | `expo-router` | `expo-router/js-tabs` (o `expo-router` para tabs nativas). | `expo-router/drawer` |
| **Un caso de uso típico** | Flujo jerárquico: Lista de productos $\rightarrow$ Detalle del plato $\rightarrow$ Confirmación. | Secciones principales de la app: Inicio, Menú, Carrito. | Panel administrativo o panel de control de Cocina con menú lateral desplegable. |

---

### D2. Cada tab tiene su pila
* **¿Qué pantalla ve el usuario?**
  Ve la pantalla de **Detalle del producto 4**.
* **¿Por qué?**
  Porque cada pestaña del navegador Tabs aloja su propio Stack de navegación aislado. Al cambiar a la pestaña Inicio y regresar a Productos, el Stack de Productos preserva su estado interno y el tope de su pila intacto.
* **¿Qué app cotidiana se comporta así?**
  **Instagram** (estás viendo un perfil dentro del buscador, vas a Inicio a ver el feed, volvés a Buscar y el perfil sigue abierto), **YouTube** o **Twitter / X**.

---

### D3. ¿Dónde va cada pantalla?
* **a) El detalle de un producto, que debe mantener visible la barra de pestañas:**
  $\rightarrow$ **Dentro de una tab** *(en el Stack anidado dentro de la pestaña Menú)*.
* **b) Un modal para confirmar una compra, que debe tapar la barra de pestañas:**
  $\rightarrow$ **En el Stack raíz** *(con `presentation: 'modal'`)*.
* **c) La pantalla de login que se abre como modal:**
  $\rightarrow$ **En el Stack raíz** *(con `presentation: 'modal'`)*.
* **d) La pantalla “Mis pedidos anteriores” dentro de la sección Perfil:**
  $\rightarrow$ **Dentro de una tab** *(dentro del Stack propio de la pestaña Perfil)*.

---

### D4. Configurar el Stack
Código de referencia:
```tsx
src/app/_layout.tsx
import { Stack } from 'expo-router';
export default function LayoutRaiz() {
 return (
   <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
     <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
     <Stack.Screen
       name="hoja"
       options={{ presentation: 'formSheet', sheetAllowedDetents: [0.5, 0.9] }}
     />
   </Stack>
 );
}
```

* **a) ¿Qué diferencia hay entre `screenOptions` y las `options` de un `Stack.Screen`?**
  `screenOptions` establece la configuración por defecto compartida por **todas** las pantallas contenidas en ese Stack. En cambio, `options` en un `<Stack.Screen>` aplica o sobrescribe opciones de diseño únicamente para esa pantalla individual.
* **b) ¿Por qué `(tabs)` tiene `headerShown: false`?**
  Porque el contenedor `(tabs)` implementa su propia navegación interna y cabecera. Si no se ocultara el header en el Stack raíz, se mostrarían dos barras de navegación superpuestas.
* **c) Si existe `src/app/perfil-publico.tsx` pero no está declarada en el Stack, ¿existe la pantalla? ¿Para qué sirve declararla?**
  Sí, la pantalla **sí existe** y se puede acceder navegando a `/perfil-publico` gracias al enrutamiento por archivos. Declararla explícitamente en el Stack sirve para configurar sus propiedades visuales (`title`, `headerShown`, transiciones, modales, etc.).
* **d) Nombrá cuatro valores posibles de `presentation`. ¿Cuál usarías para una hoja inferior que se abre al 50%?**
  Cuatro valores: `'card'`, `'modal'`, `'transparentModal'`, `'formSheet'`.
  Para una hoja inferior al 50% se utiliza: `presentation: 'formSheet'` combinado con `sheetAllowedDetents: [0.5]`.
* **e) ¿Cómo cambiarías el título del header desde la propia pantalla de detalle para que diga “Producto 7”?**
  Utilizando el componente declarativo `<Stack.Screen options={{ title: "Producto 7" }} />` o imperativamente mediante `navigation.setOptions({ title: "Producto 7" })`.

---

### D5. Tabs y Drawer en SDK 57
* **a) ¿Qué cambió en SDK 57 al importar Tabs? ¿Qué alternativa experimental existe?**
  En SDK 57, `Tabs` importado desde `expo-router` adoptó de forma predeterminada la implementación nativa del sistema operativo (iOS/Android Native Tabs). La alternativa basada en JavaScript clásico de React Navigation se importa explícitamente desde `expo-router/js-tabs`.
* **b) ¿Qué dos paquetes necesita el Drawer y qué componente conviene poner en el layout raíz para los gestos?**
  Necesita `react-native-gesture-handler` y `react-native-reanimated`. En el layout raíz conviene envolver toda la aplicación con `<GestureHandlerRootView style={{ flex: 1 }}>`.
* **c) ¿Hace falta instalar `@react-navigation/drawer` en SDK 57? ¿Por qué?**
  **Sí**, porque `expo-router/drawer` es un puente que requiere `@react-navigation/drawer` como dependencia obligatoria para instanciar el menú lateral.
* **d) Si hay navegadores anidados, ¿en qué navegador actúa `router.back()`?**
  Actúa primero en el **navegador más interno y cercano** que contenga historial previo en su pila. Si ese navegador se encuentra en su raíz y ya no puede desapilar, el evento de retroceso burbujea al navegador padre.

---

## Parte E · Rutas dinámicas, parámetros y hooks

### E1. Encontrá el error
Código con error:
```tsx
src/app/(tabs)/productos/[id].tsx
export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const producto = productos.find((p) => p.id === id);
  if (id === 3) console.log('Es el chipá');
  if (!producto) return <Text>No existe el producto {id}</Text>;
  return <Text>{producto.nombre}</Text>;
}
```

* **Explicación del error:**
  Los parámetros extraídos mediante `useLocalSearchParams` provienen de la URL y se reciben siempre como cadenas de texto (`string`). En los datos, `p.id` es de tipo `number`. La comparación estricta `p.id === id` compara un número contra un string (ej. `3 === "3"`), lo cual resulta siempre en `false`. Lo mismo sucede con `if (id === 3)` que compara `"3" === 3`. Por ese motivo el producto nunca es encontrado.

* **Código corregido:**
```tsx
export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const idNumerico = Number(id);
  const producto = productos.find((p) => p.id === idNumerico);

  if (idNumerico === 3) console.log('Es el chipá');
  if (!producto || isNaN(idNumerico)) {
    return <Text>No existe el producto {id}</Text>;
  }

  return <Text>{producto.nombre}</Text>;
}
```

---

### E2. Catch-all
Para `src/app/docs/[...slug].tsx`:
| URL | slug |
| :--- | :--- |
| `/docs/react` | `["react"]` |
| `/docs/react/hooks/useState` | `["react", "hooks", "useState"]` |
| `/docs` | `undefined` *(salvo que exista `docs/index.tsx`, el cual toma precedencia)* |

---

### E3. Anatomía de una URL
Dada la URL: `rutasipf://buscar?q=mate&categoria=bebidas`
* **a) Identificación:**
  * **Scheme:** `rutasipf`
  * **Ruta (path):** `/buscar`
  * **Parámetros de búsqueda (query params):** `q=mate` y `categoria=bebidas`
* **b) ¿Qué devuelve `useLocalSearchParams()` en `buscar.tsx`?**
  Devuelve el objeto: `{ q: "mate", categoria: "bebidas" }`.
* **c) ¿Hacen falta corchetes en el nombre del archivo para recibir `q`? ¿Por qué?**
  **No.** Los corchetes (ej. `[id].tsx`) se usan exclusivamente para parámetros de segmento de ruta (*path params*). Los parámetros luego del signo `?` son *query params* y son parseados automáticamente por el hook en cualquier pantalla sin necesidad de modificar el nombre del archivo.
* **d) Dos razones para usar `router.setParams({ q: texto })` en lugar de `router.push` al escribir en el buscador:**
  1. **Evita saturar la pila del Stack:** Cada llamada a `router.push` agregaría una nueva pantalla al historial por cada letra pulsada, forzando al usuario a apretar "Atrás" decenas de veces para salir. `router.setParams` actualiza la URL en la misma pantalla sin apilar.
  2. **Fluidez y rendimiento:** Evita desmontar y volver a montar la pantalla o disparar transiciones visuales de navegación, manteniendo el foco del teclado y una búsqueda reactiva instantánea.

---

### E4. ¿Dónde estoy?
| Hook | En `/productos/3` | En `/buscar?q=chipa` |
| :--- | :--- | :--- |
| `usePathname()` | `"/productos/3"` | `"/buscar"` |
| `useSegments()` | `["(tabs)", "productos", "3"]` *(o `["productos", "3"]`)* | `["buscar"]` |
| `useLocalSearchParams()` | `{ id: "3" }` | `{ q: "chipa" }` |

---

### E5. Local vs global
* **a) ¿Cuál es la diferencia entre `useLocalSearchParams` y `useGlobalSearchParams`? ¿Cuál es la opción por defecto y por qué?**
  `useLocalSearchParams` devuelve únicamente los parámetros pertenecientes a la pantalla actual en contexto. `useGlobalSearchParams` devuelve los parámetros consolidados de todas las pantallas y layouts activos en el árbol. La opción por defecto recomendada es `useLocalSearchParams` para garantizar el encapsulamiento de cada pantalla y evitar renders innecesarios cuando cambian parámetros ajenos a ella.
* **b) ¿Para qué sirve `useFocusEffect`? Dá un ejemplo de uso.**
  Permite ejecutar efectos secundarios cada vez que la pantalla entra en foco (se hace visible) y funciones de limpieza cuando la pantalla pierde el foco. Ejemplo: actualizar en tiempo real la cola de pedidos de cocina o refrescar el stock del carrito al volver a la pantalla:
  ```tsx
  useFocusEffect(
    useCallback(() => {
      cargarPedidosActualizados();
    }, [])
  );
  ```
* **c) La URL `/productos/mate` abre la pantalla de detalle aunque no exista ese producto. ¿Es un error de Expo Router? ¿De quién es la responsabilidad?**
  **No es un error de Expo Router.** El enrutador cumple con asociar la URL al patrón `/productos/[id]`, asignando `id = "mate"`. La responsabilidad de validar si el parámetro recibido es válido y corresponde a un dato real del sistema recae exclusivamente en el **desarrollador**.

---

## Parte F · Redirecciones, rutas protegidas y deep links

### F1. Redirect
* **a) ¿Qué hace `<Redirect href="/productos" />` y a qué método de router equivale?**
  Redirige de forma declarativa e inmediata al usuario hacia la ruta `/productos` apenas el componente es montado. Equivale imperativamente a `router.replace("/productos")`.
* **b) ¿Por qué una redirección debe reemplazar y no apilar? Describí el problema que aparecería.**
  Porque si la redirección apilara con `push`, la pantalla que contiene la redirección quedaría guardada en la pila del Stack por debajo. Al tocar el botón "Atrás", el usuario volvería a la pantalla redireccionadora, la cual volvería a empujarlo hacia adelante al instante, atrapándolo en un **bucle infinito de redirección** del cual es imposible salir.

---

### F2. Stack.Protected
Completado de guards:
```tsx
src/app/_layout.tsx
function NavegacionRaiz() {
 const { usuario } = useAuth();
 const conSesion = usuario !== null;
 return (
   <Stack>
     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
     <Stack.Protected guard={conSesion}>
       <Stack.Screen name="privado" />
     </Stack.Protected>
     <Stack.Protected guard={!conSesion}>
       <Stack.Screen name="login" options={{ presentation: 'modal' }} />
     </Stack.Protected>
   </Stack>
 );
}
```

* **a) ¿Qué le pasa a una pantalla cuando su `guard` es `false`?**
  La pantalla deja de estar registrada en el navegador; es excluida del árbol de rutas y no puede ser alcanzada ni visitada.
* **b) Al iniciar sesión, el modal de login se cierra solo, sin llamar a `router.back()`. ¿Por qué?**
  Porque al cambiar el estado de sesión, el `guard={!conSesion}` pasa a valer `false`. El navegador desmonta automáticamente la pantalla `login` al quedar excluida de las rutas válidas.
* **c) Aparece el aviso “The action ‘NAVIGATE’ … was not handled by any navigator”. ¿Qué lo causa y cómo se evita?**
  Lo causa el intentar navegar hacia una pantalla cuyo `guard` está en `false` (no registrada en ese momento). Se evita asegurando que la navegación sólo se ejecute si se cumplen las precondiciones de autenticación, o redirigiendo al usuario a una pantalla accesible.
* **d) ¿Qué ventaja tiene `Stack.Protected` frente a poner un `<Redirect>` condicional en cada pantalla?**
  1. **Seguridad robusta:** La pantalla protegida directamente no existe en el navegador si no hay sesión, impidiendo accesos no autorizados por deep links directos.
  2. **Desmontaje automático:** Al cerrar sesión, cualquier pantalla protegida desaparece inmediatamente del historial sin código manual de limpieza.
  3. **Sin parpadeos (*flashing*):** Evita renderizar temporalmente pantallas intermedias antes de redirigir.

---

### F3. 404, anchor y rutas tipadas
* **a) `+not-found.tsx`:** Es el componente especial que se renderiza automáticamente cuando se solicita una ruta inexistente. Se define en `src/app/+not-found.tsx`.
* **b) `export const unstable_settings = { anchor: "(tabs)" }`:** Se define en el layout raíz `src/app/_layout.tsx`. Configura la ruta base o "ancla" para que, cuando se ingrese a la app desde un deep link a una pantalla de stack (como `/categorias/bebidas`), la navegación de pestañas `(tabs)` permanezca construida por debajo en la pila.
* **c) `typedRoutes`:** Si escribís `<Link href="/prodcutos" />`, el compilador de TypeScript emite un **error estático de tipado** advirtiendo que la ruta no existe. Los tipos se autogeneran dentro del archivo `.expo/types/router.d.ts`.

---

### F4. Deep links
Configuración: `"scheme": "comedoripf"`, IP: `192.168.1.20`. Plato 7 (`/menu/7`):

| Dónde | URL |
| :--- | :--- |
| **App instalada (build propia)** | `comedoripf://menu/7` |
| **Expo Go en desarrollo** | `exp://192.168.1.20:8081/--/menu/7` |
| **Web (`npx expo start --web`)** | `http://localhost:8081/menu/7` *(o con la IP `http://192.168.1.20:8081/menu/7`)* |

* **¿Qué significa la parte `/--/` en la URL de Expo Go?**
  Es el delimitador especial que separa la URL base de conexión al servidor de desarrollo de Expo Go (`exp://...`) de la ruta interna propia de navegación de la app (`/menu/7`).
* **¿Por qué el scheme propio no funciona dentro de Expo Go?**
  Porque Expo Go es una app cliente ya compilada que sólo tiene registrado su propio scheme (`exp://`) ante el sistema operativo del teléfono. Un scheme personalizado como `comedoripf://` solo puede ser registrado ante Android/iOS al compilar un ejecutable propio (*development build* o *standalone APK/IPA*).

---

### F5. Errores comunes
* **a) Error: “You are passing an array of styles to a child of `<Slot>`” al usar `<Link asChild>`:**
  * *Causa:* El componente `<Slot>` no procesa arrays crudos de estilos pasados a su hijo inmediato.
  * *Solución:* Aplanar el array de estilos usando `StyleSheet.flatten([estilos.boton, activo && estilos.activo])` o pasar el estilo como función `({ pressed }) => [...]` soportada por `Pressable`.
* **b) Crear `src/app/TarjetaProducto.tsx` generó una nueva ruta:**
  * *Causa:* En Expo Router, todo archivo dentro de `src/app/` que no empiece con `_` o `+` es interpretado como una ruta navegable (`/TarjetaProducto`).
  * *Solución:* Mover los componentes auxiliares a `src/components/TarjetaProducto.tsx`.
* **c) Tras iniciar sesión se usa `router.push("/")` y al tocar atrás vuelve al login:**
  * *Causa:* `router.push` apiló la pantalla de inicio sobre la pantalla de login en lugar de quitarla.
  * *Solución:* Utilizar `router.replace("/")` para sobreescribir la pantalla de login y eliminarla del historial.
* **d) Expo Go dice que el proyecto es incompatible después de `npm install`:**
  * *Causa:* `npm install` descargó la última versión de una librería sin verificar si está soportada por la versión de React Native del SDK de Expo en uso.
  * *Solución:* Instalar siempre librerías compatibles con `npx expo install <paquete>`.
