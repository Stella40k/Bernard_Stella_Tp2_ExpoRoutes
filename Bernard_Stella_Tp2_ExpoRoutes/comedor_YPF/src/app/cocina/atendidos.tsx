import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useApp } from "@/context/AppContext";
import { DondeEstoy } from "@/components/DondeEstoy";

/**
 * Pantalla de Historial de Pedidos Atendidos (/cocina/atendidos).
 * Requisito G1 y G2.4:
 * - Cada pedido atendido se apila en otra Pila.
 * - Muestra del tope a la base (el último atendido primero).
 */
export default function CocinaAtendidosScreen() {
  const { pedidosAtendidos } = useApp();

  return (
    <View style={styles.container}>
      <FlatList
        data={pedidosAtendidos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>📜 Historial de Atendidos (Pila LIFO)</Text>
            <Text style={styles.subtitle}>
              Visualización del tope a la base: el pedido despachado más recientemente aparece arriba de todo.
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={styles.emptyTitle}>Sin pedidos atendidos aún</Text>
            <Text style={styles.emptySubtitle}>
              Cuando la cocina atienda un pedido de la cola, se apilará aquí en el historial.
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <View style={styles.itemCard}>
            <View style={styles.cardHeader}>
              <View style={styles.turnoRow}>
                <Text style={styles.turnoTag}>Turno</Text>
                <Text style={styles.turnoNumero}>#{item.numeroTurno}</Text>
                {index === 0 && <Text style={styles.topeBadge}>TOP DE LA PILA</Text>}
              </View>
              <Text style={styles.fecha}>{item.fecha}</Text>
            </View>

            <View style={styles.platosList}>
              {item.items.map((p, i) => (
                <Text key={i} style={styles.platoTexto}>
                  • {p.nombre} (${p.precio})
                </Text>
              ))}
            </View>

            {item.nota ? (
              <Text style={styles.notaTexto}>Nota: "{item.nota}"</Text>
            ) : null}

            <View style={styles.cardFooter}>
              <Text style={styles.totalLabel}>Total despachado:</Text>
              <Text style={styles.totalMonto}>${item.total.toLocaleString()}</Text>
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
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#f8fafc",
  },
  subtitle: {
    fontSize: 13,
    color: "#94a3b8",
    marginTop: 4,
    lineHeight: 18,
  },
  itemCard: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
    paddingBottom: 10,
    marginBottom: 10,
  },
  turnoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  turnoTag: {
    color: "#94a3b8",
    fontSize: 13,
  },
  turnoNumero: {
    color: "#22c55e",
    fontWeight: "900",
    fontSize: 20,
  },
  topeBadge: {
    backgroundColor: "#0284c7",
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "800",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  fecha: {
    color: "#64748b",
    fontSize: 12,
  },
  platosList: {
    gap: 4,
    marginBottom: 10,
  },
  platoTexto: {
    color: "#cbd5e1",
    fontSize: 13,
  },
  notaTexto: {
    fontSize: 12,
    color: "#eab308",
    fontStyle: "italic",
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#334155",
  },
  totalLabel: {
    fontSize: 13,
    color: "#94a3b8",
  },
  totalMonto: {
    fontSize: 15,
    fontWeight: "800",
    color: "#f8fafc",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f8fafc",
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 4,
  },
});
