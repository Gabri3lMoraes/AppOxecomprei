import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
  Alert,
} from "react-native";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { db } from "./firebaseConfig";
import { TextInputMask } from "react-native-masked-text";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

export default function RegistroComerciante() {
  const navigation = useNavigation();
  const [etapa, setEtapa] = useState(1);

  // Etapa 1 — Dados pessoais + empresa básica
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [nomeLoja, setNomeLoja] = useState("");

  // Logo
  const [logo, setLogo] = useState<string | null>(null);

  // Etapa 2 — Endereço + senha
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

  // 📌 Selecionar LOGO
  const selecionarLogo = async () => {
    let perm = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!perm.granted) {
      alert("Permita o acesso à galeria para enviar a logo!");
      return;
    }

    let img = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!img.canceled) {
      setLogo(img.assets[0].uri);
    }
  };

  // Etapa 1 → Etapa 2
  const handleProximo = async () => {
    if (!nome || !email || !telefone || !cnpj || !nomeLoja) {
      alert("Preencha todos os campos antes de continuar!");
      return;
    }

    // Validar CNPJ
    const cnpjLimpo = cnpj.replace(/\D/g, "");
    if (cnpjLimpo.length !== 14) {
      alert("CNPJ inválido!");
      return;
    }

    try {
      const q = query(collection(db, "comerciantes"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("Este e-mail já está cadastrado!");
        return;
      }

      setEtapa(2);
    } catch (error) {
      alert("Erro ao verificar e-mail.");
    }
  };

  // Buscar endereço por CEP
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
    } catch {
      Alert.alert("Erro ao buscar CEP");
    }
  };

  const handleCadastrar = async () => {
    if (
      !cep ||
      !rua ||
      !bairro ||
      !numero ||
      !cidade ||
      !estado ||
      !senha ||
      !confirmarSenha
    ) {
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
      // Registrar comerciante no Firebase
      await addDoc(collection(db, "comerciantes"), {
        nome,
        email,
        telefone,
        cnpj,
        nomeLoja,
        logo: logo || null,
        endereco: { cep, rua, numero, bairro, cidade, estado },
        senha,
        criadoEm: new Date().toISOString(),
      });

      alert("Cadastro realizado com sucesso!");
      navigation.navigate("Login" as never);
    } catch (error) {
      alert("Erro ao salvar!");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigation.goBack}>
        <Text style={styles.voltar}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Cadastro do Comerciante</Text>

      {/* ====================================================
                 ETAPA 1
      ==================================================== */}
      {etapa === 1 && (
        <View style={styles.form}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu nome"
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
            style={styles.input}
            value={telefone}
            placeholder="(00) 00000-0000"
            onChangeText={setTelefone}
          />

          <Text style={styles.label}>CNPJ</Text>
          <TextInputMask
            type={"cnpj"}
            style={styles.input}
            placeholder="00.000.000/0000-00"
            value={cnpj}
            onChangeText={setCnpj}
          />

          <Text style={styles.label}>Nome da Loja</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Loja do João"
            value={nomeLoja}
            onChangeText={setNomeLoja}
          />

          {/* LOGO */}
          <Text style={styles.label}>Logo da Loja</Text>
          <TouchableOpacity style={styles.logoBtn} onPress={selecionarLogo}>
            <Text style={styles.logoText}>
              {logo ? "Trocar Logo" : "Enviar Logo"}
            </Text>
          </TouchableOpacity>

          {logo && (
            <Image
              source={{ uri: logo }}
              style={{ width: 120, height: 120, marginTop: 10, borderRadius: 10 }}
            />
          )}

          <TouchableOpacity style={styles.botao} onPress={handleProximo}>
            <Text style={styles.botaoTexto}>Prosseguir ➜</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ====================================================
                 ETAPA 2
      ==================================================== */}
      {etapa === 2 && (
        <View style={styles.form}>
          <Text style={styles.label}>CEP</Text>
          <TextInputMask
            type={"zip-code"}
            style={styles.input}
            placeholder="00000-000"
            value={cep}
            onChangeText={(t) => {
              setCep(t);
              buscarEndereco(t);
            }}
          />

          {/* Rua e Número */}
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
                keyboardType="numeric"
                onChangeText={setNumero}
                placeholder="N°"
              />
            </View>
          </View>

          {/* Bairro, Cidade, UF */}
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

            <View style={[styles.col, { flex: 0.7, marginLeft: 8 }]}>
              <Text style={styles.label}>UF</Text>
              <TextInput
                style={styles.input}
                maxLength={2}
                value={estado}
                onChangeText={setEstado}
                placeholder="PE"
              />
            </View>
          </View>

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={confirmarSenha}
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
  voltar: {
    position: "absolute",
    right: 140,
    top: 1,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    paddingTop: 60,
  },
  titulo: {
    fontSize: 22,
    marginBottom: 30,
    color: "#0e0d0dff",
    fontWeight: "bold",
  },
  form: {
    width: "90%",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    width: "100%",
  },
  col: {
    flex: 1,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 10,
    elevation: 3,
    width: "100%",
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
  logoBtn: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
    alignItems: "center",
    elevation: 3
  },
  logoText: {
    color: "#FF6A00",
    fontSize: 15,
    fontWeight: "bold",
  },
  contrato: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  politica: {
    fontSize: 12,
    marginLeft: 8,
  },
  marcador: {
    color: "#FF6A00",
    fontWeight: "bold",
  },
});
