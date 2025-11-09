import React from "react";
import { TouchableOpacity } from "react-native";
import Card from "../cards";

export default function ProductCard({ product, onPress }: any) {
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => onPress(product)}>
      <Card
        image={product.image}
        productName={product.nome}
        storeName={product.loja}
        price={product.preco}
        stars={product.estrelas}
        sales={product.vendas}
        distancia={product.distancia}
      />
    </TouchableOpacity>
  );
}
