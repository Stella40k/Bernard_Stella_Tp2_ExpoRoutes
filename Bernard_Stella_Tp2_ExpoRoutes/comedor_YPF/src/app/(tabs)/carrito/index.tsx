import React from "react";
import { StyleSheet, Text, View, FlatList, Pressable, Alert } from "react-native";
import { Link, router } from "expo-router";
import { useApp } from "@/context/AppContext";
import { DondeEstoy } from "@/components/DondeEstoy";

/**
 * Pantalla de Carrito (/carrito).
 * Requisito G1 y G2.3:
 * - Ítems agregados, total, badge con cantidad de ítems.
 * - Botón "Deshacer último" que extrae de la Pila (LIFO) y quita el último plato.
 * - El botón de deshacer se deshabilita cuando la pila está vacía.
 * - Botón "Confirmar pedido" que navega a /confirmar.
 */
export default function CarritoScreen() {
  const {
    carrito,
    totalCarrito,
    cantidadItems,
    puedeDeshacer,
    deshacerUltimo,
    limpiarCarrito,
    nota,
  } = useApp();

  const handleDeshacer = () => {
    const sacado = deshacerUltimo();
    if (sacado) {
      Alert.alert("Acción deshecha", `Se quitó "${sacado.nombre}" del carrito.`);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={carrito}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>🛒 Carrito de Compras</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cantidadItems} ítems</Text>
              </View>
            </View>

            <View style={styles.controlsRow}>
              <Pressable
                style={[styles.btnDeshacer, !puedeDeshacer && styles.btnDisabled]}
                onPress={handleDeshacer}
                disabled={!puedeDeshacer}
              >
                <Text style={[styles.btnDeshacerText, !puedeDeshacer && styles.textDisabled]}>
                  ↩️ Deshacer último ({puedeDeshacer ? "Pila activa" : "Pila vacía"})
                </Text>
              </Pressable>

              {cantidadItems > 0 && (
                <Pressable style={styles.btnVaciar} onPress={limpiarCarrito}>
                  <Text style={styles.btnVaciarText}>Vaciar</Text>
                </Pressable>
              )}
            </View>

            {/* Acceso a la nota para la cocina */}
            <Link href="/carrito/nota" asChild>
              <Pressable style={styles.notaCard}>
                <Text style={styles.notaHeader}>📝 Aclaración para la cocina:</Text>
                <Text style={styles.notaBody}>
                  {nota ? `"${nota}"` : "Toca aquí para agregar una nota (ej: sin sal, sin hielo)"}
                </Text>
              </Pressable>
            </Link>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🍽️</Text>
            <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
            <Text style={styles.emptySubtitle}>
              Explorá el menú o el buscador para agregar platos a tu orden.
            </Text>
            <Link href="/menu" asChild>
              <Pressable style={styles.btnExplorar}>
                <Text style={styles.btnExplorarText}>Ir al Menú</Text>
              </Link>
            </View>
          </View>
        }
        renderItem={({ item, index }) => (
          <View style={styles.itemCard}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemIndex}>#{index + 1}</Text>
              <View>
                <Text style={styles.itemNombre}>{item.nombre}</Text>
                <Text style={styles.itemCategoria}>{item.categoria}</Text>
              </View>
            </View>
            <Text style={styles.itemPrecio}>${item.precio.toLocaleString()}</Text>
          </View>
        )}
        ListFooterComponent={
          cantidadItems > 0 ? (
            <View style={styles.footer}>
              <View style={styles.totalBox}>
                <Text style={styles.totalLabel}>Total del Pedido:</Text>
                <Text style={styles.totalMonto}>${totalCarrito.toLocaleString()}</Text>
              </View>

              <Pressable
                style={styles.btnConfirmar}
                onPress={() => router.push("/confirmar")}
              >
                <Text style={styles.btnConfirmarText}>Confirmar Pedido ➡️</Text>
              </Pressable>
            </View>
          ) : null
        }
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
  header: {
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#f8fafc",
  },
  badge: {
    backgroundColor: "#0284c7",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 12,
  },
  controlsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  btnDeshacer: {
    flex: 1,
    backgroundColor: "#eab308",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnDeshacerText: {
    color: "#0f172a",
    fontWeight: "700",
    fontSize: 13,
  },
  btnDisabled: {
    backgroundColor: "#334155",
    opacity: 0.6,
  },
  textDisabled: {
    color: "#94a3b8",
  },
  btnVaciar: {
    backgroundColor: "#475569",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnVaciarText: {
    color: "#f8fafc",
    fontWeight: "600",
    fontSize: 13,
  },
  notaCard: {
    backgroundColor: "#1e293b",
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  notaHeader: {
    fontSize: 12,
    fontWeight: "700",
    color: "#38bdf8",
  },
  notaBody: {
    fontSize: 13,
    color: "#cbd5e1",
    marginTop: 4,
  },
  itemCard: {
    backgroundColor: "#1e293b",
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  itemIndex: {
    color: "#64748b",
    fontWeight: "700",
    fontSize: 14,
  },
  itemNombre: {
    fontSize: 15,
    fontWeight: "700",
    color: "#f1f5f9",
  },
  itemCategoria: {
    fontSize: 12,
    color: "#94a3b8",
  },
  itemPrecio: {
    fontSize: 15,
    fontWeight: "800",
    color: "#22c55e",
  },
  footer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: "#334155",
  },
  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f8fafc",
  },
  totalMonto: {
    fontSize: 24,
    fontWeight: "900",
    color: "#22c55e",
  },
  btnConfirmar: {
    backgroundColor: "#16a34a",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  btnConfirmarText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f8fafc",
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 16,
  },
  btnExplorar: {
    backgroundColor: "#0284c7",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnExplorarText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
