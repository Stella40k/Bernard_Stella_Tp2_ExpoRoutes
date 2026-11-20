import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { router } from "expo-router";
import { useApp } from "@/context/AppContext";
import { DondeEstoy } from "@/components/DondeEstoy";

/**
 * Pantalla de Nota para Cocina (/carrito/nota).
 * Opcional extra / Requisito G1: Se abre como formSheet o dentro de la tab Carrito.
 */
export default function NotaScreen() {
  const { nota, setNota } = useApp();
  const [texto, setTexto] = useState(nota);

  const handleGuardar = () => {
    setNota(texto.trim());
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>📝 Aclaración para la Cocina</Text>
        <Text style={styles.subtitle}>
          Indica detalles sobre tu orden (por ejemplo: "sin sal", "aderezo aparte", "sin hielo").
        </Text>

        <TextInput
          style={styles.textArea}
          placeholder="Escribe tu aclaración aquí..."
          placeholderTextColor="#64748b"
          multiline
          numberOfLines={4}
          value={texto}
          onChangeText={setTexto}
        />

        <View style={styles.buttonsRow}>
          <Pressable style={styles.btnGuardar} onPress={handleGuardar}>
            <Text style={styles.btnGuardarText}>Guardar Aclaración</Text>
          </Pressable>

          <Pressable style={styles.btnCancelar} onPress={() => router.back()}>
            <Text style={styles.btnCancelarText}>Cerrar</Text>
          </Pressable>
        </View>
      </View>

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 16,
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#f8fafc",
  },
  subtitle: {
    fontSize: 13,
    color: "#94a3b8",
    marginTop: 6,
    marginBottom: 16,
  },
  textArea: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 10,
    padding: 14,
    color: "#ffffff",
    fontSize: 14,
    minHeight: 100,
    textAlignVertical: "top",
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },
  btnGuardar: {
    flex: 1,
    backgroundColor: "#0284c7",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnGuardarText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
  btnCancelar: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  btnCancelarText: {
    color: "#94a3b8",
    fontWeight: "600",
  },
});
