import React, { Component } from "react";
import {View, Text, StyleSheet, TouchableHighlight} from "react-native"; 
import MyColors from "./MyColors";
import Icons from "react-native-vector-icons/Entypo";
import { NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
//recuperando datos de afuera
interface MyProps{
    title: string,
    onPress: Function
}
//recibe los atributos desde donde se usa, por ejemplo en el boton aumentar envia el titulo "+" y cuando se da click en el onPress se envia la funcion Aumentar() y aqui agarra esa logica y lo ejecuta

class Buttons extends Component<MyProps,any>{
    constructor(props: any){
        super(props)
    }

    click(){
        this.props.onPress();
    }

    render (){
        return(
            <TouchableHighlight onPress={()=>{
                this.click();
              }}>
                 
                <View style={styles.containerText2}>
                <View>
                     <Icons name="star" size={12} color={MyColors.thirth}/>
                 </View>
                  <Text style={styles.text2}>
                      {this.props.title}
                  </Text>
                  </View>
              </TouchableHighlight>

              
        )
    }
}
var styles= StyleSheet.create({
    containerText2:{
      height: 50,
      width: 50,
      backgroundColor: MyColors.secondary,
      alignItems:"center",
      borderRadius:20,
      elevation: 15,
      marginLeft:20,
      marginRight:20,
      flexDirection: "row",
      
    },
    text2: {
      fontSize: 40,
      color: MyColors.lastcolor,
    },
    
});

export default Buttons;