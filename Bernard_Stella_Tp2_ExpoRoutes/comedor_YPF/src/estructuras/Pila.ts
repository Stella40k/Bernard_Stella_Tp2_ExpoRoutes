//implementa la clase Pila con #items
//Una Pila (Stack) sigue el principio LIFO Last In, First Out / ultimo en entrar, primero en salir

//el btn de "Deshacer" del carrito saca el ultimo plato agregado

//en el historial de atendidos el ultimo pedido despachado queda arriba de todo

//aca modelo la estructura LIFO

export class Pila<T> {
  //T es un tpo generico en ts. Significa q la clase sirve para crear
  //una pila de platos, una pila de pedidos o de numeros

  #items: T[] = []; //arreglo donde estaran los datos en memoria

  // Apila un elemento en el tope (O(1))
  push(elemento: T): void {
    this.#items.push(elemento);
  } //agrega el nuevo elemento al final de la lista (el tope de la pila)

  // Desapila y devuelve el elemento del tope. Quita y devuelve lo ultimo q entro
  pop(): T | undefined {
    return this.#items.pop();
  } //si la pila esta vacia devuelve undefine

  // Consulta qué elemento esta en el tope sin sacarlo
  tope(): T | undefined {
    return this.#items[this.#items.length - 1];
  } //devuelve el elemento q esta arriba de todo sin sacarlo de la pila,
  //es solo para "mirar"

  // Comprueba si no contiene elementos
  get vacia(): boolean {
    //un get es una funcion disfrazada de variable o propiedad
    return this.#items.length === 0;
  } //solo calcula un valor cada q alguien lo consulte  y lo leen como dato fisico

  // Cantidad actual de elementos en la pila
  get tamanio(): number {
    return this.#items.length;
  } //devuelve cuantos elementos hay guardados actualmente

  // Retorna una copia superficial para renderizar sin mutar el original
  Array(): T[] {
    return [...this.#items]; //es el arreglo privado pero devuelve una copia superficial para q no se pueda mutar el original
  } //metodo q prromete devolver un array tradicional con los mismos elementos q contienen
  //una pilla
}
