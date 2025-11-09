import { View, Text, TouchableOpacity } from "react-native";

interface TelaLoginProps {
   onPress: () => void;
}
export default function Botao2({ onPress }: TelaLoginProps) {
    return(
      <TouchableOpacity onPress={onPress}>
        <View style={{backgroundColor: '#FF6A0D', padding: 10,paddingHorizontal:40, borderRadius: 2, marginTop: 30,boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;'}}>
          <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold',}}>CRIAR CONTA</Text>
        </View>
      </TouchableOpacity>                                 
    )
}