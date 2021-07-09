import React, { Component } from "react";
import {createStackNavigator} from "@react-navigation/stack"
import { NavigationContainer } from '@react-navigation/native';
import {View, Text,StyleSheet, Platform} from "react-native"; 
import {Appbar} from "react-native-paper"
import Order from "./Order";
import DetailOrder from "./DetailOrders";
import RegisterOrders from "./RegisterOrders";
import {NavigationScreenProp} from "react-navigation";
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
var Stack = createStackNavigator();
interface Myprops {
  navigation: NavigationScreenProp<any,any>
}

class IndexOrder extends Component<any, any> {
  test: any
  constructor(props: any) {
    super(props);
    
  }
  render() {
    return (
        <NavigationContainer independent={true}>
          <Stack.Navigator>
            <Stack.Screen name="Order" component={Order} options={() => (
              {header: () => <Appbar.Header>
                <Appbar.Content title="Pedidos" subtitle={'Lista Pedidos'} />
                 <Appbar.Action icon="magnify" onPress={() => {}} />
                 <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
             </Appbar.Header>}
            )}/> 
            <Stack.Screen name="DetailOrder" component={DetailOrder} options={() => (
              {header: (navigate) => <Appbar.Header>
                <Appbar.BackAction onPress={() => {
                  navigate.navigation.pop();
                }} />
                <Appbar.Content title="Detalles de pedidos" subtitle={'lista'} />
             </Appbar.Header>}
            )}/>
            <Stack.Screen name="RegisterOrders" component={RegisterOrders} options={() => (
              {header: (navigate) => <Appbar.Header>
                <Appbar.BackAction onPress={() => {
                  navigate.navigation.pop();
                }} />
                <Appbar.Content title="Registro de pedidos" subtitle={'Orders'} />
             </Appbar.Header>}
            )}/>

          </Stack.Navigator>
        </NavigationContainer>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
export default IndexOrder;