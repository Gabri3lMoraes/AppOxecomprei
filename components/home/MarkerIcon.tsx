// components/MarkerItem.tsx
import React from "react";
import { Animated, Image, StyleSheet } from "react-native";

export default function MarkerItem({ selected, scaleAnim }: { selected: boolean; scaleAnim: Animated.Value; }) {
  return (
    <Animated.View
      style={[
        styles.wrapper,
        { transform: [{ scale: selected ? scaleAnim : 1 }] },
      ]}
      pointerEvents="none" // evita conflitos com a interação do Marker
    >
      <Image
        source={require("../../assets/produtos/comercio3d.png")}
        style={styles.img}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 44,
    height: 44,
    resizeMode: "contain",
    borderRadius: 8,
  },
});
