import React, { Component } from "react";
import {View, Text, Platform, FlatList, StyleSheet, Button,TouchableHighlight} from "react-native"; 
import { StackNavigationProp } from '@react-navigation/stack';
import axios from "axios";
import {Appbar, List, Avatar, FAB, Searchbar, Drawer} from "react-native-paper";
import AppContext from "../../context/AppContext" //esto importamos para utilizar todas las variables en el contexto


interface ItemUser{
  _id: string,
  username: string,
  email: string,
  tipo: string,
  registerdate: string,
  roles: Array<any>,
  pathavatar?: string,
  uriavatar?: string
}
interface ServerResponse {
  serverResponse:Array<ItemUser>
}
interface MyState {
  dataUsers: Array<ItemUser>
}
interface ItemData {
  item: ItemUser
}
interface MyProps {
    navigation: StackNavigationProp<any, any>
}
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
class ListUsers extends Component<MyProps, MyState> {
  static contextType = AppContext; //con esto ya tenemos todas las varibles en esta pestaña
  constructor(props: any) { 
    super(props);
    this.state = {
      dataUsers: []
    }
  }
  async componentDidMount() {
    console.log(this.context);
    var result: Array<ItemUser> = await axios.get<ServerResponse>("http://192.168.100.9:8000/api/users").then((item) => {
      return item.data.serverResponse
    });
    this.setState({
      dataUsers: result
    });

  }

  
  listItem(item: ItemUser) {
      //var item : ItemUser = params.item
      if (item.uriavatar == null) {
        return <List.Item
        title={item.username}
        description={item.tipo}
        onPress={() => {
            this.props.navigation.push("DetailUsers");
        }}
        left={props => <Avatar.Text size={48} label={item.username.charAt(0)}    />}
        />
      } else {
        var uriImg: string = "http://192.168.100.9:8000" + item.uriavatar; 
        return <List.Item
                  title={item.username}
                  description={item.tipo}
                  onPress={() => {
                    this.props.navigation.push("DetailUsers");
                }}
                  left={props => <Avatar.Image size={48} source={{uri : uriImg}} />}
        />
      }
  }
  
  render() {
    var {SearchBarVisible} = this.context;
    return (
      
        <View style={styles.container}>
         <View>
          {
            SearchBarVisible && 
            <Searchbar
            placeholder="Buscar"
            value=""
        
            />
          } 
          </View>
          <View>
            <FlatList
              data={this.state.dataUsers}
              renderItem={({item}) => (
                this.listItem(item)
              )}
              keyExtractor={(item) => item._id}
            />
          </View>
          <FAB
            style={styles.fab}
            small={false}
            icon="plus"
            onPress={() => {
                this.props.navigation.push("RegisterUsers");
            }}
          />
          <View>
            
          </View>
        </View>
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
export default ListUsers;