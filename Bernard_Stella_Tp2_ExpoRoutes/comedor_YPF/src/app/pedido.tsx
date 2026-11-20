import React from "react";
import { Redirect } from "expo-router";

/**
 * Redirección de la versión anterior de la app:
 * La URL vieja '/pedido' debe redirigir a '/carrito' utilizando <Redirect>.
 */
export default function PedidoRedirect() {
  return <Redirect href="/carrito" />;
}
