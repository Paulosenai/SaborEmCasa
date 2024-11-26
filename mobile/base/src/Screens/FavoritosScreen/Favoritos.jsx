import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Favorite_Url = 'http://10.0.2.2:8085/api/readReceitaPub';

const Favorites = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

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

  const fetchAllRecipes = async () => {
    const response = await fetch(Favorite_Url);
    return await response.json();
  };

  useEffect(() => {
    loadRecipesAndFavorites();
    const interval = setInterval(() => {
      loadRecipesAndFavorites();
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleFavoriteToggle = async (id) => {
    const updatedFavorites = favorites.some(favItem => favItem.id === id)
      ? favorites.filter(favItem => favItem.id !== id)
      : [...favorites, recipes.find(recipe => recipe.id === id)];

    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favoritedItems', JSON.stringify(updatedFavorites.map(item => item.id)));
  };

  const handleVizualizar = (id) => {
    navigation.navigate('Receita', { id });
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Receitas Favoritas</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma receita favoritada ainda.</Text>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={item => String(item.id)}
            numColumns={2}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Favorites;
