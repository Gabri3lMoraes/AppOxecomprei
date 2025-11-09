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
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import Botao2 from "../components/botao2";
import logo from "../assets/google1.png";
import logo2 from "../assets/facebook.png";
import local from "../assets/pin9.png";
import flor from "../assets/beija.png";
import { useNavigation } from "@react-navigation/native";
import { db } from "./firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [fontsLoaded] = useFonts({
    Xilosa: require("../assets/fonts/xilosa_.ttf"),
  });

  const toggleSwitch = () => setIsEnabled(prev => !prev);
  if (!fontsLoaded) return null;

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      const q = query(
        collection(db, "clientes"),
        where("email", "==", email),
        where("senha", "==", senha)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Alert.alert("Sucesso", "Login realizado com sucesso!");
        navigation.navigate("Home" as never); // 👈 Redireciona para tela principal
      } else {
        Alert.alert("Erro", "Email ou senha incorretos!");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar fazer login.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Titulo}>Oxe Comprei</Text>

      <View style={styles.formulario}>
        <View style={styles.email}>
          <Text style={styles.subtitulo}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.email}>
          <Text style={styles.subtitulo}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>
      </View>

      {/* Botão de login */}
      <TouchableOpacity style={styles.botaoLogin} onPress={handleLogin}>
        <Text style={styles.textoBotaoLogin}>Entrar</Text>
      </TouchableOpacity>

      {/* Botão de ir para cadastro */}
      <Botao2 onPress={() => navigation.navigate("Registro" as never)} />

      <Text style={styles.forguet}>Esqueceu a senha?</Text>
      <View style={styles.linha}></View>

      <View style={styles.gofa}>
        <TouchableOpacity>
          <View style={styles.socialButton}>
            <Image source={logo} style={styles.socialIcon} />
            <Text style={styles.socialText}>CONTINUAR COM GOOGLE</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.socialButton}>
            <Image source={logo2} style={styles.socialIcon} />
            <Text style={styles.socialText}>CONTINUAR COM FACEBOOK</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.local}>
        <Image source={local} />
        <Text>Recife, Pernambuco</Text>
      </View>

      <View style={styles.contrato}>
        <Switch
          trackColor={{ false: "#b1acb6ff", true: "#FF6A00" }}
          thumbColor={isEnabled ? "#FF6A00" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={styles.politica}>
          Ao continuar, você concorda com nossos{" "}
          <Text style={styles.marcador}>Termos de Serviço</Text> e{" "}
          <Text style={styles.marcador}>Política de Privacidade.</Text>
        </Text>
      </View>

      <Image
        source={flor}
        style={{
          width: 100,
          height: 100,
          marginTop: 20,
          position: "absolute",
          top: 30,
          right: 0,
        }}
      />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  Titulo: {
    fontSize: 30,
    fontFamily: "Xilosa",
    marginBottom: 20,
    marginTop: 90,
  },
  subtitulo: {
    fontSize: 20,
    fontFamily: "Xilosa",
  },
  formulario: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 40,
  },
  email: {
    marginTop: 10,
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 8,
  },
  botaoLogin: {
    backgroundColor: "#FF6A00",
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 8,
    marginTop: 20,
  },
  textoBotaoLogin: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linha: {
    width: "70%",
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  gofa: {
    alignItems: "center",
    marginTop: 2,
  },
  socialButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 2,
    marginTop: 20,
    elevation: 5,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  socialText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
  local: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "#D9D9D9",
    padding: 5,
    borderRadius: 5,
  },
  politica: {
    fontSize: 10,
    color: "#000",
    textAlign: "center",
    marginTop: 10,
  },
  marcador: {
    color: "#FF6A00",
  },
  contrato: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 60,
  },
  forguet: {
  color: "#6E6868",
  opacity: 0.8,
  paddingTop: 5,
},
});
