import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from "react-native";
import { router } from "expo-router";
import { useApp } from "@/context/AppContext";
import { DondeEstoy } from "@/components/DondeEstoy";

export default function LoginScreen() {
  const { iniciarSesion } = useApp();
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleIngresar = () => {
    if (!usuario.trim() || !clave.trim()) {
      setError("Por favor complete usuario y contraseña.");
      return;
    }

    const exito = iniciarSesion(usuario, clave);
    if (exito) {
      setError(null);
      // Al cambiar el estado de sesión a conSesion=true, Stack.Protected desmonta
      // automáticamente la pantalla de login. También podemos navegar explícitamente a /cocina:
      router.replace("/cocina");
    } else {
      setError("Credenciales incorrectas. Pruebe con 'cocina' y '1234'.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.title}>🔐 Acceso a Cocina</Text>
        <Text style={styles.subtitle}>
          Ingreso exclusivo para el personal del comedor del Instituto Politécnico Formosa
        </Text>

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <Text style={styles.label}>Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: cocina"
          placeholderTextColor="#64748b"
          autoCapitalize="none"
          value={usuario}
          onChangeText={setUsuario}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 1234"
          placeholderTextColor="#64748b"
          secureTextEntry
          value={clave}
          onChangeText={setClave}
        />

        <Pressable style={styles.loginButton} onPress={handleIngresar}>
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </Pressable>

        <Pressable style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
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
  formCard: {
    backgroundColor: "#1e293b",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    marginTop: 20,
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
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#cbd5e1",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: "#ffffff",
    marginBottom: 16,
  },
  errorBox: {
    backgroundColor: "#450a0a",
    borderColor: "#991b1b",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 14,
  },
  errorText: {
    color: "#fca5a5",
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: "#0284c7",
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 15,
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
    fontWeight: "600",
  },
});
