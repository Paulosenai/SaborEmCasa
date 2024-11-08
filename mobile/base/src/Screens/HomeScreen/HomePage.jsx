import React, { useState, useEffect } from "react";
import { View, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity, FlatList, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Header } from '@rneui/themed';
import styles from "./Styles";
import Icon from 'react-native-vector-icons/MaterialIcons';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from "react-native-paper";

function Home({ route }) {
  const navigation = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favoritedItems, setFavoritedItems] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorited = await AsyncStorage.getItem('favoritedItems');
        if (favorited) {
          setFavoritedItems(new Set(JSON.parse(favorited)));
        }
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    };
    loadFavorites();
  }, []);

  // Função para carregar os dados das receitas
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:8085/api/readReceitaPub`);
      const sortedData = response.data.sort((a, b) => a.id - b.id);
      setData(sortedData);
      setFilteredData(sortedData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Atualiza os dados a cada 5 segundos
  useEffect(() => {
    fetchData(); // Carrega os dados imediatamente na primeira renderização

    const intervalId = setInterval(() => {
      fetchData(); // Atualiza os dados a cada 5 segundos
    }, 5000); // 5000 ms = 5 segundos

    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente for desmontado
  }, []);

  const Sidebar = ({ isOpen, onClose }) => {
    const [translateX] = useState(new Animated.Value(300));
    
    useEffect(() => {
      Animated.timing(translateX, {
        toValue: isOpen ? 0 : 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [isOpen]);

    const navigateToScreen = (screenName) => {
      navigation.navigate(screenName, { obj: route.params.obj });
      onClose();
    };

    const handleLogout = async () => {
      try {
        await AsyncStorage.removeItem('userData');
        onClose();
        navigation.replace('LoginScreen');
      } catch (error) {
        console.error('Erro ao realizar logout:', error);
      }
    };

    return (
      <Animated.View style={[styles.sidebarContainer, { transform: [{ translateX }] }]}>
        <View style={styles.userInfoContainer}>
          <View style={styles.avatarContainer}>
            <Icon name="account-circle" size={40} color="#fff" style={styles.avatarIcon} />
            <Text style={styles.userName}>{route.params.obj.nome}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.sidebarContent}>
          <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateToScreen('Profile')}>
            <Icon name="person" size={24} color="#fff" style={styles.sidebarItemIcon} />
            <Text style={styles.sidebarItemText}>Meus Dados</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sidebarItem} onPress={handleLogout}>
            <Icon name="logout" size={24} color="#fff" style={styles.sidebarItemIcon} />
            <Text style={styles.sidebarItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  const handleFavoriteToggle = async (itemId) => {
    const updatedFavorites = new Set(favoritedItems);

    if (updatedFavorites.has(itemId)) {
      updatedFavorites.delete(itemId);
      console.log("Receita removida dos favoritos.");
    } else {
      updatedFavorites.add(itemId);
      console.log("Receita adicionada aos favoritos.");
    }

    setFavoritedItems(updatedFavorites);

    try {
      await AsyncStorage.setItem('favoritedItems', JSON.stringify([...updatedFavorites]));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const toggleSearch = () => {
    navigation.navigate('SearchScreen', { query: searchQuery });
  };

  const handleVizualizar = (id) => {
    navigation.navigate('Receita', { id });
  };

  const renderItem = ({ item }) => (
    <SafeAreaView>
      <View style={styles.item}>
        <View style={styles.card}>
          <TouchableOpacity onPress={() => handleVizualizar(item.id)}>
            <Image source={{ uri: `data:image/jpeg;base64,${item.imagemReceita}` }} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.title}>{item.nome}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => handleFavoriteToggle(item.id)}>
                  <Icon
                    name={favoritedItems.has(item.id) ? 'favorite' : 'favorite-border'}
                    size={24}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header
          backgroundColor="#FFA92C"
          barStyle="light-content"
          leftComponent={
            <View style={styles.headerComponentContainer}>
              <Image source={require('../../../res/img/logo2.png')} style={{ width: 90, height: 50 }} />
            </View>
          }
          rightComponent={(
            <View style={styles.headerIconsContainer}>
              <Icon
                name="search"
                size={30}
                color="#fff"
                onPress={toggleSearch}
                style={styles.headerIcon}
              />
              <Icon
                name="person"
                size={30}
                color="#fff"
                onPress={toggleSidebar}
                style={styles.headerIcon}
              />
            </View>
          )}
        />

        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <View style={styles.section}>
          <View style={styles.newsCard}>
            <ImageBackground
              source={require("../../../res/img/comidasBanner.jpg")}
              style={styles.newsImage}
            >
              <Text style={styles.bannerstyletext}>SABOR EM CASA</Text>
            </ImageBackground>
          </View>
          <View style={styles.categoria}>
            <TouchableOpacity onPress={() => navigation.navigate('SalgadosScreen', { categoria: 'salgado' })}>
              <Image source={require('../../../res/img/feijoada.png')} style={styles.imageCategoriaIcons} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SaudavelScreen', { categoria: 'saudavel' })}>
              <Image source={require('../../../res/img/salada.png')} style={styles.imageCategoriaIcons} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('DoceScreen', { categoria: 'doce' })}>
              <Image source={require('../../../res/img/brigadeiro.png')} style={styles.imageCategoriaIcons} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('BebidaScreen', { categoria: 'bebida' })}>
              <Image source={require('../../../res/img/bebida.png')} style={styles.imageCategoriaIcons} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SemAcucarScreen', { categoria: 'sem-acucar' })}>
              <Image source={require('../../../res/img/semdoces.png')} style={styles.imageCategoriaIcons} />
            </TouchableOpacity>
          </View>
        </View>

        {isLoading ? (
          <ActivityIndicator style={{ alignSelf: 'center', width: 150, height: '600' }} color="orange" />
        ) : (
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            extraData={filteredData}
            keyExtractor={item => String(item.id)}
            numColumns={2}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
