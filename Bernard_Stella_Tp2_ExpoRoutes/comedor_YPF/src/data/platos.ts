export type CategoriaPlato = "Desayuno" | "Almuerzo" | "Bebidas" | "Kiosco";

export interface Plato {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: CategoriaPlato;
  disponible: boolean;
  imagen?: string;
}

export const CATEGORIAS_VALIDAS = ["desayuno", "almuerzo", "bebidas", "kiosco"] as const;

export function normalizarCategoria(cat: string): CategoriaPlato | null {
  const c = cat.trim().toLowerCase();
  if (c === "desayuno" || c === "desayunos") return "Desayuno";
  if (c === "almuerzo" || c === "almuerzos") return "Almuerzo";
  if (c === "bebida" || c === "bebidas") return "Bebidas";
  if (c === "kiosco" || c === "kiosko") return "Kiosco";
  return null;
}

export const PLATOS: Plato[] = [
  // Desayuno
  {
    id: 1,
    nombre: "Café con leche y medialunas",
    descripcion: "Café con leche espumoso acompañado de dos medialunas de manteca recién horneadas.",
    precio: 3000,
    categoria: "Desayuno",
    disponible: true,
  },
  {
    id: 2,
    nombre: "Sacramento de jamón y queso",
    descripcion: "Sacramento hojaldrado artesanal relleno con abundante jamón cocido y queso tybo fundido.",
    precio: 4000,
    categoria: "Desayuno",
    disponible: true,
  },
  {
    id: 3,
    nombre: "Tostado mixto y café negro",
    descripcion: "Tostado clásico en pan de campo con café tostado natural intenso.",
    precio: 4000,
    categoria: "Desayuno",
    disponible: true,
  },
  // Almuerzo
  {
    id: 4,
    nombre: "Milanesa de ternera con puré",
    descripcion: "Clásica milanesa de carne vacuna con puré de papas casero con manteca y nuez moscada.",
    precio: 7500,
    categoria: "Almuerzo",
    disponible: true,
  },
  {
    id: 5,
    nombre: "Lasagna casera gratinada",
    descripcion: "Capas de masa casera intercaladas con boloñesa tradicional, ricota y mozzarella dorada.",
    precio: 8000,
    categoria: "Almuerzo",
    disponible: true,
  },
  {
    id: 6,
    nombre: "Bife de chorizo con ensalada mixta",
    descripcion: "Corte jugoso de bife de chorizo a la plancha con ensalada fresca de lechuga, tomate y cebolla.",
    precio: 10000,
    categoria: "Almuerzo",
    disponible: true,
  },
  // Bebidas
  {
    id: 7,
    nombre: "Agua mineral sin gas 500ml",
    descripcion: "Agua mineral de vertiente natural, fresca y liviana.",
    precio: 1500,
    categoria: "Bebidas",
    disponible: true,
  },
  {
    id: 8,
    nombre: "Fanta Naranja 500ml",
    descripcion: "Gaseosa sabor naranja bien fría en botella descartable.",
    precio: 2000,
    categoria: "Bebidas",
    disponible: true,
  },
  {
    id: 9,
    nombre: "Coca-Cola Original 500ml",
    descripcion: "Gaseosa cola de 500ml servida a temperatura óptima.",
    precio: 2200,
    categoria: "Bebidas",
    disponible: true,
  },
  // Kiosco
  {
    id: 10,
    nombre: "Papas fritas clásicas 150g",
    descripcion: "Snack de papas crocantes con la cantidad justa de sal marina.",
    precio: 3000,
    categoria: "Kiosco",
    disponible: true,
  },
  {
    id: 11,
    nombre: "Galletitas saladas con queso",
    descripcion: "Paquete de galletitas crocantes horneadas con queso estacionado.",
    precio: 2500,
    categoria: "Kiosco",
    disponible: true,
  },
  {
    id: 12,
    nombre: "Alfajor de dulce de leche IPF",
    descripcion: "Alfajor con cobertura de chocolate semiamargo y corazón abundante de dulce de leche repostero.",
    precio: 2000,
    categoria: "Kiosco",
    disponible: true,
  },
];
