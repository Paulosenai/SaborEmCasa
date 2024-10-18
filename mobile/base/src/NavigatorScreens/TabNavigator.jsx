import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Icon } from '@rneui/themed';
import Home from '../Screens/HomeScreen/HomePage';
import ContatoScreen from '../Screens/ContatoScreen/Contato';
import FavoritoScreen from '../Screens/favoritos/FavoritedItems';
import ReceitaScreen from '../Screens/ReceitasScreen/ReceitasUsuarios';
import CadastrarReceitas from '../Screens/CadastroReceitas/CadastrarReceitas';
import axios from 'axios'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export function Inicio({route}) {
  const obj = route.params.userData
  console.log(obj)

  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Página Inicial') {
          iconName = focused
            ? 'home'
            : 'home-outline';
        } else if (route.name === 'Receitas') {
          iconName = focused
           ? 'flame'
           : 'flame-outline';
        }
         else if (route.name === 'Favoritos') {
          iconName = focused
           ? 'heart'
           : 'heart-outline';
        }
         else if (route.name === 'Contato') {
          iconName = focused
           ? 'call'
           : 'call-outline';
        }
        
        return  <Icon
        type='ionicon'
        name={iconName}
        size={25}
        color={color}
      /> 
      },

      tabBarStyle: {
        height: 50,
        backgroundColor: 'white',
        borderColor: '#EDE9E4',
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'black',
      tabBarLabelStyle:{
        fontSize: 12,
      }
    }
    )}
  >
    <Tab.Screen initialParams={{ obj }} options={{headerShown: false}} name="Página Inicial" component={Home} />
    <Tab.Screen initialParams={{ obj }} options={{headerShown: false}} name="Receitas" component={ReceitaScreen} />
    <Tab.Screen initialParams={{ obj }}
     options={{headerShown: false, tabBarStyle: {
      display: "none",
    }, tabBarIcon: ({focused, color, size}) => {
            return (
                  <View>  
                <View style={{ alignSelf:"center", alignItens:"center", justifyContent:"center", marginBottom: 35}} >
                <View style={styles.centerButton}>
                  <Image
                    source={require("../../res/img/chefchapeu.png")}
                    style={styles.newsImage}
                />
                </View>
                </View>
              </View>
            );
          },
          }} name=" " component={CadastrarReceitas} />
    <Tab.Screen initialParams={{obj}} options={{headerShown: false}} name="Favoritos" component={FavoritoScreen} />
    <Tab.Screen initialParams={{obj}} options={{headerShown: false}} name="Contato" component={ContatoScreen} />
  </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopColor: '#fff',
    borderTopWidth: 1,
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsImage: {
    left: 12,
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
    alignSelf: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
});
