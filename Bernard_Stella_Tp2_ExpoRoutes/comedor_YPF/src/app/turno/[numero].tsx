import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useApp } from "@/context/AppContext";
import { DondeEstoy } from "@/components/DondeEstoy";

/**
 * Pantalla de Turno Asignado (/turno/[numero]).
 * Muestra el número de comanda, cuántos pedidos hay adelante en la cola (FIFO)
 * y el tiempo estimado (opcional: multiplicando la posición por 3 minutos).
 */
export default function TurnoScreen() {
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const { obtenerPosicionEnCola } = useApp();

  const numTurno = Number(numero);
  const infoCola = obtenerPosicionEnCola(numTurno);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.congrats}>¡Pedido recibido con éxito!</Text>
        <Text style={styles.labelTurno}>Tu número de turno es:</Text>
        <View style={styles.turnoBadge}>
          <Text style={styles.turnoNumero}>#{numero}</Text>
        </View>

        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Pedidos adelante en la cola:</Text>
            <Text style={styles.infoValue}>{infoCola.posicion}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tiempo estimado de espera:</Text>
            <Text style={styles.infoHighlight}>
              ~{infoCola.tiempoEstimadoMinutos} min
            </Text>
          </View>
        </View>

        <Text style={styles.helpText}>
          Te llamaremos por pantalla cuando tu comanda esté lista en el mostrador.
        </Text>

        <Pressable style={styles.homeButton} onPress={() => router.replace("/")}>
          <Text style={styles.homeButtonText}>Volver a la Pantalla Principal</Text>
        </Pressable>
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
    backgroundColor: "#1e293b",
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
    marginTop: 20,
  },
  congrats: {
    fontSize: 20,
    fontWeight: "800",
    color: "#22c55e",
  },
  labelTurno: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 14,
  },
  turnoBadge: {
    backgroundColor: "#0284c7",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 16,
    marginVertical: 14,
  },
  turnoNumero: {
    fontSize: 48,
    fontWeight: "900",
    color: "#ffffff",
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#0f172a",
    padding: 14,
    borderRadius: 12,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 14,
    color: "#cbd5e1",
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#f8fafc",
  },
  infoHighlight: {
    fontSize: 15,
    fontWeight: "800",
    color: "#38bdf8",
  },
  helpText: {
    fontSize: 13,
    color: "#64748b",
    textAlign: "center",
    marginVertical: 10,
  },
  homeButton: {
    backgroundColor: "#334155",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  homeButtonText: {
    color: "#f8fafc",
    fontSize: 14,
    fontWeight: "600",
  },
});
