import React, {Component} from "react";
import {Text, View, FlatList, TouchableOpacity, StyleSheet} from "react-native";
import api from "../services/api"

export default class Main extends Component {
    static navigatorOptions = {
        title: "Salve os Dog"
    };

    state = {
        docs: [],
        productsInfo: {},
        page: 1,
    };

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        const { docs, ...productsInfo } = response.data;

        this.setState({ 
            docs : [...this.state.docs, ...docs],
            productsInfo,
            page,
         });
    };
    renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <TouchableOpacity 
                style={styles.productButton} 
                onPress={() => {
                    this.props.navigation.navigate("Product");
                }}
                >
                <Text style={styles.productButtonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    );

    LoadMore = () => {
        const { page, productsInfo } = this.state;
        if ( page === productsInfo.pages ) return;
        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
    }
     render(){
         return(
         <View style={styles.container}>
             <FlatList 
                contentContainerStyle={styles.list}
                data={this.state.docs}
                keyExtractor={item => item._id}
                renderItem={this.renderItem}
                onEndReached={this.LoadMore}
                onEndReachedThreshold={0.1}
             />
         </View>
         )};
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
    },
    list: {
        padding: 20,
    },
    productContainer: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,
    },
    productDescription: {
        fontSize: 16,
        color: "#999",
        marginTop: 5,
        lineHeight:24,
    },
    productButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#DA552F",
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    productButtonText: {
        fontSize: 16,
        color: "#DA552F",
        fontWeight: "bold",
    }
});