import React from "react";
import Card from "../cards";

export default function PromoCard({ promo }: any) {
  return (
    <Card
      image={promo.image}
      productName={promo.nome}
      storeName={promo.loja}
      price={promo.preco}
      distancia={promo.distancia}
      stars={promo.estrelas}
      sales={promo.vendas}
      promoPrice={promo.precoNovo}
      oldPrice={promo.precoAntigo}
    />
  );
}
