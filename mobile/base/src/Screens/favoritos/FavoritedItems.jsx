import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Image, Text, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from "./Styles";

const FAVORITE_API_URL = 'http://10.0.2.2:8085/api/readReceitaPub';

const Favorites = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  // Função para carregar receitas e favoritos
  const loadRecipesAndFavorites = async () => {
    try {
      const allRecipes = await fetchAllRecipes();
      setRecipes(allRecipes);
      const favorited = await AsyncStorage.getItem('favoritedItems');
      if (favorited) {
        const favoritedIds = JSON.parse(favorited);
        const favoritedItems = allRecipes.filter(item => favoritedIds.includes(item.id));
        setFavorites(favoritedItems);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  // Função para buscar todas as receitas
  const fetchAllRecipes = async () => {
    const response = await fetch(FAVORITE_API_URL);
    return await response.json();
  };

  useEffect(() => {
    loadRecipesAndFavorites(); // Carrega os dados inicialmente

    // Define um intervalo para atualizar os dados a cada 1,5 segundos
    const interval = setInterval(() => {
      loadRecipesAndFavorites();
    }, 1500);

    // Limpa o intervalo quando o componente desmonta
    return () => clearInterval(interval);
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
      
      const updatedFavorites = recipes.filter(item => updatedFavoritedIds.includes(item.id));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Failed to update favorites:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => handleVizualizar(item.id)}>
          <Image source={{ uri: `data:image/jpeg;base64,${item.imagemReceita}` }} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.title}>{item.nome}</Text>
            <TouchableOpacity onPress={() => handleFavoriteToggle(item.id)}>
              <Text style={styles.favoriteButton}>
                {favorites.some(favItem => favItem.id === item.id) ? 'Tirar dos favoritos' : 'Favoritar'}
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
      />
    </SafeAreaView>
  );
};

export default Favorites;