import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useRoute } from '@react-navigation/native';

const ReclamacoesConcorrentesScreen = () => {
    const route = useRoute();
    const { empresa } = route.params; // Obtém o nome da empresa
    const [reclamacoes, setReclamacoes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReclamacoes = async () => {
            try {
                const response = await fetch(`https://b4c0-187-49-184-225.ngrok-free.app/reclamacoes/${empresa}`);
                const data = await response.json();
                console.log(data); // Para depuração
                setReclamacoes(data.dados.slice(0, 5)); // Limita a 5 reclamações
            } catch (error) {
                console.error("Erro ao buscar reclamações:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReclamacoes();
    }, [empresa]);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.titulo ? String(item.titulo) : "Sem título"}</Text>
            <Text style={styles.itemText}>{item.descricao ? String(item.descricao) : "Sem descrição"}</Text>
            <Text style={styles.itemText}>{item.status ? String(item.status) : "Sem status"}</Text>
            <Text style={styles.itemText}>{item.tempo ? String(item.tempo) : "Sem tempo"}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#FFFFFF" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={reclamacoes}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={<Text style={styles.emptyListText}>Nenhuma reclamação encontrada.</Text>}
                />
            )}
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
});

export default ReclamacoesConcorrentesScreen;