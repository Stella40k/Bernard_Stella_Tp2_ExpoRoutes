import React from "react";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Pressable, Text } from "react-native";
import { useApp } from "@/context/AppContext";

/**
 * Layout de Cocina (/cocina).
 * Requisito G1 y G3:
 * - Implementado con Drawer de expo-router/drawer.
 * - Solo accesible con sesión iniciada.
 */
export default function CocinaDrawerLayout() {
  const { cerrarSesion } = useApp();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle: { backgroundColor: "#1e293b" },
          headerTintColor: "#f8fafc",
          drawerStyle: { backgroundColor: "#1e293b", width: 260 },
          drawerActiveTintColor: "#38bdf8",
          drawerInactiveTintColor: "#94a3b8",
          headerRight: () => (
            <Pressable
              onPress={cerrarSesion}
              style={{ marginRight: 16, backgroundColor: "#e11d48", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 }}
            >
              <Text style={{ color: "#ffffff", fontWeight: "700", fontSize: 12 }}>Cerrar Sesión</Text>
            </Pressable>
          ),
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Cola en Espera (FIFO)",
            title: "Cocina: Pedidos Pendientes",
          }}
        />
        <Drawer.Screen
          name="atendidos"
          options={{
            drawerLabel: "Historial Atendidos (Pila)",
            title: "Cocina: Pedidos Despachados",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
