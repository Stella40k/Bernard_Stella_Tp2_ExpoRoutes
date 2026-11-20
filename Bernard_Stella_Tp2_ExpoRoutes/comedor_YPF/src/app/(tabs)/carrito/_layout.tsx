import React from "react";
import { Stack } from "expo-router";

export default function CarritoStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#1e293b" },
        headerTintColor: "#f8fafc",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Mi Carrito",
        }}
      />
      <Stack.Screen
        name="nota"
        options={{
          title: "Nota para Cocina",
          presentation: "formSheet",
          sheetAllowedDetents: [0.5, 0.9],
        }}
      />
    </Stack>
  );
}
