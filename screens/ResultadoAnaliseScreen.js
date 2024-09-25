import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Botao from "../components/Botao";
import Rodape from "../components/Rodape";

const ResultadoAnaliseScreen = () => {
    const currentRoute = useRoute().name;
    const navigation = useNavigation();

    const [view, setView] = useState("minhaEmpresa");
    const [empresas, setEmpresas] = useState([]); // Inicialize com um array vazio

    const fetchEmpresas = async () => {
        try {
            const response = await fetch(`https://b4c0-187-49-184-225.ngrok-free.app/empresas/`);
            const data = await response.json();
            console.log("Dados recebidos:", data);

            if (data.Empresas && Array.isArray(data.Empresas[0])) {
                setEmpresas(data.Empresas[0]); // Acessa o primeiro array
            } else {
                setEmpresas([]);
            }
        } catch (error) {
            console.error("Error fetching empresas:", error);
        }
    };

    useEffect(() => {
        fetchEmpresas(); 
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Botao
                    name="Minha empresa"
                    onPress={() => setView("minhaEmpresa")}
                    backgroundColor={view === "minhaEmpresa" ? "#A03651" : "#431420"}
                    textColor="#FFFFFF"
                    style={{ marginBottom: 20, width: 150, marginRight: 30, height: 25 }}
                />
                <Botao
                    name="Concorrentes"
                    onPress={() => setView("concorrentes")}
                    backgroundColor={view === "concorrentes" ? "#A03651" : "#431420"}
                    textColor="#FFFFFF"
                    style={{ marginBottom: 20, width: 150, height: 25 }}
                />
            </View>

            {view === "minhaEmpresa" ? (
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Image
                            source={require("../assets/ResultadoAnaliseScreen/ReclameAqui.png")}
                            style={{ marginRight: 15 }}
                        />
                        <Text style={styles.headerText}>Reclame aqui</Text>
                    </View>
                    <Text style={styles.sectionHeaderText}>Dados coletados</Text>
                    <Botao
                        name="Reclamações"
                        onPress={() => navigation.navigate("ReclamacoesScreen")}
                        backgroundColor="#A03651"
                        textColor="#FFFFFF"
                        style={{ marginBottom: 20 }}
                    />
                </View>
            ) : (
                <View style={styles.section}>
                    <Text style={styles.headerText}>Concorrentes</Text>
                    <Text style={styles.sectionHeaderText}>
                        Veja os pontos negativos da sua empresa concorrente e receba insights valiosos.
                    </Text>
                    <Botao
                        name="Concorrentes Cadastradas"
                        onPress={() => navigation.navigate("EmpresasCadastradasScreen", { empresas })} // Navega para a nova tela
                        backgroundColor="#A03651"
                        textColor="#FFFFFF"
                    />
                </View>
            )}

            <View style={styles.section}>
                <Text style={styles.sectionHeaderText}>Insights Gerados</Text>
                {view === "minhaEmpresa" && (
                    <Botao
                        name="Sugestões de melhorias"
                        onPress={() => navigation.navigate("GeminiAnaliseInterna")}
                        backgroundColor="#A03651"
                        textColor="#FFFFFF"
                        style={{ marginBottom: 20 }}
                    />
                )}
                {view === "concorrentes" && (
                    <Botao
                        name="Comparações com minha empresa"
                        onPress={() => navigation.navigate("GeminiAnaliseExterna")}
                        backgroundColor="#A03651"
                        textColor="#FFFFFF"
                        style={{ marginBottom: 20 }}
                    />
                )}
                 {view === "minhaEmpresa" && ( // Condição para exibir o botão
                    <Botao
                        name="Visualizar em gráfico"
                        onPress={() => {
                            navigation.navigate('GraficoScreen', { empresa: 'lojas-marisa-loja-fisica' });
                        }}
                        backgroundColor="#A03651"
                        textColor="#FFFFFF"
                    />
                )}
            </View>

            <View style={styles.footer}>
                <Rodape
                    onAnalisePress={() => navigation.navigate("ResultadoAnaliseScreen")}
                    onSearchPress={() => navigation.navigate("Search")}
                    onProfilePress={() => navigation.navigate("Profile")}
                    currentRoute={currentRoute}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#272727",
        justifyContent: "center",
        alignItems: "center",
    },
    section: {
        padding: 20,
        backgroundColor: "#333333",
        marginBottom: 20,
        borderRadius: 10,
        width: "90%",
    },
    row: {
        flexDirection: "row",
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        color: "#FFFFFF",
        marginBottom: 20,
        fontWeight: "bold",
    },
    sectionHeaderText: {
        fontSize: 18,
        color: "#FFFFFF",
        marginBottom: 10,
    },
    footer: {
        width: "100%",
        height: "10%",
        backgroundColor: "#333",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        bottom: 0,
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

export default ResultadoAnaliseScreen;