import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import styles from './Styles'; 

const SearchScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState(route.params?.query || '');
  const [results, setResults] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]); 

  const fetchAllRecipes = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8085/api/readReceitaPub'); 
      setAllRecipes(response.data);
      setResults(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filteredResults = allRecipes.filter(recipe => 
        recipe.nome.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults(allRecipes); 
    }
  }, [searchQuery, allRecipes]); 

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => navigation.navigate('Receita', { id: item.id })} 
    >
      <Image source={{ uri: `data:image/jpeg;base64,${item.imagemReceita}` }} style={styles.image} />
      <Text style={styles.title}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#ccc" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar receitas..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
      />
    </View>
  );
};

export default SearchScreen;