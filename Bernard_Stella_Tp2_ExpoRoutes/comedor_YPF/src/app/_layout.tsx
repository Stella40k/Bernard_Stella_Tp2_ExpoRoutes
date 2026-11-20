import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { AppProvider, useApp } from "@/context/AppContext";

/**
 * Requisito G3:
 * anchor en (tabs) para que un deep link a /categorias/bebidas deje las pestañas debajo en la pila.
 */
export const unstable_settings = {
  anchor: "(tabs)",
};

function ContenedorNavegacion() {
  const { usuario } = useApp();
  const conSesion = usuario !== null;

  // Soporte universal para Stack.Protected (RFC Expo Router SDK 57 / condicional)
  const ProtectedContainer = (Stack as any).Protected || (({ guard, children }: any) => (guard ? children : null));

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#1e293b" },
        headerTintColor: "#f8fafc",
        headerTitleStyle: { fontWeight: "bold" },
        contentStyle: { backgroundColor: "#0f172a" },
      }}
    >
      {/* 1. Navegador de Pestañas Inferiores */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* 2. Categorías dinámicas (Stack Raíz) */}
      <Stack.Screen
        name="categorias/[categoria]"
        options={{ title: "Categoría de Platos" }}
      />

      {/* 3. Buscador en tiempo real (Stack Raíz) */}
      <Stack.Screen
        name="buscar"
        options={{ title: "Buscador de Platos" }}
      />

      {/* 4. Confirmación de Pedido (Modal del Stack Raíz) */}
      <Stack.Screen
        name="confirmar"
        options={{
          presentation: "modal",
          title: "Confirmar Pedido",
        }}
      />

      {/* 5. Turno de comanda recibido (Stack Raíz) */}
      <Stack.Screen
        name="turno/[numero]"
        options={{
          title: "Tu Turno de Comedor",
          headerBackVisible: false,
        }}
      />

      {/* 6. Centro de Ayuda (Índice y Catch-all) */}
      <Stack.Screen
        name="ayuda/index"
        options={{ title: "Centro de Ayuda" }}
      />
      <Stack.Screen
        name="ayuda/[...slug]"
        options={{ title: "Artículo de Ayuda" }}
      />

      {/* 7. Redirección de URL obsoleta */}
      <Stack.Screen name="pedido" options={{ headerShown: false }} />

      {/* 8. Rutas Protegidas (F2 y G2.8):
          - Login solo existe sin sesión iniciada.
          - Cocina (Drawer) solo existe con sesión iniciada.
      */}
      <ProtectedContainer guard={!conSesion}>
        <Stack.Screen
          name="login"
          options={{
            presentation: "modal",
            title: "Ingreso Cocina",
          }}
        />
      </ProtectedContainer>

      <ProtectedContainer guard={conSesion}>
        <Stack.Screen
          name="cocina"
          options={{
            headerShown: false,
          }}
        />
      </ProtectedContainer>

      {/* 9. Pantalla 404 para URLs no coincidentes */}
      <Stack.Screen
        name="+not-found"
        options={{ title: "Ruta no encontrada" }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <StatusBar style="light" />
        <ContenedorNavegacion />
      </AppProvider>
    </GestureHandlerRootView>
  );
}
