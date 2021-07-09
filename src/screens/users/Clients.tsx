import React, { Component } from "react";
import {createStackNavigator} from "@react-navigation/stack"
import { NavigationContainer } from '@react-navigation/native';
import {View, Text,StyleSheet, Platform} from "react-native"; 
import {Appbar} from "react-native-paper"
import ListUsers from "./ListUsers";
import RegisterUsers from "./RegisterUsers";
import DetailUsers from "./DetailUsers";
import TakePicture from "./TakePicture";
import { NavigationEvents } from "react-navigation";
import AppContext from "../../context/AppContext";
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
var Stack = createStackNavigator();

class Clients extends Component<any, any> {
  static contextType = AppContext;
  test: any
  constructor(props: any) {
    super(props);
    this.state = {
      dataUsers: []
    }
    
  }
  render() {
    const {changeSearchBarVisble, SearchBarVisible} = this.context
    return (
        <NavigationContainer independent={true} >
          <Stack.Navigator>
            <Stack.Screen name="list" component={ListUsers} options={() => (
              {header: () => <Appbar.Header>
                <Appbar.Content title="Gestor de Usuarios" subtitle={'Sistema de Roles'} />
                 <Appbar.Action icon="magnify" onPress={() => {
                   changeSearchBarVisble(!SearchBarVisible);
                 }} />
                 <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
             </Appbar.Header>}
            )}/> 
            <Stack.Screen name="RegisterUsers" component={RegisterUsers} options={() => (
              {header: (navigate) => <Appbar.Header>
                <Appbar.BackAction onPress={() => { 
                  navigate.navigation.pop();
                }} /> 
                <Appbar.Content title="Gestor de Usuarios" subtitle={'Sistema de Roles'} />
             </Appbar.Header>}   
            )}/>
            <Stack.Screen name="DetailUsers" component={DetailUsers}/>
            <Stack.Screen name="TakePicture" component={TakePicture}/>
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
export default Clients;