import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Icon } from '@rneui/themed';
import Home from '../Screens/HomeScreen/HomePage';
import ContatoScreen from '../Screens/ContatoScreen/Contato';
import FavoritoScreen from '../Screens/favoritos/FavoritedItems';
import ReceitaScreen from '../Screens/ReceitasScreen/ReceitasUsuarios';
import axios from 'axios'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const CustomTabBar = ({ state, descriptors, navigation}) => {
  
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;

        const iconName = getIconName(route.name, isFocused);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={label}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Icon
              type='ionicon'
              name={iconName}
              size={24}
              color={isFocused ? '#000' : '#888'}
            />
            <Text style={{ color: isFocused ? '#000' : '#888' }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity style={styles.centerButton} onPress={() => navigation.navigate('CadastrarReceitas')}>
        <Image
          source={require("../../res/img/chefchapeu.png")}
          style={styles.newsImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const getIconName = (routeName, focused) => {
  switch (routeName) {
    case 'Home':
      return focused ? 'home' : 'home-outline';
    case 'Receitas':
      return focused ? 'flame' : 'flame-outline';
    case 'Favoritos':
      return focused ? 'heart' : 'heart-outline';
    case 'Contato':
      return focused ? 'call' : 'call-outline';
    default:
      return 'home-outline'; 
  }
};
export function Inicio({route}) {
  const obj = route.params.userData
  console.log(obj)

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarStyle: { backgroundColor: '#fff'},
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#888',
      }}      
    >
      <Tab.Screen initialParams={{ obj }} name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen initialParams={{ obj }} name="Receitas" component={ReceitaScreen} options={{ headerShown: false }} /> 
      <Tab.Screen initialParams={{ obj }} name="Favoritos" component={FavoritoScreen} options={{ headerShown: false }} />
      <Tab.Screen initialParams={{ obj }} name="Contato" component={ContatoScreen} options={{ headerShown: false }} />
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
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  centerButton: {
    position: 'absolute',
    left: 175,
    bottom: 30,
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#FFA92C',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
});
