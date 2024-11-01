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
  console.log(route.params.obj);
  const navigation = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favoritedItems, setFavoritedItems] = useState(new Set());
  const [likedItems, setLikedItems] = useState(new Set());  // Usado para armazenar os itens que o usuário gostou
  const [dislikes, setDislikes] = useState(new Map());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorited = await AsyncStorage.getItem('favoritedItems');
        if (favorited) {
          setFavoritedItems(new Set(JSON.parse(favorited)));
        }
        const liked = await AsyncStorage.getItem('likedItems');
        if (liked) {
          setLikedItems(new Set(JSON.parse(liked)));
        }
      } catch (error) {
        console.error('Failed to load favorites or likes:', error);
      }
    };
    loadFavorites();
  }, []);

  useEffect(() => {
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
    fetchData();
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
          <Text style={styles.sidebarTitle}>Bem-vindo, {route.params.obj.nome}</Text>
          <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateToScreen('LoginScreen')}>
            <Text style={styles.sidebarItemText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateToScreen('RegisterScreen')}>
            <Text style={styles.sidebarItemText}>Registrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem} onPress={handleLogout}>
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

  const handleLikeToggle = async (itemId) => {
    const updatedLikes = new Set(likedItems);

    if (updatedLikes.has(itemId)) {
      // Remove o like
      updatedLikes.delete(itemId);
      console.log("Like removido.");
    } else {
      // Adiciona um like
      updatedLikes.add(itemId);
      console.log("Like adicionado.");
    }

    setLikedItems(updatedLikes);

    try {
      // Persistindo likes no AsyncStorage
      await AsyncStorage.setItem('likedItems', JSON.stringify([...updatedLikes]));
      // Aqui você pode opcionalmente atualizar o backend
      await axios.post(`http://10.0.2.2:8085/api/updateLikes`, { id: itemId, likes: updatedLikes.has(itemId) ? 1 : 0 });
    } catch (error) {
      console.error('Erro ao atualizar likes:', error);
    }
  };

  const handleDislikeToggle = async (itemId) => {
    try {
      const updatedDislikes = new Map(dislikes);
      
      if (updatedDislikes.has(itemId)) {
        updatedDislikes.set(itemId, updatedDislikes.get(itemId) + 1);
      } else {
        updatedDislikes.set(itemId, 1);
      }

      setDislikes(updatedDislikes);
      
      await axios.post(`http://10.0.2.2:8085/api/updateDislikes`, { id: itemId, dislikes: updatedDislikes.get(itemId) });
    } catch (error) {
      console.error('Erro ao atualizar dislikes:', error);
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
                <TouchableOpacity onPress={() => handleLikeToggle(item.id)}>
                  <Icon name={likedItems.has(item.id) ? "thumb-up" : "thumb-up-alt"} size={20} color={likedItems.has(item.id) ? "blue" : "grey"} />
                  <Text>{likedItems.has(item.id) ? 1 : 0}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDislikeToggle(item.id)}>
                  <Icon name="thumb-down" size={20} color={dislikes.get(item.id) ? "red" : "grey"} />
                  <Text>{dislikes.get(item.id) || 0}</Text>
                </TouchableOpacity>
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