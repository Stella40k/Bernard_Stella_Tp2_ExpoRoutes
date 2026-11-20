import React, { createContext, useContext, useState, useMemo } from "react";
import { Plato } from "@/data/platos";
import { Pila } from "@/estructuras/Pila";
import { Cola } from "@/estructuras/Cola";

export interface Pedido {
  id: number;
  numeroTurno: number;
  items: Plato[];
  nota: string;
  total: number;
  fecha: string;
}

export interface Usuario {
  username: string;
  nombre: string;
  rol: "cocina" | "alumno";
}

interface AppContextType {
  // Autenticación de cocina
  usuario: Usuario | null;
  iniciarSesion: (user: string, pass: string) => boolean;
  cerrarSesion: () => void;

  // Carrito de compras
  carrito: Plato[];
  nota: string;
  setNota: (texto: string) => void;
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => Plato | undefined;
  limpiarCarrito: () => void;
  puedeDeshacer: boolean;
  totalCarrito: number;
  cantidadItems: number;

  // Cola de pedidos (FIFO)
  pedidosEnEspera: Pedido[];
  pedidoActualCocina: Pedido | undefined;
  cantidadEnEspera: number;
  confirmarPedido: () => number;
  obtenerPosicionEnCola: (numeroTurno: number) => { posicion: number; tiempoEstimadoMinutos: number };

  // Historial de pedidos atendidos (LIFO - Pila)
  pedidosAtendidos: Pedido[];
  atenderSiguiente: () => Pedido | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // 1. Estado de Sesión (Login)
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const iniciarSesion = (user: string, pass: string): boolean => {
    const u = user.trim().toLowerCase();
    // Credenciales fijas requeridas para el personal de cocina
    if ((u === "cocina" || u === "admin") && pass === "1234") {
      setUsuario({
        username: u,
        nombre: "Jefe de Cocina IPF",
        rol: "cocina",
      });
      return true;
    }
    return false;
  };

  const cerrarSesion = () => {
    setUsuario(null);
  };

  // 2. Carrito y Pila de deshacer (LIFO)
  const [carrito, setCarrito] = useState<Plato[]>([]);
  const [nota, setNota] = useState<string>("");
  const [pilaDeshacer] = useState<Pila<Plato>>(() => new Pila<Plato>());
  const [, setCambioVersion] = useState(0);

  const forzarActualizacion = () => setCambioVersion((v) => v + 1);

  const agregarAlCarrito = (plato: Plato) => {
    pilaDeshacer.push(plato);
    setCarrito((prev) => [...prev, plato]);
    forzarActualizacion();
  };

  const deshacerUltimo = (): Plato | undefined => {
    if (pilaDeshacer.vacia) return undefined;
    const platoQuitado = pilaDeshacer.pop();
    if (platoQuitado) {
      setCarrito((prev) => {
        // Quitamos la última ocurrencia agregada de ese plato
        const indice = prev.map((p) => p.id).lastIndexOf(platoQuitado.id);
        if (indice !== -1) {
          const nuevo = [...prev];
          nuevo.splice(indice, 1);
          return nuevo;
        }
        return prev;
      });
    }
    forzarActualizacion();
    return platoQuitado;
  };

  const limpiarCarrito = () => {
    while (!pilaDeshacer.vacia) {
      pilaDeshacer.pop();
    }
    setCarrito([]);
    setNota("");
    forzarActualizacion();
  };

  const puedeDeshacer = !pilaDeshacer.vacia;
  const totalCarrito = useMemo(() => carrito.reduce((acc, p) => acc + p.precio, 0), [carrito]);
  const cantidadItems = carrito.length;

  // 3. Cola de pedidos en espera (FIFO)
  const [colaPedidos] = useState<Cola<Pedido>>(() => new Cola<Pedido>());
  const [contadorTurnos, setContadorTurnos] = useState<number>(1);
  const [pedidosEnEspera, setPedidosEnEspera] = useState<Pedido[]>([]);

  // 4. Pila de pedidos atendidos (LIFO)
  const [pilaAtendidos] = useState<Pila<Pedido>>(() => new Pila<Pedido>());
  const [pedidosAtendidos, setPedidosAtendidos] = useState<Pedido[]>([]);

  const confirmarPedido = (): number => {
    if (carrito.length === 0) return 0;
    const turnoActual = contadorTurnos;
    setContadorTurnos((prev) => prev + 1);

    const nuevoPedido: Pedido = {
      id: turnoActual,
      numeroTurno: turnoActual,
      items: [...carrito],
      nota: nota.trim(),
      total: totalCarrito,
      fecha: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    colaPedidos.encolar(nuevoPedido);
    setPedidosEnEspera(colaPedidos.aArray());

    // Limpia el carrito actual y la pila de deshacer tras confirmar
    while (!pilaDeshacer.vacia) {
      pilaDeshacer.pop();
    }
    setCarrito([]);
    setNota("");
    forzarActualizacion();

    return turnoActual;
  };

  const atenderSiguiente = (): Pedido | undefined => {
    if (colaPedidos.vacia) return undefined;
    const atendido = colaPedidos.desencolar();
    if (atendido) {
      // Apila en la pila de atendidos (último atendido queda en el tope)
      pilaAtendidos.push(atendido);
      setPedidosEnEspera(colaPedidos.aArray());
      // Copia de tope a base para mostrar en pantalla el más reciente primero
      setPedidosAtendidos([...pilaAtendidos.aArray()].reverse());
    }
    return atendido;
  };

  const obtenerPosicionEnCola = (numeroTurno: number) => {
    const colaActual = colaPedidos.aArray();
    const indice = colaActual.findIndex((p) => p.numeroTurno === numeroTurno);
    if (indice === -1) {
      return { posicion: 0, tiempoEstimadoMinutos: 0 };
    }
    // La posición es la cantidad de pedidos que están antes (adelante) en la fila
    return {
      posicion: indice,
      // Desafío opcional: 3 minutos por cada pedido adelante en la cola
      tiempoEstimadoMinutos: Math.max(3, indice * 3),
    };
  };

  const pedidoActualCocina = colaPedidos.frente();
  const cantidadEnEspera = colaPedidos.tamanio;

  return (
    <AppContext.Provider
      value={{
        usuario,
        iniciarSesion,
        cerrarSesion,
        carrito,
        nota,
        setNota,
        agregarAlCarrito,
        deshacerUltimo,
        limpiarCarrito,
        puedeDeshacer,
        totalCarrito,
        cantidadItems,
        pedidosEnEspera,
        pedidoActualCocina,
        cantidadEnEspera,
        confirmarPedido,
        obtenerPosicionEnCola,
        pedidosAtendidos,
        atenderSiguiente,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp debe ser utilizado dentro de un AppProvider");
  }
  return context;
}
