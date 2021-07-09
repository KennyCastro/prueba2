import React, { Component } from "react";
import {View, Text, StyleSheet, TouchableHighlight} from "react-native"; 
import MyColors from "../../color/MyColors";
import {NavigationScreenProp} from "react-navigation";

interface MyState{
    names: string,
    cantidad: string,
    descripcion: string
}

interface params{
   names: string,
    cantidad: string,
    descripcion:string,
}

interface route{
  params: params,
}


interface MyProps{
  navigation: NavigationScreenProp<any,any>,
  route: route
}



class RegisterOrders extends Component<any,any> {
   



    render() {
        return (
            <View >
              <Text>Registro de Pedidos</Text>
              
            </View>
        )
    }
}

export default RegisterOrders;