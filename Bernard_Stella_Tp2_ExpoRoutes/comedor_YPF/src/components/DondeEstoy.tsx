import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, usePathname, useSegments } from "expo-router";

// Constante para activar o desactivar la visualización del componente de depuración
export const DEBUG = true;

/**
 * Componente de inspección de rutas solicitado en G2 (Requisito 10).
 * Muestra pathname actual, segmentos de navegación y parámetros locales recibidos.
 */
export function DondeEstoy() {
  if (!DEBUG) return null;

  const pathname = usePathname();
  const segments = useSegments();
  const localParams = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🧭 ¿Dónde estoy? (Expo Router Inspector)</Text>
      <View style={styles.row}>
        <Text style={styles.label}>usePathname():</Text>
        <Text style={styles.value}>{pathname || "/"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>useSegments():</Text>
        <Text style={styles.value}>{JSON.stringify(segments)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>useLocalSearchParams():</Text>
        <Text style={styles.value}>{JSON.stringify(localParams)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 12,
    backgroundColor: "#1e293b",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#334155",
  },
  header: {
    fontSize: 12,
    fontWeight: "700",
    color: "#38bdf8",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  row: {
    marginVertical: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#94a3b8",
  },
  value: {
    fontSize: 11,
    fontFamily: "monospace",
    color: "#f1f5f9",
    backgroundColor: "#0f172a",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
  },
});

export default DondeEstoy;
