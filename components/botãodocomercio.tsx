import { useState } from "react";
import { Pressable, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProps } from "../@types/navigation"

export default function Botaodocomercio(){
    
    const [selected, setSelecionado] = useState(null)
    const navigation = useNavigation<NavigationProps>();
    const handlepress = (tipo) => {
        if(selected === tipo){
            setSelecionado(null);
        }else{
            setSelecionado(tipo)
        }
    }

    const handlercontiuar = () => {
        if(selected === "comerciante"){
            navigation.navigate("Registro");
        } else if(selected === "consumidor"){
            navigation.navigate("Registro")
        }
    }

















    return(
    
    <View style={style.container}>
        <Pressable onPress={() => handlepress("comerciante")}
            style={({pressed}) => [
            style.consumidor,
            pressed && style.botaopressionado,
            selected === "comerciante" && style.botaopressionado,
            ]}>
            <Image style={{width:50, height:50,}} source={require("../assets/comprar.png")} />
            <View style={style.comp}>
            <Text style={style.Letras}>Comerciante</Text>
            <Text style={style.Letras2}>Cadastre seus produtos {"\n"} e gerencie suas vendas</Text>
            </View>
            </Pressable>
          <Pressable onPress={() => handlepress("consumidor")}
            style={({pressed}) => [
            style.consumidor,
            pressed && style.botaopressionado,
            selected === "consumidor" && style.botaopressionado
            ]}>
            <Image style={{width:50, height:50,}} source={require('../assets/pessoa.png')}/>
             <View style={style.comp}>
            <Text style={style.Letras}>Consumidor</Text>
            <Text style={style.Letras2}>Explore e compre {"\n"} produtos no seu bairro</Text>
            </View>
        </Pressable>
        <TouchableOpacity style={[style.continuar, !selected && style.botaoDesativado,]}
        disabled={!selected}
        onPress={handlercontiuar}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Continuar</Text>
        </TouchableOpacity>
       </View>
    )
}

const style = StyleSheet.create({
    container:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 20,
        marginBottom: 200
    },
    consumidor:{
        backgroundColor: '#E6BC99',
        padding: 22,
        borderRadius: 15,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'space-around',
        textAlign: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: 10,
    
        
    },
    Letras:{
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold'
    },
    Letras2:{
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    },
    comp:{
        display: 'flex',
        gap: 10
    },
    botaopressionado:{
    backgroundColor: '#E36A05',
    color: '#fff'
    },
    continuar:{
      padding: 10,paddingHorizontal:35, borderRadius: 10, backgroundColor: '#E36A05', 
    },
    botaoDesativado: {
    backgroundColor: "#bdbdbd",
  },
})