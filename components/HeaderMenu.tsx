import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HeaderMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* 🔝 Barra superior */}
      <View style={styles.header}>
        <Text style={styles.username}>Olá, Gabriel </Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#777" />
          <TextInput
            placeholder="Pesquisar produto..."
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>

        {/* Botão de abrir o menu */}
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
          <Ionicons name="menu" size={26} color="#333" />
        </TouchableOpacity>
      </View>

      {/* 🧭 Menu lateral esquerdo */}
      {menuOpen && (
        <View style={styles.sideMenu}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="person-circle-outline" size={22} color="#333" />
            <Text style={styles.menuText}>Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={22} color="#333" />
            <Text style={styles.menuText}>Configurações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="log-out-outline" size={22} color="#333" />
            <Text style={styles.menuText}>Sair</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingHorizontal: 8,
    flex: 1,
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 6,
    fontSize: 14,
    color: "#333",
  },
  sideMenu: {
    position: "absolute",
    top: 50,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 10,
    width: 180,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    zIndex: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  menuText: {
    fontSize: 15,
    marginLeft: 10,
    color: "#333",
  },
});
