import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import Markdown from "react-native-markdown-display";
import Botao from "../components/Botao";

const GeminiAnaliseExterna = ({ navigation }) => {
  const [sugestoes, setSugestoes] = useState("");
  const [causas, setCausas] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [empresas, setEmpresas] = useState([]); // Estado para armazenar empresas
  const [showEmpresas, setShowEmpresas] = useState(false); // Estado para controlar a exibição da lista

  const empresa = "lojas-marisa-loja-fisica"; // Sua empresa

  // Função para buscar empresas
  const fetchEmpresas = async () => {
    try {
      const response = await fetch(`https://b4c0-187-49-184-225.ngrok-free.app/empresas/`);
      const data = await response.json();
      console.log("Dados recebidos:", data);

      // Acessa o primeiro array dentro do array de Empresas
      if (data.Empresas && Array.isArray(data.Empresas[0])) {
        setEmpresas(data.Empresas[0]); // Atualizado para acessar o primeiro array
      } else {
        setEmpresas([]);
      }
    } catch (error) {
      console.error("Error fetching empresas:", error);
    } finally {
      setLoading(false); // Certifique-se de que setLoading seja chamado aqui
    }
  };

  useEffect(() => {
    fetchEmpresas(); // Chama a função ao montar o componente
  }, []);

  // Função para buscar dados da concorrência
  const fetchData = async (concorrente) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://b4c0-187-49-184-225.ngrok-free.app/gemini/concorrencia/${empresa}/${concorrente}`
      );
      console.log("Dados da concorrência:", response.data); // Log para verificar os dados recebidos
      setSugestoes(response.data.mensagem.comum || "Nenhuma sugestão disponível."); // Usar valor padrão se não houver sugestões
      setCausas(response.data.mensagem.vantagem_desvantagem || "Nenhuma causa disponível."); // Usar valor padrão se não houver causas
    } catch (error) {
      console.error("Erro ao obter dados:", error);
      setSugestoes("Erro ao obter sugestões.");
      setCausas("Erro ao obter causas.");
    } finally {
      setLoading(false);
    }
  };

  // Função chamada quando uma empresa é selecionada
  const handleSelectEmpresa = (empresaSelecionada) => {
    fetchData(empresaSelecionada); // Chama a função para buscar dados da empresa selecionada
  };

  // Função para alternar a visibilidade das empresas
  const toggleEmpresasVisibility = () => {
    setShowEmpresas(!showEmpresas);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>x</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#FFFFFF" style={styles.loadingIndicator} />
      ) : (
        <>
          <Botao
            name={showEmpresas ? "Ocultar Empresas Cadastradas" : "Exibir Empresas Cadastradas"}
            onPress={toggleEmpresasVisibility}
            backgroundColor="#A03651"
            textColor="#FFFFFF"
          />

          {showEmpresas && (
            <FlatList
              data={empresas}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.item} onPress={() => handleSelectEmpresa(item)}>
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={<Text style={styles.emptyListText}>Nenhuma empresa cadastrada.</Text>}
              contentContainerStyle={styles.listContainer}
            />
          )}
          <View style={styles.markdownContainer}>
            <Markdown style={markdownStyles}>
              {`## Sugestões Comuns\n\n${sugestoes}\n\n## Vantagens e Desvantagens\n\n${causas}`}
            </Markdown>
          </View>
        </>
      )}
    </ScrollView>
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
  loadingIndicator: {
    alignSelf: "center",
    marginVertical: 20,
  },
  item: {
    padding: 15,
    backgroundColor: "#3c3c3c",
    borderRadius: 8,
    marginVertical: 5,
  },
  itemText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  emptyListText: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  markdownContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#3c3c3c",
    borderRadius: 8,
  },
});

const markdownStyles = {
  body: { color: "#FFF", fontSize: 18 },
  heading: { color: "#FFF", fontSize: 24, fontWeight: "bold" },
};

export default GeminiAnaliseExterna;