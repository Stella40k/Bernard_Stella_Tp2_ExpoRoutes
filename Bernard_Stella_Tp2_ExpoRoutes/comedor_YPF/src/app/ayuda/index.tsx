import React from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { Link } from "expo-router";
import { DondeEstoy } from "@/components/DondeEstoy";

/**
 * Pantalla Índice de Ayuda (/ayuda).
 * Requisito G1 y B1: Pantalla índice + catch-all para artículos de profundidad variable.
 */
export default function AyudaIndexScreen() {
  const articulos = [
    { ruta: "/ayuda/pagos/efectivo", titulo: "Pagos en efectivo en caja" },
    { ruta: "/ayuda/pagos/tarjeta", titulo: "Pagos con tarjeta de débito / crédito" },
    { ruta: "/ayuda/horarios", titulo: "Horarios de atención del Comedor" },
    { ruta: "/ayuda/pedidos/cancelar", titulo: "¿Cómo cancelar o modificar una orden?" },
    { ruta: "/ayuda/pedidos/demoras", titulo: "Tiempos estimados y sistema de colas" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>❓ Centro de Ayuda IPF</Text>
        <Text style={styles.subtitle}>
          Encontrá respuestas rápidas sobre el funcionamiento del comedor y los pedidos.
        </Text>

        <View style={styles.articlesList}>
          {articulos.map((art) => (
            <Link key={art.ruta} href={art.ruta as any} asChild>
              <Pressable style={styles.articleCard}>
                <Text style={styles.articleTitle}>{art.titulo}</Text>
                <Text style={styles.articlePath}>{art.ruta}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </ScrollView>

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#f8fafc",
  },
  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 6,
    marginBottom: 20,
  },
  articlesList: {
    gap: 12,
  },
  articleCard: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f1f5f9",
  },
  articlePath: {
    fontSize: 12,
    fontFamily: "monospace",
    color: "#38bdf8",
    marginTop: 4,
  },
});
