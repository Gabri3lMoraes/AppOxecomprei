import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Card from "../cards"; // Seu componente de Card
import TouchableScale from "../TouchableScale";

// Calculando a altura da tela
const { height } = Dimensions.get("window");
const SNAP_TOP = height * 0.1;
const SNAP_MIDDLE = height * 0.5;

export default function BottomSheet({
  produtos = [],
  promocoes = [],
  onProdutoPress,
  onSheetPositionChange,
  location, // Passando localização do usuário
}: any) {
  const translateY = useRef(new Animated.Value(SNAP_MIDDLE)).current;
  const isOpen = useRef(false);

  // Função para calcular distância
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Raio da Terra em km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distância em km
  };

  // Notificando mudança na posição da plataforma
  const notifyChange = (open: boolean) => {
    if (onSheetPositionChange && open !== isOpen.current) {
      isOpen.current = open;
      onSheetPositionChange(open);
    }
  };

  // PanResponder (movimento de subir/descer a plataforma)
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt) => evt.nativeEvent.locationY <= 40,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > Math.abs(gestureState.dx),
      onPanResponderMove: (_, gestureState) => {
        const newY = Math.max(SNAP_TOP, SNAP_MIDDLE + gestureState.dy);
        translateY.setValue(newY);
        if (gestureState.dy < -20) notifyChange(true);
        if (gestureState.dy > 20) notifyChange(false);
      },
      onPanResponderRelease: (_, gestureState) => {
        const goingUp = gestureState.dy < -80;
        const toValue = goingUp ? SNAP_TOP : SNAP_MIDDLE;
        Animated.spring(translateY, {
          toValue,
          useNativeDriver: true,
          speed: 25,
          bounciness: 4,
        }).start();
        notifyChange(goingUp);
      },
    })
  ).current;

  return (
    <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
      <View style={styles.header} {...panResponder.panHandlers}>
        <View style={styles.handle} />
        <Text style={styles.title}>Catálogo de Produtos</Text>
      </View>

      <ScrollView nestedScrollEnabled contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Produtos gerais */}
        <Text style={styles.sectionTitle}>Produtos próximos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {produtos.map((p: any) => {
            // Calculando a distância para cada produto
            const distance = location
              ? calculateDistance(location.latitude, location.longitude, p.latitude, p.longitude).toFixed(2)
              : "—";

            return (
              <TouchableScale key={p.id} onPress={() => onProdutoPress(p)}>
                <Card
                  image={p.image}
                  productName={p.nome}
                  storeName={p.loja}
                  price={p.preco}
                  stars={p.estrelas || 0}
                  sales={p.vendas || 0}
                  distance={distance} // Passando a distância para o Card
                />
              </TouchableScale>
            );
          })}
        </ScrollView>

        {/* Promoções */}
        {promocoes.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Promoções</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              {promocoes.map((p: any) => {
                // Calculando a distância para cada promoção
                const distance = location
                  ? calculateDistance(location.latitude, location.longitude, p.latitude, p.longitude).toFixed(2)
                  : "—";

                return (
                  <TouchableOpacity key={p.id} onPress={() => onProdutoPress(p)}>
                    <View style={styles.promoCard}>
                      <Card
                        image={p.image}
                        productName={p.nome}
                        storeName={p.loja}
                        price={p.precoNovo || p.preco}     // preço principal (caso promo não exista)
                        promoPrice={p.precoNovo}           // preço da promoção
                        oldPrice={p.precoAntigo}           // preço antigo
                        stars={p.estrelas || 0}
                        sales={p.vendas || 0}
                        distance={distance}
                      />

                      {/* Mostra selo “Promoção” */}
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>Promoção</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </>
        )}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    height: height,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 6,
  },
  header: {
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#ccc",
    marginBottom: 8,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  scrollContent: { paddingHorizontal: 15 },
  promoCard: {
    position: "relative",
    marginRight: 10,
  },
  priceBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginLeft: 10,
  },
  oldPrice: {
    color: "#888",
    textDecorationLine: "line-through",
    marginRight: 6,
    fontSize: 13,
  },
  newPrice: {
    color: "#ff6600",
    fontWeight: "bold",
    fontSize: 16,
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#ff6600",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
