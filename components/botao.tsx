import { View, Text, TouchableOpacity } from "react-native";
export default function Botao(){
    return(
      <TouchableOpacity>
        <View style={{backgroundColor: '#e5e3dcff', padding: 10,paddingHorizontal:60, borderRadius: 2, marginTop: 30,boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;'}}>
          <Text style={{color: '#0000', fontSize: 16, fontWeight: 'bold'}}>Entrar</Text>
        </View>
      </TouchableOpacity>    
    )
}