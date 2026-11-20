import React, { useMemo } from "react";
import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from "react-native";
import { useLocalSearchParams, router, Link } from "expo-router";
import { PLATOS, CATEGORIAS_VALIDAS, normalizarCategoria } from "@/data/platos";
import { useApp } from "@/context/AppContext";
import { DondeEstoy } from "@/components/DondeEstoy";

/**
 * Pantalla de Buscador con Parámetros (/buscar?q=&categoria=).
 * Requisito G2.7:
 * Lee 'q' y 'categoria' con useLocalSearchParams y los actualiza con router.setParams sin apilar.
 * La búsqueda vive en la URL y se puede compartir con un link.
 */
export default function BuscarScreen() {
  const { q = "", categoria = "" } = useLocalSearchParams<{ q?: string; categoria?: string }>();
  const { agregarAlCarrito } = useApp();

  const handleTextoChange = (texto: string) => {
    // Actualiza en la misma pantalla sin apilar en el Stack
    router.setParams({ q: texto });
  };

  const handleCategoriaSelect = (cat: string) => {
    // Si presiona la misma, la limpia; si no, la asigna
    const nueva = categoria === cat ? "" : cat;
    router.setParams({ categoria: nueva });
  };

  const resultados = useMemo(() => {
    return PLATOS.filter((plato) => {
      const matchTexto =
        !q ||
        plato.nombre.toLowerCase().includes(q.toLowerCase()) ||
        plato.descripcion.toLowerCase().includes(q.toLowerCase());

      const categoriaFiltro = categoria ? normalizarCategoria(categoria) : null;
      const matchCategoria = !categoriaFiltro || plato.categoria === categoriaFiltro;

      return matchTexto && matchCategoria;
    });
  }, [q, categoria]);

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <Text style={styles.title}>🔍 Buscador de Platos</Text>
        <TextInput
          style={styles.input}
          placeholder="Buscar por nombre o descripción..."
          placeholderTextColor="#64748b"
          value={q}
          onChangeText={handleTextoChange}
        />

        <View style={styles.filtrosRow}>
          <Pressable
            style={[styles.chip, !categoria && styles.chipActivo]}
            onPress={() => router.setParams({ categoria: "" })}
          >
            <Text style={[styles.chipText, !categoria && styles.chipTextActivo]}>Todas</Text>
          </Pressable>

          {CATEGORIAS_VALIDAS.map((cat) => {
            const activo = categoria.toLowerCase() === cat.toLowerCase();
            return (
              <Pressable
                key={cat}
                style={[styles.chip, activo && styles.chipActivo]}
                onPress={() => handleCategoriaSelect(cat)}
              >
                <Text style={[styles.chipText, activo && styles.chipTextActivo]}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No se encontraron platos que coincidan con la búsqueda.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.platoCard}>
            <View style={styles.platoHeader}>
              <Text style={styles.platoNombre}>{item.nombre}</Text>
              <Text style={styles.platoCategoria}>{item.categoria}</Text>
            </View>
            <Text style={styles.platoDescripcion}>{item.descripcion}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.platoPrecio}>${item.precio.toLocaleString()}</Text>
              <View style={styles.buttonsGroup}>
                <Link
                  href={{
                    pathname: "/menu/[id]",
                    params: { id: item.id.toString() },
                  }}
                  asChild
                >
                  <Pressable style={styles.btnDetalle}>
                    <Text style={styles.btnDetalleText}>Ver</Text>
                  </Pressable>
                </Link>
                <Pressable
                  style={styles.btnAgregar}
                  onPress={() => agregarAlCarrito(item)}
                >
                  <Text style={styles.btnAgregarText}>+ Carrito</Text>
                </Pressable>
              </View>
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
  searchHeader: {
    padding: 16,
    backgroundColor: "#1e293b",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#f8fafc",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "#ffffff",
    fontSize: 14,
  },
  filtrosRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
  },
  chipActivo: {
    backgroundColor: "#0284c7",
    borderColor: "#38bdf8",
  },
  chipText: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "600",
  },
  chipTextActivo: {
    color: "#ffffff",
    fontWeight: "700",
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    padding: 30,
    alignItems: "center",
  },
  emptyText: {
    color: "#94a3b8",
    textAlign: "center",
    fontSize: 14,
  },
  platoCard: {
    backgroundColor: "#1e293b",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#334155",
  },
  platoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  platoNombre: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f1f5f9",
    flex: 1,
  },
  platoCategoria: {
    fontSize: 11,
    color: "#38bdf8",
    backgroundColor: "#0f172a",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  platoDescripcion: {
    fontSize: 13,
    color: "#94a3b8",
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#334155",
  },
  platoPrecio: {
    fontSize: 16,
    fontWeight: "800",
    color: "#22c55e",
  },
  buttonsGroup: {
    flexDirection: "row",
    gap: 8,
  },
  btnDetalle: {
    backgroundColor: "#334155",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnDetalleText: {
    color: "#f8fafc",
    fontSize: 12,
    fontWeight: "600",
  },
  btnAgregar: {
    backgroundColor: "#0284c7",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnAgregarText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },
});
