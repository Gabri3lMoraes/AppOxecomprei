import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Switch,
  ImageBackground
} from "react-native";



import { useFonts } from "expo-font";

import OutraTela from "./Registro"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useNavigation } from "@react-navigation/native";

import Botaodocomercio from "../components/botãodocomercio";









export default function LoginScreen() {
  const navigation = useNavigation();
 const [tela, setTela] = useState<"login" | "outra">("login");
  const [isEnabled, setIsEnabled] = useState(false);
  const [fontsLoaded] = useFonts({
    Xilosa: require("../assets/fonts/xilosa_.ttf"),
  });



  
  return (
    <View style={styles.container}>
      <View style={styles.escolha}>
        <Text style={styles.Titulo}> Escolha uma opção</Text>
      </View>
      <View>
      <Botaodocomercio/>
      
      </View>
      <Image style={{position: 'absolute', bottom:-70, width: '100%', height: 400}} resizeMode="contain" source={require("../assets/4.png")}/>
      
    </View>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    height: 250,
    flexDirection: 'column',
    justifyContent: "center",
  },
  escolha:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  },
  Titulo: {
    fontSize: 40,
    fontFamily: "Arial",
    marginBottom: 20,
    marginTop: 5,
    fontWeight: 'bold'
  },
})