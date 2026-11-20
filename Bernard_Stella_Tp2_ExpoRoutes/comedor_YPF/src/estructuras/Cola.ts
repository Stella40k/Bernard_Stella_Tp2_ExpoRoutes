/**
 * Implementación de Cola (Queue) eficiente con campos privados (#items, #frente).
 * Sigue el principio FIFO (First In, First Out / Primero en entrar, primero en salir).
 * No utiliza array.shift() para evitar la penalización O(N) de reindexación en cada extracción.
 */
export class Cola<T> {
  #items: (T | undefined)[] = [];
  #frente: number = 0;

  // Encola un nuevo elemento al final de la cola (O(1))
  encolar(elemento: T): void {
    this.#items.push(elemento);
  }

  // Desencola y retorna el elemento del frente de la cola (O(1))
  desencolar(): T | undefined {
    if (this.vacia) {
      return undefined;
    }
    const item = this.#items[this.#frente];
    this.#items[this.#frente] = undefined; // Libera la referencia en memoria
    this.#frente++;

    // Compactación opcional periódica cuando el índice de frente avanza mucho
    if (this.#frente > 50 && this.#frente * 2 >= this.#items.length) {
      this.#items = this.#items.slice(this.#frente);
      this.#frente = 0;
    }

    return item;
  }

  // Consulta el elemento que está en el frente sin sacarlo (O(1))
  frente(): T | undefined {
    if (this.vacia) {
      return undefined;
    }
    return this.#items[this.#frente];
  }

  // Getter booleano que indica si la cola está vacía
  get vacia(): boolean {
    return this.tamanio === 0;
  }

  // Getter que devuelve la cantidad de elementos en espera
  get tamanio(): number {
    return this.#items.length - this.#frente;
  }

  // Retorna una copia superficial con los elementos actualmente en la cola (de frente a final)
  aArray(): T[] {
    return (this.#items.slice(this.#frente).filter((item): item is T => item !== undefined));
  }
}
