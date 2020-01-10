import React, {Component} from "react";
import {Text, View} from "react-native";
import api from "../services/api"

export default class Main extends Component {
    static navigatorOptions = {
        title: "Salve os Dog"
    };

    state = {
        docs: [],
    };

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async () => {
        const response = await api.get("/products");
        const { docs } = response.data;

        this.setState({ docs : docs });
    };

     render(){
         return(
         <View>
             <Text>Pagina Main</Text>
             {this.state.docs.map(product => { 
             return <Text key={product._id}>{product.title}</Text>
             })}
         </View>
         )};
}