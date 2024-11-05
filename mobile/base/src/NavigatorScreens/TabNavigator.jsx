import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/HomeScreen/HomePage';
import ContatoScreen from '../Screens/ContatoScreen/Contato';
import ReceitaScreen from '../Screens/ReceitasScreen/ReceitasUsuarios';
import favoritosScreen from '../Screens/FavoritosScreen/Favoritos';
import CadastrarReceitas from '../Screens/CadastroReceitas/CadastrarReceitas';

const Tab = createBottomTabNavigator();

export function Inicio({route}) {
  const obj = route.params.userData;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Receitas User') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Favoritos') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Contato') {
            iconName = focused ? 'call' : 'call-outline';
          }
          
          return (
            <Icon
              type='ionicon'
              name={iconName}
              size={25}
              color={color}
            />
          );
        },

        tabBarStyle: {
          height: 60,
          backgroundColor: 'white',
          borderColor: '#EDE9E4',
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarHideOnKeyboard: true, 
      })}
    >
      <Tab.Screen initialParams={{ obj }} options={{headerShown: false}} name="Home" component={Home} />
      <Tab.Screen initialParams={{ obj }} options={{headerShown: false}} name="Receitas User" component={ReceitaScreen} />
      <Tab.Screen initialParams={{ obj }} 
        options={{
          headerShown: false,
          tabBarStyle: {
            display: "none",
          },
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.centerButton}>
                <Image
                  source={require("../../res/img/chefchapeu.png")}
                  style={styles.newsImage}
                />
              </View>
            );
          },
        }} 
        name="  " 
        component={CadastrarReceitas} 
      />

      <Tab.Screen initialParams={{ obj }} options={{headerShown: false}} name="Favoritos" component={favoritosScreen} />
      <Tab.Screen initialParams={{ obj }} options={{headerShown: false}} name="Contato" component={ContatoScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  newsImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  centerButton: {
    height: 65,
    width: 65,
    borderRadius: 40,
    backgroundColor: '#FFA92C',
    justifyContent: 'center',
    elevation: 10,
    alignItems: 'center',
  },
});