import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
  Alert,
  ActivityIndicator,
} from "react-native";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { db } from "./firebaseConfig";
import { useFonts } from "expo-font";
import { TextInputMask } from "react-native-masked-text";

export default function Registro() {

  const navigation = useNavigation();
  const [etapa, setEtapa] = useState(1);

  // Etapa 1
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  // Etapa 2
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  const handleProximo = async () => {
  if (!nome || !email || !telefone) {
    alert("Preencha todos os campos antes de continuar!");
    return;
  }

  try {
    // 🔎 Verifica se o e-mail já existe no Firestore
    const q = query(collection(db, "clientes"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      alert("Este e-mail já está cadastrado! Use outro para continuar.");
      return;
    }

    setEtapa(2);
  } catch (error) {
    console.error("Erro ao verificar e-mail:", error);
    alert("Erro ao verificar e-mail. Tente novamente.");
  }
};


  // Buscar endereço automaticamente pelo CEP
  const buscarEndereco = async (cepDigitado: string) => {
    const cepLimpo = cepDigitado.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert("CEP não encontrado!");
        return;
      }

      setRua(data.logradouro || "");
      setBairro(data.bairro || "");
      setCidade(data.localidade || "");
      setEstado(data.uf || "");
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      Alert.alert("Erro ao buscar o CEP!");
    }
  };

  const handleCadastrar = async () => {
  if (!cep || !rua || !bairro || !numero || !cidade || !estado || !senha || !confirmarSenha) {
    alert("Preencha todos os campos!");
    return;
  }

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem!");
    return;
  }

  if (!isEnabled) {
    alert("Aceite os termos para continuar!");
    return;
  }

  try {
    // 🔎 Verifica se já existe um cliente com o mesmo e-mail
    const q = query(collection(db, "clientes"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      alert("Este e-mail já está cadastrado!");
      return;
    }

    // 🟢 Se não existir, cadastra o novo cliente
    await addDoc(collection(db, "clientes"), {
      nome,
      email,
      telefone,
      endereco: { cep, rua, numero, bairro, cidade, estado },
      senha,
      dataCriacao: new Date().toISOString(),
    });

    alert("Cadastro realizado com sucesso!");
    navigation.navigate("Login" as never);
  } catch (error) {
    console.error("Erro ao salvar:", error);
    alert("Erro ao salvar no banco de dados!");
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro</Text>

      {etapa === 1 && (
        <View style={styles.form}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInputMask
            type={"cel-phone"}
            options={{ maskType: "BRL", withDDD: true, dddMask: "(99)" }}
            style={styles.input}
            placeholder="Digite seu telefone"
            value={telefone}
            keyboardType="phone-pad"
            onChangeText={setTelefone}
          />

          <TouchableOpacity style={styles.botao} onPress={handleProximo}>
            <Text style={styles.botaoTexto}>Prosseguir ➜</Text>
          </TouchableOpacity>

          <Image
            style={{
              position: "absolute",
              bottom: -450,
              width: "100%",
              height: 400,
            }}
            resizeMode="contain"
            source={require("../assets/4.png")}
          />
        </View>
      )}

      {etapa === 2 && (
        <View style={styles.form}>
          <Text style={styles.label}>CEP</Text>
          <TextInputMask
            type={"zip-code"}
            style={styles.input}
            placeholder="Digite seu CEP"
            value={cep}
            keyboardType="numeric"
            onChangeText={(valor) => {
              setCep(valor);
              buscarEndereco(valor);
            }}
          />

          {/* Rua e Número lado a lado */}
          <View style={styles.row}>
            <View style={[styles.col, { flex: 2 }]}>
              <Text style={styles.label}>Rua</Text>
              <TextInput
                style={styles.input}
                value={rua}
                onChangeText={setRua}
                placeholder="Rua"
              />
            </View>
            <View style={[styles.col, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Número</Text>
              <TextInput
                style={styles.input}
                value={numero}
                onChangeText={setNumero}
                keyboardType="numeric"
                placeholder="N°"
              />
            </View>
          </View>

          {/* Bairro, Cidade e Estado lado a lado */}
          <View style={styles.row}>
            <View style={[styles.col, { flex: 1.5 }]}>
              <Text style={styles.label}>Bairro</Text>
              <TextInput
                style={styles.input}
                value={bairro}
                onChangeText={setBairro}
                placeholder="Bairro"
              />
            </View>
            <View style={[styles.col, { flex: 1.5, marginLeft: 8 }]}>
              <Text style={styles.label}>Cidade</Text>
              <TextInput
                style={styles.input}
                value={cidade}
                onChangeText={setCidade}
                placeholder="Cidade"
              />
            </View>
            <View style={[styles.col, { flex: 0.5, marginLeft: 8 }]}>
              <Text style={styles.label}>UF</Text>
              <TextInput
                style={styles.input}
                value={estado}
                onChangeText={setEstado}
                maxLength={2}
                placeholder="PE"
              />
            </View>
          </View>

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            value={senha}
            secureTextEntry
            onChangeText={setSenha}
          />

          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirme sua senha"
            value={confirmarSenha}
            secureTextEntry
            onChangeText={setConfirmarSenha}
          />

          <View style={styles.contrato}>
            <Switch
              trackColor={{ false: "#ccc", true: "#FF6A00" }}
              thumbColor={isEnabled ? "#FF6A00" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={styles.politica}>
              Concordo com os <Text style={styles.marcador}>Termos</Text> e{" "}
              <Text style={styles.marcador}>Política de Privacidade</Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.botao} onPress={handleCadastrar}>
            <Text style={styles.botaoTexto}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    paddingTop: 60,
  },
  titulo: {
    fontSize: 37,
    marginBottom: 30,
    color: "#0e0d0dff",
    fontFamily: "Xilosa",
  },
  form: {
    width: "90%",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  col: {
    flex: 1,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    color: "#000",
    marginBottom: 5,
    marginTop: 10,
    width: '100%'
  },
  input: {
    backgroundColor: "#fff",
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 10,
    elevation: 3,
    width: '100%'
  },
  botao: {
    backgroundColor: "#FF6A00",
    width: "100%",
    padding: 12,
    borderRadius: 8,
    marginTop: 25,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  contrato: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  politica: {
    fontSize: 12,
    color: "#000",
    marginLeft: 8,
    flexShrink: 1,
  },
  marcador: {
    color: "#FF6A00",
    fontWeight: "bold",
  },
});
