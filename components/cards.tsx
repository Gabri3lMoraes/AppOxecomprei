import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Card({
  image,
  productName,
  storeName,
  price,
  stars,
  sales,
  promoPrice,
  oldPrice,
}: any) {
  // Formata o preço com vírgula
  const formatPrice = (price: string | number) => {
    if (price === undefined || price === null) return "R$ 0,00";
    return `R$ ${String(price).replace(".", ",")}`;
  };

  // Exibir estrelas
  const displayStars = (stars: number) => {
    if (stars === undefined || stars === null) return "Sem avaliação";
    return `${stars} ⭐`;
  };

  // Exibir vendas
  const displaySales = (sales: number) => {
    if (sales === undefined || sales === null) return "0 vendas";
    return `${sales} vendas`;
  };

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.productName} numberOfLines={1}>
        {productName}
      </Text>
      <Text style={styles.storeName}>{storeName}</Text>

      <View style={styles.priceContainer}>
        {promoPrice ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.oldPrice}>{formatPrice(oldPrice)}</Text>
            <Text style={styles.newPrice}>{formatPrice(promoPrice)}</Text>
          </View>
        ) : (
          <Text style={styles.price}>{formatPrice(price)}</Text>
        )}
      </View>

      <Text style={styles.small}>{displaySales(sales)}</Text>
      <Text style={styles.small}>{displayStars(stars)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    marginRight: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    justifyContent: "space-between",
  },
  image: { width: "100%", height: 100, borderRadius: 8 },
  productName: { fontWeight: "700", marginTop: 8, fontSize: 14 },
  storeName: { color: "#666", fontSize: 12 },
  priceContainer: { marginTop: 6 },
  price: { color: "#ff6600", fontWeight: "700", fontSize: 14 },
  oldPrice: {
    color: "#888",
    textDecorationLine: "line-through",
    marginRight: 6,
    fontSize: 13,
  },
  newPrice: {
    color: "#ff6600",
    fontWeight: "700",
    fontSize: 15,
  },
  small: { color: "#777", fontSize: 12 },
});
