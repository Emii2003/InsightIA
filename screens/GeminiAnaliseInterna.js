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
          `https://b4c0-187-49-184-225.ngrok-free.app/gemini/complexa/${empresa}`
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
            {`## Sugestões\n\n${sugestoes}\n\n## Causas\n\n${causas}`}
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
  heading: { color: "#FFF", fontSize: 24, fontWeight: "bold" },
};

export default GeminiAnaliseInterna;
