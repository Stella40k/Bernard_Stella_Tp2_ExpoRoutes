import React from "react";
import { StyleSheet, Text, View, SectionList, Pressable } from "react-native";
import { Link } from "expo-router";
import { PLATOS, Plato, CategoriaPlato } from "@/data/platos";
import { useApp } from "@/context/AppContext";
import { DondeEstoy } from "@/components/DondeEstoy";

interface SeccionMenu {
  title: CategoriaPlato;
  data: Plato[];
}

export default function MenuScreen() {
  const { agregarAlCarrito } = useApp();

  const categorias: CategoriaPlato[] = ["Desayuno", "Almuerzo", "Bebidas", "Kiosco"];
  const secciones: SeccionMenu[] = categorias.map((cat) => ({
    title: cat,
    data: PLATOS.filter((p) => p.categoria === cat),
  }));

  return (
    <View style={styles.container}>
      <SectionList
        sections={secciones}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.platoNombre}>{item.nombre}</Text>
              <Text style={styles.platoPrecio}>${item.precio.toLocaleString()}</Text>
            </View>
            <Text style={styles.platoDescripcion}>{item.descripcion}</Text>

            <View style={styles.cardActions}>
              <Link
                href={{
                  pathname: "/menu/[id]",
                  params: { id: item.id.toString() },
                }}
                asChild
              >
                <Pressable style={styles.btnDetalle}>
                  <Text style={styles.btnDetalleText}>Ver detalle</Text>
                </Pressable>
              </Link>

              <Pressable
                style={styles.btnAgregar}
                onPress={() => agregarAlCarrito(item)}
              >
                <Text style={styles.btnAgregarText}>+ Agregar al Carrito</Text>
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
  },
  sectionHeader: {
    backgroundColor: "#0f172a",
    paddingVertical: 10,
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#0284c7",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#38bdf8",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 14,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#334155",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  platoNombre: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f8fafc",
    flex: 1,
    marginRight: 8,
  },
  platoPrecio: {
    fontSize: 16,
    fontWeight: "800",
    color: "#22c55e",
  },
  platoDescripcion: {
    fontSize: 13,
    color: "#94a3b8",
    marginTop: 6,
    lineHeight: 18,
  },
  cardActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  btnDetalle: {
    flex: 1,
    backgroundColor: "#334155",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  btnDetalleText: {
    color: "#cbd5e1",
    fontWeight: "600",
    fontSize: 13,
  },
  btnAgregar: {
    flex: 1.4,
    backgroundColor: "#0284c7",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  btnAgregarText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13,
  },
});
