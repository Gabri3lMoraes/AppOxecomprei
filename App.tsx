import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screen/login"; // tela de login
import Home from "./screen/home"; // tela home
import Registro from "./screen/Registro"; // tela de registro\
import PosRegistro from "./screen/Posregistro";
import Teladebemvindo from "./screen/Welcome"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
  <Stack.Navigator id={undefined}  initialRouteName="Wel">
    <Stack.Screen name="Login" options={{ headerShown: false}}  component={Login} />
    <Stack.Screen name="Home" component={Home} options={{ headerShown: false}} />
    <Stack.Screen name="Registro" options={{ headerShown: false}} component={Registro} />
    <Stack.Screen name="Pos" options={{ headerShown: false}} component={PosRegistro} />
     <Stack.Screen name="Wel" options={{ headerShown: false}} component={Teladebemvindo} />
  </Stack.Navigator>
</NavigationContainer>

  );
}