// screen/home.tsx
import React, { useRef, useEffect, useState } from "react";
import { View, ActivityIndicator, Alert, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import BottomSheet from "../components/home/BottomSheet";
import MarkerItem from "../components/home/MarkerIcon";
import InfoBox from "../components/home/InfoBox";
import { produtos, promocoes } from "../data/productsData";
import { Animated } from "react-native";
import HeaderMenu from "../components/HeaderMenu";
import { SafeAreaView } from "react-native-safe-area-context";

// Função para calcular a distância (Haversine)
function calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Raio da Terra em km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distância em km
}

export default function Home() {
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);
  const [produtosComDistancia, setProdutosComDistancia] = useState<any[]>([]); // Adicionando o estado para produtos com distância
  const [sheetAberta, setSheetAberta] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const mapRef = useRef<MapView | null>(null);
  const markerRefs = useRef<Record<number, any>>({});

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Você precisa permitir acesso à localização.");
        setLoading(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      setLoading(false);

      // Calculando a distância para cada produto
      const produtosComDistancia = produtos.map((produto) => {
        const distancia = calcularDistancia(
          loc.coords.latitude,
          loc.coords.longitude,
          produto.latitude,
          produto.longitude
        );
        return { ...produto, distancia: distancia.toFixed(2) }; // Armazenando a distância no produto
      });

      setProdutosComDistancia(produtosComDistancia); // Atualizando os produtos com a distância
    })();
  }, []);

  // Função para animação do marcador
  const animateMarker = () => {
    scaleAnim.setValue(1);
    Animated.sequence([ 
      Animated.timing(scaleAnim, { toValue: 1.6, duration: 180, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 180, useNativeDriver: true }),
    ]).start();
  };

  // Função chamada quando pressiona um card no sheet
  const handleIrParaProduto = (produto: any) => {
    setProdutoSelecionado(produto);
    setSelectedMarker(produto.id);
    animateMarker();

    if (mapRef.current) {
      const offsetLat = 0.0014;
      mapRef.current.animateToRegion(
        {
          latitude: produto.latitude - offsetLat,
          longitude: produto.longitude,
          latitudeDelta: 0.0035,
          longitudeDelta: 0.0035,
        },
        700
      );
      setTimeout(() => {
        markerRefs.current[produto.id]?.showCallout?.();
      }, 600);
    }
  };

  // Ao clicar diretamente no marker
  const onMarkerPress = (p: any) => {
    setProdutoSelecionado(p);
    setSelectedMarker(p.id);
    animateMarker();
    setTimeout(() => markerRefs.current[p.id]?.showCallout?.(), 250);
  };

  if (loading) return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#ff6600" />
    </View>
  );

  if (!location) return (
    <View style={styles.center}>
      <Text>Não foi possível obter sua localização.</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <HeaderMenu />

        <MapView
          ref={(r) => {
            mapRef.current = r;
          }}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
           showsUserLocation={true}
          showsMyLocationButton={false}
           userLocationPriority="high" 
        >
          {produtosComDistancia.map((p) => (
            <Marker
              key={p.id}
              coordinate={{ latitude: p.latitude, longitude: p.longitude }}
              anchor={{ x: 0.5, y: 1 }}
              ref={(ref) => {
                markerRefs.current[p.id] = ref;
              }}
              onPress={() => onMarkerPress(p)}
              
            >
              <MarkerItem selected={selectedMarker === p.id} scaleAnim={scaleAnim} />
              <Callout tooltip>
                <View style={{ backgroundColor: "#fff", padding: 8, borderRadius: 8, width: 200 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MarkerItem selected={false} scaleAnim={new Animated.Value(1)} />
                    <View style={{ marginLeft: 8, flex: 1 }}>
                      <Text style={{ fontWeight: "700" }}>{p.nome}</Text>
                      <Text style={{ color: "#666" }}>{p.loja}</Text>
                      <Text style={{ color: "#ff6600", fontWeight: "700", marginTop: 6 }}>{p.preco}</Text>
                      <Text style={{ color: "#777", marginTop: 6 }}>⭐ {p.estrelas ?? "—"} • {p.vendas ?? "—"} vendas</Text>
                      <Text style={{ color: "#333", marginTop: 6 }}>Distância: {p.distancia} km</Text> {/* Exibindo a distância */}
                    </View>
                  </View>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>

        <BottomSheet
          produtos={produtosComDistancia} 
          promocoes={promocoes}
          onProdutoPress={handleIrParaProduto}
          onSheetPositionChange={(aberta) => setSheetAberta(aberta)}
        />

        {/* InfoBox */}
        {produtoSelecionado && !sheetAberta && (
          <InfoBox
            produto={produtoSelecionado}
            onClose={() => setProdutoSelecionado(null)}
            onVisitarLoja={(produto) => handleIrParaProduto(produto)}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
