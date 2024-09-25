import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './context/UserContext';  

import Home from './screens/Home';
import Login from './screens/Login';
import RegistraUsuario from './screens/RegistraUsuario';
import RecuperarSenha from './screens/RecuperarSenha';
import Profile from './screens/Profile';
import Search from './screens/Search';
import ReclamacoesScreen from './screens/ReclamacoesScreen';
import ResultadoAnaliseScreen from './screens/ResultadoAnaliseScreen';
import GeminiAnaliseInterna from './screens/GeminiAnaliseInterna'
import GraficoScreen from './screens/GraficoScreen';
import GeminiAnaliseExterna from './screens/GeminiAnaliseExterna'
import EmpresasCadastradasScreen from './screens/EmpresasCadastradasScreen';
import ReclamacoesConcorrentesScreen from './screens/ReclamacoesConcorrentesScreen';

import 'react-native-gesture-handler';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(); 
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="RegistraUsuario" component={RegistraUsuario} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="ResultadoAnaliseScreen" component={ResultadoAnaliseScreen} />
      <Stack.Screen name="ReclamacoesScreen" component={ReclamacoesScreen} />
      <Stack.Screen name="GeminiAnaliseInterna" component={GeminiAnaliseInterna} />
      <Stack.Screen name="GraficoScreen" component={GraficoScreen} />
      <Stack.Screen name="GeminiAnaliseExterna" component={GeminiAnaliseExterna} />
      <Stack.Screen name="EmpresasCadastradasScreen" component={EmpresasCadastradasScreen} />
      <Stack.Screen name="ReclamacoesConcorrentesScreen" component={ReclamacoesConcorrentesScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </AuthProvider>
  );
}
