import React from "react";
import { StyleSheet, Text, View, Pressable, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import { useApp } from "@/context/AppContext";
import { DondeEstoy } from "@/components/DondeEstoy";

/**
 * Pantalla Modal de Confirmación de Pedido (/confirmar).
 * Requisito G2.5: Al confirmar, pasa de /confirmar a /turno/[numero] utilizando router.replace
 * de forma que "Atrás" no vuelva a la pantalla de confirmación.
 */
export default function ConfirmarScreen() {
  const { carrito, totalCarrito, nota, confirmarPedido } = useApp();

  const handleConfirmar = () => {
    if (carrito.length === 0) {
      Alert.alert("Carrito vacío", "No tienes platos para confirmar.");
      return;
    }

    // Encola el pedido y obtiene el número de turno correlativo
    const numeroTurno = confirmarPedido();

    // Navega reemplazando la pantalla modal para que 'atrás' no permita reenviar el pedido
    router.replace(`/turno/${numeroTurno}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>📋 Resumen del Pedido</Text>
          <Text style={styles.subtitle}>
            Verifica tus platos antes de enviar la comanda a la cocina:
          </Text>

          <View style={styles.itemsList}>
            {carrito.map((item, index) => (
              <View key={`${item.id}-${index}`} style={styles.itemRow}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.nombre}</Text>
                  <Text style={styles.itemCategory}>{item.categoria}</Text>
                </View>
                <Text style={styles.itemPrice}>${item.precio.toLocaleString()}</Text>
              </View>
            ))}
          </View>

          {nota ? (
            <View style={styles.notaCard}>
              <Text style={styles.notaLabel}>📝 Aclaración para la cocina:</Text>
              <Text style={styles.notaTexto}>{nota}</Text>
            </View>
          ) : (
            <Text style={styles.sinNota}>Sin aclaraciones especiales.</Text>
          )}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total a pagar:</Text>
            <Text style={styles.totalValue}>${totalCarrito.toLocaleString()}</Text>
          </View>

          <Pressable style={styles.confirmButton} onPress={handleConfirmar}>
            <Text style={styles.confirmButtonText}>✅ Confirmar y Enviar a Cocina</Text>
          </Pressable>

          <Pressable style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Volver al Carrito</Text>
          </Pressable>
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
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#f8fafc",
  },
  subtitle: {
    fontSize: 13,
    color: "#94a3b8",
    marginTop: 6,
    marginBottom: 16,
  },
  itemsList: {
    marginVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#334155",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#f1f5f9",
  },
  itemCategory: {
    fontSize: 12,
    color: "#64748b",
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: "#38bdf8",
  },
  notaCard: {
    marginTop: 14,
    backgroundColor: "#0f172a",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#eab308",
  },
  notaLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#eab308",
  },
  notaTexto: {
    fontSize: 14,
    color: "#f8fafc",
    marginTop: 4,
  },
  sinNota: {
    marginTop: 12,
    fontSize: 12,
    color: "#64748b",
    fontStyle: "italic",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 14,
    borderTopWidth: 2,
    borderTopColor: "#475569",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f8fafc",
  },
  totalValue: {
    fontSize: 22,
    fontWeight: "900",
    color: "#22c55e",
  },
  confirmButton: {
    backgroundColor: "#16a34a",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 22,
  },
  confirmButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  cancelButton: {
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  cancelButtonText: {
    color: "#94a3b8",
    fontSize: 14,
  },
});
