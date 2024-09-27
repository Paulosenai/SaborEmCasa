import React, { useState, useEffect, useCallback } from "react";
import { View, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity, FlatList, TextInput, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Header } from '@rneui/themed';
import styles from "./Styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Sidebar = ({ isOpen, onClose, userData }) => {
  const [translateX] = useState(new Animated.Value(300));
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : 300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
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
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Fechar</Text>
      </TouchableOpacity>

      <View style={styles.sidebarContent}>
        {userData ? (
          <>
            <Text style={styles.sidebarTitle}>Bem-vindo, {userData.name}!</Text>
            <Text style={styles.sidebarEmail}>{userData.email}</Text>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.sidebarItem} onPress={handleLogout}>
              <Text style={styles.sidebarItemText}>Logout</Text>
            </TouchableOpacity>
            <Text style={styles.sidebarTitle}>Login</Text>
            <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateToScreen('LoginScreen')}>
              <Text style={styles.sidebarItemText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateToScreen('RegisterScreen')}>
              <Text style={styles.sidebarItemText}>Registrar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Animated.View>
  );
};

function Home({ route }) {
  const navigation = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [favoritedItems, setFavoritedItems] = useState(new Set());

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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8085/api/readNews');
      const sortedData = response.data.sort((a, b) => a.id - b.id);
      setData(sortedData);
      setFilteredData(sortedData);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const toggleSearch = () => {
    setIsSearchVisible(prev => !prev);
    if (isSearchVisible) {
      setSearchQuery('');
      setFilteredData(data);
    }
  };

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => item.title.toLowerCase().includes(query.toLowerCase())));
    }
  }, [data]);

  const handleVizualizar = (id) => {
    navigation.navigate('Receita', { id });
  };

  const handleFavoriteToggle = async (itemId) => {
    const updatedFavorites = new Set(favoritedItems);
    if (updatedFavorites.has(itemId)) {
      updatedFavorites.delete(itemId);
    } else {
      updatedFavorites.add(itemId);
    }
    setFavoritedItems(updatedFavorites);

    try {
      await AsyncStorage.setItem('favoritedItems', JSON.stringify([...updatedFavorites]));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  };

  const renderItem = ({ item }) => (
    <SafeAreaView>
      <View style={styles.item}>
        <View style={styles.card}>
          <TouchableOpacity onPress={() => handleVizualizar(item.id)}>
            <Image source={require("../../../res/img/sapocururu.jpg")} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity onPress={() => handleFavoriteToggle(item.id)}>
                <Icon
                  name={favoritedItems.has(item.id) ? 'favorite' : 'favorite-border'}
                  size={24}
                  color="red"
                />
              </TouchableOpacity>
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
          centerComponent={isSearchVisible ? (
              <TextInput
                style={styles.searchInput}
                placeholder="Pesquisar..."
                placeholderTextColor={'#fff'}
                value={searchQuery}
                onChangeText={handleSearch}
              />
          ) : null}
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
            <TouchableOpacity onPress={() => navigation.navigate('SalgadosScreen')}>
              <Image source={require('../../../res/img/feijoada.png')} style={styles.imageCategoriaIcons} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SaudavelScreen')}>
              <Image source={require('../../../res/img/salada.png')} style={styles.imageCategoriaIcons} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('DoceScreen')}>
              <Image source={require('../../../res/img/brigadeiro.png')} style={styles.imageCategoriaIcons} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('BebidaScreen')}>
              <Image source={require('../../../res/img/bebida.png')} style={styles.imageCategoriaIcons} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SemAcucarScreen')}>
              <Image source={require('../../../res/img/semdoces.png')} style={styles.imageCategoriaIcons} />
            </TouchableOpacity>
          </View>
        </View>
        
        <FlatList 
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
          numColumns={2}
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
