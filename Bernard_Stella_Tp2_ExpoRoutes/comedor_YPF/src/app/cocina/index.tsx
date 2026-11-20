import React from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from "react-native";
import { useApp } from "@/context/AppContext";
import { DondeEstoy } from "@/components/DondeEstoy";

/**
 * Pantalla Principal de Cocina (/cocina).
 * Requisito G1, G2.2:
 * - Muestra el pedido del frente de la cola (frente()).
 * - Cantidad total en espera.
 * - Botón "Atender siguiente" que desencola y lo apila en el historial de atendidos.
 * - Nadie puede "colarse" (orden estricto FIFO).
 */
export default function CocinaIndexScreen() {
  const {
    pedidoActualCocina,
    cantidadEnEspera,
    pedidosEnEspera,
    atenderSiguiente,
    cerrarSesion,
  } = useApp();

  const handleAtender = () => {
    if (!pedidoActualCocina) {
      Alert.alert("Cola vacía", "No hay pedidos pendientes en la cola.");
      return;
    }
    const atendido = atenderSiguiente();
    if (atendido) {
      Alert.alert(
        "Pedido Despachado",
        `Se atendió el Turno #${atendido.numeroTurno}. Pasó a la Pila de Historial.`
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>👨‍🍳 Monitor de Comandas (FIFO)</Text>
          <View style={styles.esperaBadge}>
            <Text style={styles.esperaBadgeText}>
              {cantidadEnEspera} pedido(s) en espera
            </Text>
          </View>
        </View>

        {pedidoActualCocina ? (
          <View style={styles.actualCard}>
            <View style={styles.actualHeader}>
              <Text style={styles.actualTag}>FRENTE DE LA COLA (PRÓXIMO A SALIR)</Text>
              <Text style={styles.turnoGrande}>#{pedidoActualCocina.numeroTurno}</Text>
            </View>

            <Text style={styles.hora}>Hora de ingreso: {pedidoActualCocina.fecha}</Text>

            {pedidoActualCocina.nota ? (
              <View style={styles.notaBox}>
                <Text style={styles.notaLabel}>⚠️ Aclaración especial del alumno:</Text>
                <Text style={styles.notaTexto}>{pedidoActualCocina.nota}</Text>
              </View>
            ) : null}

            <Text style={styles.platosTitle}>Platos a preparar:</Text>
            <View style={styles.platosList}>
              {pedidoActualCocina.items.map((item, idx) => (
                <View key={idx} style={styles.platoRow}>
                  <Text style={styles.platoBullet}>•</Text>
                  <Text style={styles.platoNombre}>{item.nombre}</Text>
                  <Text style={styles.platoCat}>({item.categoria})</Text>
                </View>
              ))}
            </View>

            <Pressable style={styles.btnAtender} onPress={handleAtender}>
              <Text style={styles.btnAtenderText}>🔔 Atender Siguiente (Desencolar)</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>✨</Text>
            <Text style={styles.emptyTitle}>No hay comandas en espera</Text>
            <Text style={styles.emptySubtitle}>
              Todos los pedidos han sido atendidos. La cola está vacía.
            </Text>
          </View>
        )}

        {/* Lista de siguientes en la fila */}
        {pedidosEnEspera.length > 1 && (
          <View style={styles.siguientesSection}>
            <Text style={styles.siguientesTitle}>Próximos en la cola:</Text>
            {pedidosEnEspera.slice(1).map((p, index) => (
              <View key={p.id} style={styles.siguienteItem}>
                <Text style={styles.siguienteTurno}>#{p.numeroTurno}</Text>
                <Text style={styles.siguienteDetalle}>
                  {p.items.length} ítems • {p.fecha}
                </Text>
                <Text style={styles.siguientePosicion}>Posición {index + 2}</Text>
              </View>
            ))}
          </View>
        )}
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
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#f8fafc",
  },
  esperaBadge: {
    backgroundColor: "#0284c7",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  esperaBadgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },
  actualCard: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#38bdf8",
  },
  actualHeader: {
    alignItems: "center",
    marginBottom: 10,
  },
  actualTag: {
    fontSize: 11,
    fontWeight: "800",
    color: "#38bdf8",
    letterSpacing: 1,
  },
  turnoGrande: {
    fontSize: 54,
    fontWeight: "900",
    color: "#ffffff",
    marginTop: 4,
  },
  hora: {
    fontSize: 12,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 14,
  },
  notaBox: {
    backgroundColor: "#0f172a",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#eab308",
    marginBottom: 14,
  },
  notaLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#eab308",
  },
  notaTexto: {
    fontSize: 14,
    color: "#f8fafc",
    marginTop: 2,
  },
  platosTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#cbd5e1",
    marginBottom: 8,
  },
  platosList: {
    backgroundColor: "#0f172a",
    padding: 12,
    borderRadius: 10,
    gap: 8,
    marginBottom: 18,
  },
  platoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  platoBullet: {
    color: "#38bdf8",
    fontSize: 16,
    fontWeight: "900",
  },
  platoNombre: {
    color: "#f8fafc",
    fontSize: 14,
    fontWeight: "600",
  },
  platoCat: {
    color: "#64748b",
    fontSize: 12,
  },
  btnAtender: {
    backgroundColor: "#16a34a",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  btnAtenderText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  emptyCard: {
    backgroundColor: "#1e293b",
    padding: 30,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
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
  siguientesSection: {
    marginTop: 20,
  },
  siguientesTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#cbd5e1",
    marginBottom: 10,
  },
  siguienteItem: {
    backgroundColor: "#1e293b",
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#334155",
  },
  siguienteTurno: {
    color: "#38bdf8",
    fontWeight: "800",
    fontSize: 16,
  },
  siguienteDetalle: {
    color: "#cbd5e1",
    fontSize: 13,
  },
  siguientePosicion: {
    color: "#64748b",
    fontSize: 12,
  },
});
