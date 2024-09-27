import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Image, Text, SafeAreaView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from "./Styles";

const FAVORITE_API_URLS = [
  'http://10.0.2.2:8085/api/readNews',
  'http://10.0.2.2:8085/api/readNews/bebida', 
  'http://10.0.2.2:8085/api/readNews/doce',
  'http://10.0.2.2:8085/api/readNews/salgado',
  'http://10.0.2.2:8085/api/readNews/saudavel', 
  'http://10.0.2.2:8085/api/readNews/semacucar', 
];

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorited = await AsyncStorage.getItem('favoritedItems');
        if (favorited) {
          const favoritedIds = JSON.parse(favorited);
          const allRecipes = await fetchAllRecipes();
          const favoritedItems = allRecipes.filter(item => favoritedIds.includes(item.id));
          setFavorites(favoritedItems);
        }
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    };

    loadFavorites();
  }, []);

  const handleVizualizar = (id) => {
    navigation.navigate('Receita', { id });
  };

  const handleFavoriteToggle = async (id) => {
    try {
      const favorited = await AsyncStorage.getItem('favoritedItems');
      const favoritedIds = favorited ? JSON.parse(favorited) : [];

      const updatedFavoritedIds = favoritedIds.includes(id)
        ? favoritedIds.filter(favId => favId !== id)  
        : [...favoritedIds, id]; 

      await AsyncStorage.setItem('favoritedItems', JSON.stringify(updatedFavoritedIds));
      const allRecipes = await fetchAllRecipes();  
      const favoritedItems = allRecipes.filter(item => updatedFavoritedIds.includes(item.id));
      setFavorites(favoritedItems);
    } catch (error) {
      console.error('Failed to update favorites:', error);
    }
  };

  const fetchAllRecipes = async () => {
    const promises = FAVORITE_API_URLS.map(url => fetch(url).then(response => response.json()));
    const results = await Promise.all(promises);
    return results.flat();
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => handleVizualizar(item.id)}>
          <Image source={require("../../../res/img/purê.png")} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <TouchableOpacity onPress={() => handleFavoriteToggle(item.id)}>
              <Text style={styles.favoriteButton}>
                {favorites.some(favItem => favItem.id === item.id) ? 'Tirar dos favoritos' : 'Favorite'}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Itens Favoritados</Text>
      </View>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        extraData={favorites}
        columnWrapperStyle={styles.row}
      />
    </SafeAreaView>
  );
};



export default Favorites;
