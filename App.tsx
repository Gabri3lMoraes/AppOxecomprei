import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./splash";
import Login from "./screen/login";
import Home from "./screen/home";
import Registro from "./screen/Registro";
import PosRegistro from "./screen/Posregistro";
import Teladebemvindo from "./screen/Welcome";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);

  return (
  <>
    {isSplashVisible ? (
      <Splash onFinish={() => setSplashVisible(false)} />
    ) : (
      <NavigationContainer>
        <Stack.Navigator id={undefined} initialRouteName="Wel" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Registro" component={Registro} />
          <Stack.Screen name="Pos" component={PosRegistro} />
          <Stack.Screen name="Wel" component={Teladebemvindo} />
        </Stack.Navigator>
      </NavigationContainer>
    )}
  </>
);

}
