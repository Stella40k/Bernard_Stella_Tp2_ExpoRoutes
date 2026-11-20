import React from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { useLocalSearchParams, router, Link } from "expo-router";
import { DondeEstoy } from "@/components/DondeEstoy";

/**
 * Pantalla Catch-all de Ayuda (/ayuda/[...slug].tsx).
 * Captura rutas de profundidad variable como /ayuda/pagos/tarjeta o /ayuda/horarios.
 */
export default function AyudaCatchAllScreen() {
  const { slug } = useLocalSearchParams<{ slug: string[] | string }>();

  // slug llega como array de segmentos o string si es único
  const segmentos = Array.isArray(slug) ? slug : slug ? [slug] : [];
  const rutaCompleta = `/ayuda/${segmentos.join("/")}`;

  // Base de conocimientos simulada para responder según los segmentos
  const obtenerContenido = () => {
    const clave = segmentos.join("/");
    if (clave.includes("pagos/efectivo")) {
      return {
        titulo: "Pago en Efectivo",
        cuerpo:
          "Podés abonar tu pedido directamente en la ventanilla de caja al momento de retirar tu comida con tu número de turno asignado.",
      };
    }
    if (clave.includes("pagos/tarjeta")) {
      return {
        titulo: "Pago con Tarjetas y QR",
        cuerpo:
          "Aceptamos tarjetas de débito, crédito y pagos con transferencias mediante código QR interoperable en la caja del instituto.",
      };
    }
    if (clave.includes("horarios")) {
      return {
        titulo: "Horarios de Atención",
        cuerpo:
          "El comedor abre sus puertas de Lunes a Viernes de 07:30 a 21:00 hs. Desayunos de 07:30 a 11:00 hs y Almuerzos de 11:30 a 15:00 hs.",
      };
    }
    if (clave.includes("pedidos")) {
      return {
        titulo: "Gestión de Pedidos y Espera",
        cuerpo:
          "El sistema encola los pedidos en estricto orden de confirmación (FIFO). Cada pedido toma aproximadamente 3 minutos de preparación.",
      };
    }
    return {
      titulo: `Artículo: ${segmentos.join(" > ")}`,
      cuerpo:
        "Este es un artículo de ayuda dinámico resuelto a través de la ruta comodín catch-all [...slug].tsx.",
    };
  };

  const contenido = obtenerContenido();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.breadcrumb}>Ayuda &gt; {segmentos.join(" &gt; ")}</Text>
          <Text style={styles.title}>{contenido.titulo}</Text>
          <Text style={styles.pathBadge}>{rutaCompleta}</Text>
          <Text style={styles.body}>{contenido.cuerpo}</Text>

          <View style={styles.buttonsRow}>
            <Link href="/ayuda" asChild>
              <Pressable style={styles.buttonSecondary}>
                <Text style={styles.buttonSecondaryText}>Índice de Ayuda</Text>
              </Pressable>
            </Link>

            <Pressable style={styles.buttonPrimary} onPress={() => router.back()}>
              <Text style={styles.buttonPrimaryText}>Volver</Text>
            </Pressable>
          </View>
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
  breadcrumb: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 8,
    textTransform: "capitalize",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#f8fafc",
  },
  pathBadge: {
    fontSize: 12,
    fontFamily: "monospace",
    backgroundColor: "#0f172a",
    color: "#38bdf8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginVertical: 10,
  },
  body: {
    fontSize: 15,
    color: "#cbd5e1",
    lineHeight: 22,
    marginTop: 8,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  buttonPrimary: {
    flex: 1,
    backgroundColor: "#0284c7",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonPrimaryText: {
    color: "#ffffff",
    fontWeight: "700",
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: "#334155",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonSecondaryText: {
    color: "#cbd5e1",
    fontWeight: "600",
  },
});
