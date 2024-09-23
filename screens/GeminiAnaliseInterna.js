import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Markdown from "react-native-markdown-display";

const GeminiAnaliseInterna = ({ navigation }) => {
  const [sugestoes, setSugestoes] = useState("");
  const [causas, setCausas] = useState("");
  const [isLoading, setLoading] = useState(true);

  const empresa = "lojas-marisa-loja-fisica";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `https://d7ab-2804-1b3-a440-2dae-b5a9-6fa8-ee6c-f7ad.ngrok-free.app/gemini/complexa/${empresa}`
        );
        setSugestoes(response.data.mensagem.sugestao);
        setCausas(response.data.mensagem.causas);
      } catch (error) {
        console.error("Erro ao obter dados:", error);
        setSugestoes("Erro ao obter sugestões.");
        setCausas("Erro ao obter causas.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>x</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#FFFFFF"
          style={styles.loadingIndicator}
        />
      ) : (
        <ScrollView style={styles.scrollView}>
          <Markdown style={markdownStyles}>
            {`${sugestoes}\n\n\n${causas}`}
          </Markdown>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272727",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 30,
    color: "#FFF",
  },
  headerText: {
    fontSize: 22,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  loadingIndicator: {
    alignSelf: "center",
    marginVertical: 20,
  },
});

const markdownStyles = {
  body: { color: "#FFF", fontSize: 18 },
  heading: { color: "#FFF" },
};

export default GeminiAnaliseInterna;