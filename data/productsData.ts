// data/productsData.ts

export const produtos = [
  { id: 1, nome: "Bolsa Carteiro Unissex", preco: "R$ 5,00", loja: "Mercado", latitude: -8.0476, longitude: -34.877, image: require("../assets/produtos/bolsa.jpg"), vendas: 230, estrelas: 4.8, distancia: 0 }, // Exemplo de distância
  { id: 2, nome: "Tênis Casual", preco: "R$ 120,00", loja: "Loja Esportiva", latitude: -8.045, longitude: -34.875, image: require("../assets/produtos/polo.png"), vendas: 95, estrelas: 4.3, distancia: 0 },
  { id: 3, nome: "Camisa Polo", preco: "R$ 60,00", loja: "Loja Esportiva", latitude: -8.046, longitude: -34.874, image: require("../assets/produtos/tenis.jpg"), vendas: 140, estrelas: 4.6, distancia: 0 },
  { id: 4, nome: "Camisa Elegante Polo", preco: "R$ 60,00", loja: "Loja Esportiva", latitude: -7.963, longitude: -34.849, image: require("../assets/produtos/polo2.png"), vendas: 40, estrelas: 4.1, distancia: 0 },
  { id: 5, nome: "Sandália Feminina", preco: "R$ 70,00", loja: "Loja de Calçados", latitude: -7.964, longitude: -34.843, image: require("../assets/produtos/sandaliafe.png"), vendas: 75, estrelas: 4.4, distancia: 0 },
  { id: 6, nome: "Camisa Social", preco: "R$ 80,00", loja: "Loja Esportiva", latitude: -7.961, longitude: -34.846, image: require("../assets/produtos/camisa2.png"), vendas: 60, estrelas: 4.2, distancia: 0 },
  { id: 7, nome: "Calça Jeans", preco: "R$ 100,00", loja: "Loja de Roupas", latitude: -8.046, longitude: -34.874, image: require("../assets/produtos/calcasle.png"), vendas: 110, estrelas: 4.5, distancia: 0 },
];


// 🛍️ Produtos em promoção
export const promocoes = [
  {
    id: 101,
    nome: "Bolsa Carteiro Unissex",
    loja: "Mercado",
    precoAntigo: 50.0,
    precoNovo: 15.0,
    latitude: -8.1476,
    longitude: -34.877,
    image: require("../assets/produtos/bolsa.jpg"),
    vendas: 12,
    estrelas: 4.0,
  },
  {
    id: 102,
    nome: "Tênis Casual",
    loja: "Loja Esportiva",
    precoAntigo: 120.0,
    precoNovo: 90.0,
    latitude: -8.045,
    longitude: -34.875,
    image: require("../assets/produtos/polo.png"),
    vendas: 8,
    estrelas: 3.9,
  },
  {
    id: 103,
    nome: "Camisa Polo",
    loja: "Loja Esportiva",
    precoAntigo: 60.0,
    precoNovo: 40.0,
    latitude: -8.046,
    longitude: -34.874,
    image: require("../assets/produtos/tenis.jpg"),
    vendas: 20,
    estrelas: 4.6,
  },
  {
    id: 104,
    nome: "Sandália Feminina",
    loja: "Loja de Calçados",
    precoAntigo: 70.0,
    precoNovo: 49.9,
    latitude: -7.964,
    longitude: -34.843,
    image: require("../assets/produtos/sandaliafe.png"),
    vendas: 18,
    estrelas: 4.5,
  },
  {
    id: 105,
    nome: "Camisa Social",
    loja: "Loja Esportiva",
    precoAntigo: 80.0,
    precoNovo: 55.0,
    latitude: -7.961,
    longitude: -34.846,
    image: require("../assets/produtos/camisa2.png"),
    vendas: 15,
    estrelas: 4.3,
  },
];
