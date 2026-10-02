//categotia para el comedor
export type CategoriaPlato = "Desayuno" | "Almuerzo" | "Bebida" | "Kiosco";

//interfaz q define la estructura obligatoria de un plato
export interface Plato {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: CategoriaPlato;
  disponible: boolean;
}

//al menos 12 platos (3 por cada categoria)
export const PLATOS: Plato[] = [
  //desayuno
  {
    id: 1,
    nombre: "cafe con leche y medialunas",
    descripcion: " un cafe con leche acompañado de 2 medialunas",
    precio: 3000,
    categoria: "Desayuno",
    disponible: true,
  },
  {
    id: 2,
    nombre: "Sacramento",
    descripcion: "sacramento ojaldrado relleno de jamon y queso",
    precio: 4000,
    categoria: "Desayuno",
    disponible: true,
  },
  {
    id: 3,
    nombre: "Cafe negro con tostados",
    descripcion:
      "Un vaso de cafe negro sin azucar acompañado de medio tostado de jamon y queso",
    precio: 4000,
    categoria: "Desayuno",
    disponible: true,
  },
  //almuerxo
  {
    id: 4,
    nombre: "Milanesas con puré",
    descripcion: "Dos milanesas con puré de papas",
    precio: 7500,
    categoria: "Almuerzo",
    disponible: true,
  },
  {
    id: 5,
    nombre: "Lasagna",
    descripcion: "Lasagna con carne molida, tuco y queso",
    precio: 8000,
    categoria: "Almuerzo",
    disponible: true,
  },
  {
    id: 6,
    nombre: "Bife de chorizo",
    descripcion: "bife de chorizo a la plancha con ensalada mixta",
    precio: 10000,
    categoria: "Almuerzo",
    disponible: true,
  },
  //bebidas
  {
    id: 7,
    nombre: "Agua mineral",
    descripcion: "Agua mineral natural o con gas",
    precio: 1500,
    categoria: "Bebida",
    disponible: true,
  },
  {
    id: 8,
    nombre: "Fanta de piña",
    descripcion: "Fanta de piña de 500ml",
    precio: 2000,
    categoria: "Bebida",
    disponible: true,
  },
  {
    id: 9,
    nombre: "Fanta Guaraná",
    descripcion: "Fanta de guraná de 500ml",
    precio: 2000,
    categoria: "Bebida",
    disponible: true,
  },
  //kiosc
  {
    id: 10,
    nombre: "Papas fritas",
    descripcion: "Papas fritas Lays de 200gr",
    precio: 3000,
    categoria: "Kiosco",
    disponible: true,
  },
  {
    id: 11,
    nombre: "galletitas saladas",
    descripcion: "Galletitas rex saladas sabor queso 200gr",
    precio: 3000,
    categoria: "Kiosco",
    disponible: true,
  },
  {
    id: 12,
    nombre: "Chicles",
    descripcion: "Chicles de menta o frutilla",
    precio: 1000,
    categoria: "Kiosco",
    disponible: true,
  },
];
