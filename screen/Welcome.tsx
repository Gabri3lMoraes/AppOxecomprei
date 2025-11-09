import { Text, StyleSheet, View, ImageBackground, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
export default function Welcomescreen(){
    const [fontsLoaded] = useFonts({
        "Poppins-Regular" : require("../assets/fonts/Poppins-Regular.ttf"),
         "Poppins-Bold" : require("../assets/fonts/Poppins-Bold.ttf"),
         "Inter-Bold" : require("../assets/fonts/Inter_24pt-Bold.ttf"),
    })

    if(!fontsLoaded){
        return null;
    }

    const navigation = useNavigation();

    const handlerregistro = () =>{
        navigation.navigate("Pos");
    }

    const handlerLogin = () =>{
        navigation.navigate("Login")
    }

    return(
        <ImageBackground style={{ flex: 1}} source={require("../assets/welcome/img1.png")} resizeMode="cover">
            <View style={style.container}>
                <Text style={style.Logo}> 
                    <Text style={style.oxe}>oxê {"\n"}</Text>
                    <Text style={style.comprei}>         Comprei</Text>
                </Text>
            </View>

            <View style={style.bottom}>
                <Text style={style.textomarca}>Compre fácil, compre local, só {"\n"} compre Oxê.</Text>
                 <TouchableOpacity style={style.botaoparaentrar} onPress={handlerLogin}>
                    <Text style={style.textodobotao}> Entrar</Text>
                </TouchableOpacity>
               <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 9 }}>
                    <Text style={style.textoderecuperacao}>Não tem conta?</Text>
                    <TouchableOpacity onPress={handlerregistro}>
                    <Text style={style.cadastro}>  Cadastrar-se agora.</Text>
                    </TouchableOpacity>
                    </View>
                
            </View>
            
            
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    Logo:{
        fontFamily: 'Poppins-Regular',
        fontSize: 29,
        padding: 15,
        lineHeight:48,
        marginTop: 30
    },
    container:{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'flex-start'
    },
    oxe:{
        fontFamily: 'Poppins-Bold',
        color: '#FFDD00',
        fontSize: 85,
    
    },
    comprei:{
        color:'#fff',
         fontFamily: 'Poppins-Bold',
         paddingLeft: 20
         
    },
    bottom:{
        alignItems: 'center',
        height:285
    },
    textomarca:{
        color:'#fff',
         fontFamily: 'Poppins-Bold',
         fontSize: 18
    },
    botaoparaentrar:{
        backgroundColor: '#fff',
        padding: 10,
        paddingHorizontal: 120,
        borderRadius: 10,
        marginTop: 50
    },
    textodobotao:{
        color: '#FF8000',
        fontSize: 22,
        fontFamily: 'Inter-Bold',
    },
    textoderecuperacao:{
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Inter-Bold',
    },
    cadastro:{
         fontSize: 14,
        color: '#FFF716',
        fontFamily: 'Inter-Bold',
    }
 
})