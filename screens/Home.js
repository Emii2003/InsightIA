import { StyleSheet, Text, View, Image } from 'react-native';
import Botao from '../components/Botao'; 
import Titulo from '../components/Titulo'; 

export default function Home({ navigation }) {

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentMain}>
        <Image
          style={styles.imgHome}
          source={require('../assets/Home/pana.png')}  
        />
        <View style={styles.textHome}>
          <Titulo style={styles.textMain}>
            Insight <Text style={styles.innerText}>IA</Text>
          </Titulo>
          <View style={styles.buttonContainer}>
            <Botao
              name="Cadastre-se"
              onPress={() => navigateTo("RegistraUsuario")}
              backgroundColor="#A03651"
              textColor="#fff"
            />
            <Botao
              name="Login"
              onPress={() => navigateTo("Login")}
              borderColor="#DC8AA8"
              textColor="#DC8AA8"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232222',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  contentMain: {
    alignItems: 'center',
  },
  textMain: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    fontStyle: 'italic',
    marginBottom: 30,
    fontWeight: '300'
  },
  innerText: {
    color: '#A03651',
  },
  imgHome: {
    width: 200,
    height: 200,
  },
  textHome: {
    marginVertical: 80,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
