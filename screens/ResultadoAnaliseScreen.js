import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Botao from "../components/Botao";
import Rodape from "../components/Rodape";

const ResultadoAnaliseScreen = ({}) => {
  const currentRoute = useRoute().name;
  const navigation = useNavigation();

  const [view, setView] = useState("minhaEmpresa");

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    data: [10, 20, 15, 25, 30],
  };

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
        // Conteúdo para "Minha empresa"
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
        // Conteúdo para "Concorrentes"
        <View style={styles.section}>
          <Text style={styles.headerText}>Concorrentes</Text>
          <Text style={styles.sectionHeaderText}>
          Veja os pontos negativos da sua empresa  concorrente e receba insights valiosos.
          </Text>
          <Botao
            name="Ver concorrentes"
            onPress={() => navigation.navigate("ConcorrentesScreen")}
            backgroundColor="#A03651"
            textColor="#FFFFFF"
            style={{ marginBottom: 20 }}
          />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionHeaderText}>Insights Gerados</Text>

        {/* Botão "Sugestões de melhoria" */}
        <Botao
          name="Sugestões de melhoria"
          onPress={() => {
            if (view === "minhaEmpresa") {
              navigation.navigate("GeminiAnaliseInterna"); 
            } else {
              navigation.navigate("SugestoesMelhoriaConcorrentes"); 
            }
          }}
          backgroundColor="#A03651"
          textColor="#FFFFFF"
          style={{ marginBottom: 20 }}
        />

        {/* Botão "Visualizar em gráfico" */}
        <Botao
          name="Visualizar em gráfico"
          onPress={() => {
            if (view === "minhaEmpresa") {
              navigation.navigate("GraficoScreen", {
                data: chartData,
                type: "empresa",
              }); 
            } else {
              navigation.navigate("GraficoScreen", {
                data: chartData,
                type: "concorrentes",
              }); 
            }
          }}
          backgroundColor="#A03651"
          textColor="#FFFFFF"
        />
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
});

export default ResultadoAnaliseScreen;
