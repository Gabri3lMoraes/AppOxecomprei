// Splash.tsx
import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

export default function Splash({ onFinish }: { onFinish: () => void }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação de entrada e saída
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => onFinish());
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
        <Image
          source={require("./assets/logooxe.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.text}>Oxê Comprei</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFA500", // fundo laranja igual ao design
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
});
