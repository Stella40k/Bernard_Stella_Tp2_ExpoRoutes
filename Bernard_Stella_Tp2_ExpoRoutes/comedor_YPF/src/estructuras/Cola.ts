//implementa la clase Cola eficiente sin shift

//principio FIFO (First In, First Out / Primero en entrar, primero en salir)

//el comedor atiende por orden de llegada, primer ek akumno q confirma
// su pedido es el primero en atenderse

//Los elementos nuevos siempre se agregan al final
//Los elementos siempre se atienden o eliminan desde el frente

// enqueue(item): agregar un elemento al final
// dequeue(): sacar y retornar el elemento del frente
// peek() o front(): mirar qué elemento está al frente sin sacarlo
// isEmpty(): saber si la cola está vacía
// size(): saber cuántos elementos hay

export class Cola<T> {
  private elementos: T[]; //encapsulamiento, estoy protegiendo las reglas de la cola

  constructor() {
    // Inicializamos la cola con un arreglo vacío
    this.elementos = [];
  }

  // 1. Agregar un elemento al final de la cola
  //este metodo representa la accion de formarse o ponerse al final de la fila
  enqueue(item: T): void {
    this.elementos.push(item); //agrega el nuevo elemento al final de la lista (el final de la cola)
  }
  //enqueue: encolar en ingles, agrega un elemento al final
  //item: T: parametro que recibe la funcion,representa al dato o cosa q quiera sumar a la cola
  //void: guarda el valor internamente, no retorna nada, solo hace la accion de agregar el elemento al final de la cola

  // 2. Quitar y devolver el primer elemento (el del frente)
  //dequeue: desencolar en ingl. Si hay elementos devuelve el primero y lo saca de la cola,
  // si no hay elementos devuelve undefined
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      //verifica si la cola esta vacia
      return undefined;
    }
    // shift() saca el primer elemento del arreglo y lo retorna
    return this.elementos.shift(); //shift: elimina el elemento q esta en la posicion 0
    //retorna ese elemento eliminado y reacomoda el resto de los elementos hacia la izquierda
  }

  // 3. Ver el primer elemento sin sacarlo
  //peek: espia. Eso esta para revisar el elemento del frente dejando todo como esta
  //si hay datos (T) devuelve el primero sino devuelve undefined
  peek(): T | undefined {
    if (this.isEmpty()) {
      //verifica si la cola esta vacia
      return undefined;
    }
    return this.elementos[0]; //devuelve el primer elemento del arreglo sin sacarlo solo lo mira
  }

  //metodo para saber si la cola esta completamente vacia, devuelve true si esta vacia y false si tiene elementos
  isEmpty(): boolean {
    return this.elementos.length === 0;
  }

  // 5. Saber la cantidad de elementos en la cola
  size(): number {
    return this.elementos.length;
  }

  // 6. Obtener todos los elementos (útil para renderizar la lista en React)
  getItems(): T[] {
    return [...this.elementos];
  }

  // 7. Vaciar la cola
  clear(): void {
    this.elementos = []; //asigno un array vacio pq es mas rapido y directo de reiniciar la cola
  }
}
