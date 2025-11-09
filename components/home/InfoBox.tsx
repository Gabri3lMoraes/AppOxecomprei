// components/home/InfoBox.tsx
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

interface InfoBoxProps {
  produto: {
    id: number;
    nome: string;
    preco: string;
    loja: string;
    descricao?: string;
    image?: any;
    estrelas?: number;
    distancia?: string; // Adicionando a distância
  };
  onClose: () => void;
  onVisitarLoja: (produto: any) => void;
}

const InfoBox: React.FC<InfoBoxProps> = ({ produto, onClose, onVisitarLoja }) => {
  if (!produto) return null;

  return (
    <View style={styles.infoBox}>
      <Image
        source= {require("../../assets/produtos/comercio3d.png")}
        style={styles.infoImage}
        resizeMode="contain"
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.infoTitle}>{produto.nome}</Text>
        <Text style={styles.infoLoja}>{produto.loja}</Text>
        <Text style={styles.infoPreco}>{produto.preco}</Text>
        <Text style={styles.infoDistancia}>{produto.distancia} km de você</Text>

        {produto.descricao ? (
          <Text style={styles.infoDesc}>{produto.descricao}</Text>
        ) : null}

        <View style={styles.ratingRow}>
          {[...Array(5)].map((_, i) => (
            <Text
              key={i}
              style={{
                color: i < (produto.estrelas ?? 4) ? "#FFD700" : "#CCC",
                fontSize: 14,
              }}
            >
              ★
            </Text>
          ))}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#ff6600" }]}
            onPress={() => onVisitarLoja(produto)}
          >
            <Text style={styles.btnText}>Visitar loja</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#555" }]}
            onPress={onClose}
          >
            <Text style={styles.btnText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InfoBox;

const styles = StyleSheet.create({
  infoBox: {
    position: "absolute",
    bottom: 400,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    zIndex: 9999,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    
    justifyContent: 'center',
    gap: 10,
  },
  infoImage: { width: 100, height: 100, borderRadius: 10 },
  infoTitle: { fontSize: 16, fontWeight: "bold" },
  infoLoja: { fontSize: 14, color: "#777" },
  infoPreco: { fontSize: 15, fontWeight: "600", color: "#ff6600", marginTop: 4 },
  infoDistancia: { fontSize: 13, color: "#555", marginTop: 5 }, // Novo estilo para a distância
  infoDesc: { fontSize: 13, color: "#555", marginTop: 5 },
  ratingRow: { flexDirection: "row", marginTop: 5 },
  buttonRow: { flexDirection: "row", marginTop: 8, gap: 10 },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 13 },
});
