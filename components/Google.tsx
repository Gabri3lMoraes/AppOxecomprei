import { View, Text, TouchableOpacity, Image, StyleSheet, ImageSourcePropType } from "react-native";


export default function google(){
    return(
      <TouchableOpacity>
        <View style={{backgroundColor: '#fff', padding: 10,paddingHorizontal:40, borderRadius: 2, marginTop: 30,boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;'}}>
          <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold'}}>
            <Image/>
            CONTINUAR COM GOOGLE</Text>
        </View>
      </TouchableOpacity>                                 
    )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#7b5ce1",
    borderRadius: 10,
    justifyContent: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
    resizeMode: "contain",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});