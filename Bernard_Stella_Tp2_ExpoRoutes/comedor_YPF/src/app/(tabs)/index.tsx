import React from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { Link, router } from "expo-router";
import { useApp } from "@/context/AppContext";
import { CATEGORIAS_VALIDAS } from "@/data/platos";
import { DondeEstoy } from "@/components/DondeEstoy";

/**
 * Pantalla Principal de Inicio (/).
 * Requisito G1: Saludo y tarjetas de acceso rápido (Menú, Buscar, Ayuda, Cocina).
 */
export default function InicioScreen() {
  const { usuario, cerrarSesion, cantidadItems, cantidadEnEspera } = useApp();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Banner de Bienvenida */}
        <View style={styles.heroCard}>
          <Text style={styles.heroBadge}>INSTITUTO POLITÉCNICO FORMOSA</Text>
          <Text style={styles.heroTitle}>Comedor Universitario IPF 🍽️</Text>
          <Text style={styles.heroSubtitle}>
            Hacé tu pedido desde tu celular y retiralo en el mostrador sin demoras innecesarias.
          </Text>

          {usuario ? (
            <View style={styles.userBadgeRow}>
              <View style={styles.userStatus}>
                <Text style={styles.userStatusText}>👤 {usuario.nombre} (Sesión activa)</Text>
              </View>
              <Pressable style={styles.btnLogoutSmall} onPress={cerrarSesion}>
                <Text style={styles.btnLogoutSmallText}>Salir</Text>
              </Pressable>
            </View>
          ) : (
            <Link href="/login" asChild>
              <Pressable style={styles.btnLoginCocina}>
                <Text style={styles.btnLoginCocinaText}>🔒 Acceso a Cocina (Personal)</Text>
              </Pressable>
            </Link>
          )}
        </View>

        {/* Tarjetas de Acceso Rápido */}
        <Text style={styles.sectionHeader}>Accesos Rápidos</Text>
        <View style={styles.grid}>
          {/* Tarjeta Menú */}
          <Link href="/menu" asChild>
            <Pressable style={styles.gridCard}>
              <Text style={styles.cardEmoji}>📖</Text>
              <Text style={styles.cardTitle}>Ver Menú</Text>
              <Text style={styles.cardDesc}>Explorá platos organizados por categoría</Text>
            </Pressable>
          </Link>

          {/* Tarjeta Buscar */}
          <Link href="/buscar" asChild>
            <Pressable style={styles.gridCard}>
              <Text style={styles.cardEmoji}>🔍</Text>
              <Text style={styles.cardTitle}>Buscador</Text>
              <Text style={styles.cardDesc}>Filtros por nombre y categoría en tiempo real</Text>
            </Pressable>
          </Link>

          {/* Tarjeta Carrito */}
          <Link href="/carrito" asChild>
            <Pressable style={styles.gridCard}>
              <Text style={styles.cardEmoji}>🛒</Text>
              <Text style={styles.cardTitle}>Mi Carrito</Text>
              <Text style={styles.cardDesc}>
                {cantidadItems > 0 ? `${cantidadItems} plato(s) esperando` : "Revisá tu pedido actual"}
              </Text>
            </Pressable>
          </Link>

          {/* Tarjeta Ayuda */}
          <Link href="/ayuda" asChild>
            <Pressable style={styles.gridCard}>
              <Text style={styles.cardEmoji}>❓</Text>
              <Text style={styles.cardTitle}>Centro de Ayuda</Text>
              <Text style={styles.cardDesc}>Medios de pago, horarios y preguntas frecuentes</Text>
            </Pressable>
          </Link>

          {/* Tarjeta Cocina */}
          <Pressable
            style={[styles.gridCard, styles.cocinaCard]}
            onPress={() => {
              if (usuario) {
                router.push("/cocina");
              } else {
                router.push("/login");
              }
            }}
          >
            <Text style={styles.cardEmoji}>👨‍🍳</Text>
            <Text style={styles.cardTitle}>Panel Cocina</Text>
            <Text style={styles.cardDesc}>
              {usuario
                ? `${cantidadEnEspera} pedidos en cola (FIFO)`
                : "Requiere iniciar sesión"}
            </Text>
          </Pressable>
        </View>

        {/* Accesos a Categorías directas (Deep Link / Stack Raíz) */}
        <Text style={styles.sectionHeader}>Explorar Categorías</Text>
        <View style={styles.categoriasRow}>
          {CATEGORIAS_VALIDAS.map((cat) => (
            <Link
              key={cat}
              href={{
                pathname: "/categorias/[categoria]",
                params: { categoria: cat },
              }}
              asChild
            >
              <Pressable style={styles.catChip}>
                <Text style={styles.catChipText}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Text>
              </Pressable>
            </Link>
          ))}
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
  heroCard: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 20,
  },
  heroBadge: {
    fontSize: 11,
    fontWeight: "700",
    color: "#38bdf8",
    letterSpacing: 1,
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#f8fafc",
  },
  heroSubtitle: {
    fontSize: 13,
    color: "#94a3b8",
    marginTop: 6,
    lineHeight: 18,
  },
  btnLoginCocina: {
    alignSelf: "flex-start",
    backgroundColor: "#334155",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 14,
  },
  btnLoginCocinaText: {
    color: "#cbd5e1",
    fontSize: 12,
    fontWeight: "600",
  },
  userBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    backgroundColor: "#0f172a",
    padding: 10,
    borderRadius: 8,
  },
  userStatus: {
    flex: 1,
  },
  userStatusText: {
    color: "#22c55e",
    fontWeight: "700",
    fontSize: 13,
  },
  btnLogoutSmall: {
    backgroundColor: "#e11d48",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  btnLogoutSmallText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "800",
    color: "#f1f5f9",
    marginBottom: 12,
    marginTop: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  gridCard: {
    width: "48%",
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#334155",
  },
  cocinaCard: {
    borderColor: "#0284c7",
    width: "100%",
  },
  cardEmoji: {
    fontSize: 26,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f8fafc",
  },
  cardDesc: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 4,
  },
  categoriasRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  catChip: {
    backgroundColor: "#1e293b",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#334155",
  },
  catChipText: {
    color: "#38bdf8",
    fontWeight: "700",
    fontSize: 13,
  },
});
