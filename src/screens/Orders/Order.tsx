import React, { Component } from "react";
import {View, Text, StyleSheet, TouchableHighlight} from "react-native"; 
import MyColors from "../../color/MyColors";
import MyButtons from "../../color/Bottons";
import {NavigationScreenProp} from "react-navigation";
interface Myprops {
  navigation: NavigationScreenProp<any,any>
}

interface MyState {
  count: number;
}

class Order extends Component<Myprops,MyState> {
  constructor(props:Myprops){
    super(props);
    this.state={
      count: 0,
    }
  }
  Aumentar(){
    var countActualizado: number = this.state.count + 1;
    this.setState({count: countActualizado })
  }
  Reducir(){
    var countActualizado: number = this.state.count - 1;
    this.setState({count: countActualizado })
  }
  goOrder(){
    this.props.navigation.navigate("RegisterOrders");
  }
  goDetailOrder(){
    this.props.navigation.navigate("DetailOrder", {names: "Vino Tinto", cantidad:"10", descripcion:"Vinos vencidos"});
  }
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.containerNumero}>
              <View>
                <MyButtons title="-" onPress={()=> {
                  this.Reducir();
                }}/>
              </View>
              
              <View style={styles.containerText}>
                  <Text style={styles.text}>
                      {this.state.count}
                  </Text>
              </View>
              
              <View>
              <MyButtons title="+" onPress={()=> { //llamamos al componente que creamos y le colocamos los atributos que tiene, estos valores en title y el onPress se pasaran al componente (que esta en color/Buttons)
                  this.Aumentar();
                }}/>
              </View>
          </View>

          <View style={styles.containerNumero}>
              <View>
                <MyButtons title="A" onPress={()=> {
                  this.goOrder();
                }}/>
              </View>
              <View>
                <MyButtons title="S" onPress={()=> {
                  this.goDetailOrder();
                }}/>
              </View>

          </View>
        </View>
    )
  }
}

var styles= StyleSheet.create({
  container: {
    alignItems:"center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: MyColors.maincolor,
  },
  containerNumero:{
    flexDirection: "row",
    marginBottom: 50
  },
  containerText:{
    height: 100,
    width: 250,
    backgroundColor: MyColors.secondary,
    alignItems:"center",
    borderRadius:20,
    elevation: 15,

    
  },
  text: {
    fontSize: 50,
    //backgroundColor: MyColors.thirth,
    color: MyColors.lastcolor,
    borderRadius: 10,
    marginTop: 15,
    elevation: 15,
  },
  containerText2:{
    height: 50,
    width: 50,
    backgroundColor: MyColors.secondary,
    alignItems:"center",
    borderRadius:20,
    elevation: 15,
    marginLeft:20,
    marginRight:20,
    
  },
  text2: {
    fontSize: 40,
    color: MyColors.lastcolor,
  }
});
export default Order;