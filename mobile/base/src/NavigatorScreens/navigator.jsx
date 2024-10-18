import LoginScreen from '../Screens/LoginScreen/Login';
import RegisterScreen from '../Screens/RegisterScreen/Register';
import Receita from '../Screens/HomeScreen/Receita';
import SalgadosScreen from '../Screens/Categoria/Salgados';
import SaudavelScreen from '../Screens/Categoria/Saudavel';
import BebidaScreen from '../Screens/Categoria/Bebida';
import DoceScreen from '../Screens/Categoria/Doce';
import SemAcucarScreen from '../Screens/Categoria/SemAcucar';
import ReceitaCategorias from '../Screens/Categoria/ReceitaCategorias';
import CadastrarReceitas from '../Screens/CadastroReceitas/CadastrarReceitas';
import VisualizacaoReceitas from '../Screens/ReceitasScreen/VisualizacaoReceitas';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import { Inicio } from './TabNavigator';

const Stack = createStackNavigator();

export default function StartNavigator() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.ModalSlideFromBottomIOS 
          }}
          initialRouteName='LoginScreen'
        >
          <Stack.Screen name="TabScreen" component={Inicio} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Receita" component={Receita} />
          <Stack.Screen name="SalgadosScreen" component={SalgadosScreen} />
          <Stack.Screen name="SaudavelScreen" component={SaudavelScreen} />
          <Stack.Screen name="BebidaScreen" component={BebidaScreen} />
          <Stack.Screen name="DoceScreen" component={DoceScreen} />
          <Stack.Screen name="SemAcucarScreen" component={SemAcucarScreen} />
          <Stack.Screen name="ReceitaCategorias" component={ReceitaCategorias} />
          <Stack.Screen name="CadastrarReceitas" component={CadastrarReceitas} />
          <Stack.Screen name="VisualizaçãoReceitas" component={VisualizacaoReceitas} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }