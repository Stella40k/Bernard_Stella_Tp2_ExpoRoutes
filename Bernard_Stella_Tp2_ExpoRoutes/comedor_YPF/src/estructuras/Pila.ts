/**
 * Implementación de Pila (Stack) con encapsulamiento estricto mediante campo privado (#items).
 * Sigue el principio LIFO (Last In, First Out / Último en entrar, primero en salir).
 */
export class Pila<T> {
  #items: T[] = [];

  // Agrega un elemento en el tope de la pila (O(1))
  push(elemento: T): void {
    this.#items.push(elemento);
  }

  // Extrae y devuelve el elemento del tope. Si está vacía devuelve undefined (O(1))
  pop(): T | undefined {
    return this.#items.pop();
  }

  // Consulta el elemento del tope sin modificar la pila
  tope(): T | undefined {
    return this.#items[this.#items.length - 1];
  }

  // Getter booleano que indica si la pila no tiene elementos
  get vacia(): boolean {
    return this.#items.length === 0;
  }

  // Getter que devuelve la cantidad actual de elementos
  get tamanio(): number {
    return this.#items.length;
  }

  // Devuelve una copia superficial del arreglo interno (de base a tope)
  aArray(): T[] {
    return [...this.#items];
  }
}
