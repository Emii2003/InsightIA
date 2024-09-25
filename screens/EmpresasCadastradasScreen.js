import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const EmpresasCadastradasScreen = ({ route }) => {
    const { empresas } = route.params;
    const navigation = useNavigation(); 

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity 
                style={styles.item} 
                onPress={() => navigation.navigate('ReclamacoesConcorrentesScreen', { empresa: item })}>
                <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>Empresas Cadastradas</Text>
            <FlatList
                data={empresas}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={<Text style={styles.emptyListText}>Nenhuma empresa cadastrada.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#272727",
        justifyContent: "center", 
        alignItems: "flex-start",  
        padding: 20, 
    },
    headerText: {
        fontSize: 24,
        color: "#FFFFFF",
        marginBottom: 20,
        marginTop: 50,
        fontWeight: "bold",
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        width: "100%",
    },
    itemText: {
        fontSize: 16,
        color: "#FFFFFF",
    },
    emptyListText: {
        fontSize: 16,
        color: "#FFFFFF",
    },
    closeButton: {
        position: "absolute",
        top: 20,
        right: 20,
        borderRadius: 15,
        padding: 10,
    },
    closeButtonText: {
        color: "#FFFFFF",
        fontSize: 20,
    },
});

export default EmpresasCadastradasScreen;
