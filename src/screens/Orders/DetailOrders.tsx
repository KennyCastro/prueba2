import React, {Component} from "react";
import {View, Text, Platform, FlatList, StyleSheet} from "react-native"; 
import { StackNavigationProp } from '@react-navigation/stack';
import axios from "axios";
import {Appbar, List, Avatar, FAB, Searchbar} from "react-native-paper";
import { Item } from "react-native-paper/lib/typescript/components/List/List";

interface ItemProducto {
  _id: string,
  name: string;
  uriimage: string;
  pathavathar: string;
  stock: number;
  price: number;
  ofert: number;
  registerdate: Date;
}
interface ServerResponse {
  serverResponse:Array<ItemProducto>
}

interface MyState {
  dataProducts: Array<ItemProducto>
}
interface ItemData {
  item: ItemProducto
}
interface MyProps {
    navigation: StackNavigationProp<any, any>
}

class DetailOrder extends Component<MyProps,MyState> {
    constructor(props:any){
      super(props);
      this.state = {
        dataProducts: []
      }
    }

    async componentDidMount(){
      var result: Array<ItemProducto> = await axios.get<ServerResponse>("http://192.168.100.9:8000/pedido/producto").then((item) => {
        return item.data.serverResponse
      });
      this.setState({
        dataProducts: result
      });
    }


    listItem(item: ItemProducto) {
      //var item : ItemUser = params.item
      if (item.uriimage == null) {
        return <List.Item
        title={item.name}
        description={item.price}
        onPress={() => {
            this.props.navigation.push("RegisterOrders");
        }}
        left={props => <Avatar.Text size={48} label={item.name.charAt(0)}    />}
        />
      } else {
        var uriImg: string = "http://192.168.100.9:8000" + item.uriimage;
        return <List.Item
                  title={item.name}
                  description={item.price}
                  onPress={() => {
                    this.props.navigation.push("RegisterOrders");
                }}
                  left={props => <Avatar.Image size={48} source={{uri : uriImg}} />}
        />
      }
  }
    render() {
        return (
          <View style={styles.container}>
          <View>
          
          </View>
          <View>
            <FlatList
              data={this.state.dataProducts}
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
                this.props.navigation.push("Order");
            }}
          />
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

export default DetailOrder;