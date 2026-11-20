import React from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { useLocalSearchParams, Link, router } from "expo-router";
import { PLATOS, normalizarCategoria } from "@/data/platos";
import { useApp } from "@/context/AppContext";
import { DondeEstoy } from "@/components/DondeEstoy";

/**
 * Pantalla de Platos por Categoría (/categorias/[categoria]).
 * Requisito G2.6: Valida el parámetro recibido y muestra mensaje si no existe.
 */
export default function CategoriaScreen() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();
  const { agregarAlCarrito } = useApp();

  const categoriaNormalizada = categoria ? normalizarCategoria(categoria) : null;
  const platosFiltrados = categoriaNormalizada
    ? PLATOS.filter((p) => p.categoria === categoriaNormalizada)
    : [];

  if (!categoriaNormalizada) {
    return (
      <View style={styles.container}>
        <View style={styles.errorCard}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Categoría no encontrada</Text>
          <Text style={styles.errorMessage}>
            La categoría "{categoria}" no existe en el Comedor IPF.
          </Text>
          <Text style={styles.errorSub}>
            Categorías disponibles: desayuno, almuerzo, bebidas, kiosco.
          </Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Regresar</Text>
          </Pressable>
        </View>
        <DondeEstoy />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={platosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Menú: {categoriaNormalizada}</Text>
            <Text style={styles.headerSubtitle}>
              {platosFiltrados.length} opciones disponibles
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemNombre}>{item.nombre}</Text>
              <Text style={styles.itemDescripcion}>{item.descripcion}</Text>
              <Text style={styles.itemPrecio}>${item.precio.toLocaleString()}</Text>
            </View>

            <View style={styles.actionsContainer}>
              <Link
                href={{
                  pathname: "/menu/[id]",
                  params: { id: item.id.toString() },
                }}
                asChild
              >
                <Pressable style={styles.detalleButton}>
                  <Text style={styles.detalleButtonText}>Ver detalle</Text>
                </Pressable>
              </Link>

              <Pressable
                style={styles.agregarButton}
                onPress={() => agregarAlCarrito(item)}
              >
                <Text style={styles.agregarButtonText}>+ Carrito</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  listContent: {
    padding: 16,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#f8fafc",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 4,
  },
  itemCard: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  itemTextContainer: {
    marginBottom: 12,
  },
  itemNombre: {
    fontSize: 17,
    fontWeight: "700",
    color: "#f1f5f9",
  },
  itemDescripcion: {
    fontSize: 13,
    color: "#94a3b8",
    marginTop: 4,
  },
  itemPrecio: {
    fontSize: 16,
    fontWeight: "800",
    color: "#38bdf8",
    marginTop: 6,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  detalleButton: {
    flex: 1,
    backgroundColor: "#334155",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  detalleButtonText: {
    color: "#f8fafc",
    fontWeight: "600",
    fontSize: 13,
  },
  agregarButton: {
    flex: 1,
    backgroundColor: "#0284c7",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  agregarButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13,
  },
  errorCard: {
    margin: 20,
    backgroundColor: "#1e293b",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e11d48",
  },
  errorIcon: {
    fontSize: 40,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#f8fafc",
    marginTop: 10,
  },
  errorMessage: {
    fontSize: 14,
    color: "#fda4af",
    textAlign: "center",
    marginTop: 6,
  },
  errorSub: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 8,
    textAlign: "center",
  },
  backButton: {
    marginTop: 18,
    backgroundColor: "#0284c7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
