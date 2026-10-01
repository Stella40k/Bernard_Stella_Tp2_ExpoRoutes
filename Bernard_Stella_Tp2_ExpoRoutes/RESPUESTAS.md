_Desarrollo_

A1:
a) ¿Qué significan LIFO y FIFO? ¿Cuál corresponde a la pila y cuál a la cola?

- LIFO: Last In, First Out (El primero que entra es el primero en salir)
- FIFO: First Int, First Out (El primero en entrar es el primero salir)
  LIFO corresponde a Pila y FIFO a Cola.

b) ¿Por qué extremo entra y por qué extremo sale un elemento en cada estructura?

- LIFO: Entra por el tope y sale por este mismo.
- FIFO: Entra por el final y sale por el frente.

c) Dá un ejemplo de la vida real y otro de una aplicación móvil para cada una.

- Pila (LIFO): sistema en donde lo ultimo que se agrega es lo primero que se "toma". Ej:

* Pila de examenes
* Pila de platos
* Navegacion de telefonos
* Cartas de juego

- Cola (FIFO): sistema en donde el primer elemnto en llegar es el primero en salir. Ej:

* Fila del banco/Turnos de Hospitales
* Cola de impresion
* Cola de supermercado
* PEticiones en un servidor

A2:

seguimiento-pila.js
const p = new Pila(); (->[])
p.push('Inicio'); (->['Inicio])  
p.push('Productos'); (->['Inicio', 'Productos'])
p.push('Detalle 3'); (->['Inicio', 'Productos', 'Detalle 3'])
p.pop(); (el pop lo que hace es extraer el ultimo elemento que seria el Detalle 3 -> ['Inicio', 'Productos'])
p.push('Perfil'); (-> ['Inicio', 'Productos', 'Perfil'])
console.log(p.tope()); // (1) - Imprime 'Perfil' leyendo el ultimo elemento superior de LA PILA sin modificarla
console.log(p.pop()); // (2) - Imprime 'Perfil' extrayendo el tope y lo devuelve reduciendo la pila en inicio y productos
console.log(p.tope()); // (3) - Imprime 'Productos' tras extraer el perfil en el anterior y productos vuelve a ser el nuevo tope
console.log(p.vacia); // (4) - Imprime undefine [], la estructura todavia contiene elemenntos asi q no esta vacia

A3:
seguimiento-cola.js  
const c = new Cola(); (->[])
c.encolar('Ana'); (->['Ana'])
c.encolar('Beto'); (->['Ana', 'Beto'])
c.desencolar(); (extrae y elimina el primero, osea ana y la cola solo se actualiza con ['Beto'])
c.encolar('Caro'); (['Beto, 'Caro'])
c.encolar('Dani'); ['Beto', 'Caro', 'Dani']
console.log(c.frente()); // (1) - Imprime 'Betp' porque observa el primer elemento de la fila sin modificar
console.log(c.desencolar()); // (2) - Imprime 'BEtp' y extrae al primero de la fila y reduce la cola en solo 'Caro', 'Dani'
console.log(c.vacia); // (3) - Imprime false porque la estructura todavia esta esperando personas

A4:
