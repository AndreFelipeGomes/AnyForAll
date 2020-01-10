import React, {Component} from "react";
import {Text, View} from "react-native";
import api from "../services/api"

export default class Main extends Component {
    static navigatorOptions = {
        title: "Salve os Dog"
    };

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async () => {
        const response = await api.get("/products");
        const { docs } = response.data;

        console.log(docs);
    }

     render(){
         return(
         <View>
             <Text>Pagina Principal</Text>
         </View>
         )};
}