import React from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { useLocalSearchParams, Stack, Link, router } from "expo-router";
import { PLATOS } from "@/data/platos";
import { useApp } from "@/context/AppContext";
import { DondeEstoy } from "@/components/DondeEstoy";

/**
 * Pantalla de Detalle del Plato (/menu/[id]).
 * Requisito G1 y G2.6:
 * - Valida el id (recordar que llega como string).
 * - Muestra un mensaje si no existe.
 * - Título del header dinámico = nombre del plato.
 * - La barra de pestañas sigue visible (vive dentro del Tab Menú).
 */
export default function DetallePlatoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { agregarAlCarrito } = useApp();

  const idNumerico = Number(id);
  const plato = PLATOS.find((p) => p.id === idNumerico);

  if (!plato || isNaN(idNumerico)) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Plato no encontrado" }} />
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>Plato no encontrado</Text>
          <Text style={styles.errorMessage}>
            El plato con identificador "{id}" no existe en el menú.
          </Text>
          <Pressable style={styles.btnVolver} onPress={() => router.back()}>
            <Text style={styles.btnVolverText}>Volver al menú</Text>
          </Pressable>
        </View>
        <DondeEstoy />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Título dinámico en el header del Stack */}
      <Stack.Screen options={{ title: plato.nombre }} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.badgeRow}>
            <Text style={styles.categoriaBadge}>{plato.categoria}</Text>
            <Text style={styles.disponibleBadge}>
              {plato.disponible ? "Disponible" : "Agotado"}
            </Text>
          </View>

          <Text style={styles.nombre}>{plato.nombre}</Text>
          <Text style={styles.descripcion}>{plato.descripcion}</Text>

          <View style={styles.precioRow}>
            <Text style={styles.precioLabel}>Precio:</Text>
            <Text style={styles.precioValor}>${plato.precio.toLocaleString()}</Text>
          </View>

          <Pressable
            style={styles.btnAgregar}
            onPress={() => {
              agregarAlCarrito(plato);
            }}
          >
            <Text style={styles.btnAgregarText}>🛒 Agregar al Carrito</Text>
          </Pressable>

          <Link href="/carrito" asChild>
            <Pressable style={styles.btnIrCarrito}>
              <Text style={styles.btnIrCarritoText}>Ver Carrito Actual</Text>
            </Pressable>
          </Link>
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
  card: {
    backgroundColor: "#1e293b",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  categoriaBadge: {
    backgroundColor: "#0284c7",
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  disponibleBadge: {
    backgroundColor: "#166534",
    color: "#bbf7d0",
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  nombre: {
    fontSize: 24,
    fontWeight: "800",
    color: "#f8fafc",
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 15,
    color: "#94a3b8",
    lineHeight: 22,
    marginBottom: 20,
  },
  precioRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#334155",
    marginBottom: 20,
  },
  precioLabel: {
    fontSize: 16,
    color: "#cbd5e1",
    fontWeight: "600",
  },
  precioValor: {
    fontSize: 24,
    fontWeight: "900",
    color: "#22c55e",
  },
  btnAgregar: {
    backgroundColor: "#0284c7",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  btnAgregarText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  btnIrCarrito: {
    backgroundColor: "#334155",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnIrCarritoText: {
    color: "#cbd5e1",
    fontSize: 14,
    fontWeight: "600",
  },
  errorBox: {
    margin: 20,
    backgroundColor: "#1e293b",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e11d48",
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#f8fafc",
  },
  errorMessage: {
    fontSize: 14,
    color: "#fda4af",
    marginVertical: 10,
    textAlign: "center",
  },
  btnVolver: {
    backgroundColor: "#0284c7",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  btnVolverText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
