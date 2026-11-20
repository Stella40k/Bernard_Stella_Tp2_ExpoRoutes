import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Link, usePathname } from "expo-router";
import { DondeEstoy } from "@/components/DondeEstoy";

export default function NotFoundScreen() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.code}>404</Text>
        <Text style={styles.title}>Pantalla no encontrada</Text>
        <Text style={styles.message}>
          La ruta solicitada no existe en la aplicación:
        </Text>
        <Text style={styles.urlBadge}>{pathname}</Text>

        <Link href="/" replace asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Volver al Inicio</Text>
          </Pressable>
        </Link>
      </View>
      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "space-between",
    padding: 16,
  },
  card: {
    marginTop: 40,
    backgroundColor: "#1e293b",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  code: {
    fontSize: 54,
    fontWeight: "900",
    color: "#f43f5e",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f8fafc",
    marginTop: 8,
  },
  message: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 8,
  },
  urlBadge: {
    fontSize: 14,
    fontFamily: "monospace",
    backgroundColor: "#0f172a",
    color: "#38bdf8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 12,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0284c7",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15,
  },
});
