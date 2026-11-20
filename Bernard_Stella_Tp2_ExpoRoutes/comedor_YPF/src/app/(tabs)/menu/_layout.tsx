import React from "react";
import { Stack } from "expo-router";

export default function MenuStackLayout() {
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
          title: "Menú Comedor IPF",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Detalle del Plato",
        }}
      />
    </Stack>
  );
}
