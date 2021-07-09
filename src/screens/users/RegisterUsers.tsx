import React, { Component } from "react";
import {View, StyleSheet, Alert} from "react-native"; 
import {TextInput, Button, Avatar, RadioButton, Text} from "react-native-paper";
import {StackNavigationProp} from "@react-navigation/stack";
import axios, { AxiosResponse } from "axios";
//const [value, setValue] = React.useState('first');

interface ItemUser{
    username?: string,
    email?: string,
    password?: string,
    repassword?: string
  }
interface Mystate {
    username: string,
    email: string,
    tipo: string,
    password: string,
    repassword: string,
    isload: boolean,
    pathImg?: string
}
interface MyProps {
    navigation: StackNavigationProp<any, any>
}
class RegisterUsers extends Component<MyProps, Mystate> {
    constructor(props: any) {
        super(props);
        this.state = {
            isload: false,
            username: "", email: "", password: "", repassword:"", tipo:""
        }
    }
    async checkandSendData() {
        var navigation:StackNavigationProp<any, any> = this.props.navigation;
        console.log(this.state);
        if (this.state.password != this.state.repassword) {
            return;
        }
        var result: any = await axios.post<ItemUser, AxiosResponse<any>>("http://192.168.100.9:8000/api/users", this.state)
        .then((response) => {
            return response.data;
        });
        console.log(result);
        if (this.state.isload) {
            var data = new FormData();
            data.append("avatar", {
            name: "avatar.jpg", 
            uri: this.state.pathImg, 
            type: "image/jpg"});
            console.log("http://192.168.100.9:8000/api/uploadportrait/" + result.serverResponse._id)
            fetch("http://192.168.100.9:8000/api/uploadportrait/" + result.serverResponse._id, {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: data
            }).then((result) => {
                result.json();
            }).then((result) => {
                console.log(result);
                navigation.push("list");
            });
            /*var result_img = await axios.post("http://192.168.0.106:8000/api/uploadportrait/" + result.serverResponse._id, data,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((response) => {
                return response.data;
            });
            navigation.push("list");
            //console.log(result_img);
            */
        }
        navigation.push("list");
    }
    onTakePicture(path: string) {
        //console.log(path);
        this.setState({
            pathImg: path,
            isload: true
        })
    }
    showAvatar() {
        if (this.state.isload) {
            return <Avatar.Image size={150} source={{uri: this.state.pathImg}} />
        } else {
            return <Avatar.Image size={150} source={require('../../../assets/img/batman.png')} />
            
        }
    }
  render() {
    return (
        <View style= {styles.container}>
            <TextInput style={styles.txtStyles}
            label="User Name"
            onChangeText={text => {  
                this.setState({
                    username: text
                })
            }}/>
            <TextInput style={styles.txtStyles}
            label="Email"
            onChangeText={text => {   
                this.setState({
                    email: text
                })
            }}/>
            <TextInput style={styles.txtStyles}
            label="Tipo"
            onChangeText={text => {   
                this.setState({
                    tipo: text
                })
            }}/>
            <TextInput style={styles.txtStyles}
            label="Password"
            onChangeText={text => {   
                this.setState({
                    password: text
                })
            }}/>
            <TextInput style={styles.txtStyles}
            label="Re. Password"
            onChangeText={text => {   
                this.setState({
                    repassword: text
                })
            }}/>
            
            <Button style={styles.txtStyles} icon="camera" mode="contained" onPress={() => {
                //this.checkandSendData();
                this.props.navigation.push("TakePicture", {onTake: (params: string) => {
                    this.onTakePicture(params);
                }});
            }}>
                Tomar Foto
            </Button>
            <View style={styles.avatarView}>
                {this.showAvatar()}
            </View>
            <Button style={styles.txtStyles} icon="gnome" mode="contained" onPress={() => {
                this.checkandSendData();
            }}>
                Create
            </Button>
        </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    txtStyles: {
        marginTop: 10
    },
    avatarView: {
        alignItems: "center"
    }
}   
);
export default RegisterUsers;