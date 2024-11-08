import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import styles from './Styles'; 

const SearchScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState(route.params?.query || '');
  const [results, setResults] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // Armazenar a categoria selecionada
  const [categories, setCategories] = useState([]); // Armazenar as categorias disponíveis
  const [showCategories, setShowCategories] = useState(false); // Controlar a exibição do drop-down

  // Função para buscar todas as receitas
  const fetchAllRecipes = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8085/api/readReceitaPub'); 
      setAllRecipes(response.data);
      setResults(response.data);

      const uniqueCategories = [...new Set(response.data.map(recipe => recipe.categoria))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);


  useEffect(() => {
    const filteredResults = allRecipes.filter(recipe => 
      (recipe.nome.toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery) && 
      (selectedCategory ? recipe.categoria === selectedCategory : true)
    );
    setResults(filteredResults);
  }, [searchQuery, allRecipes, selectedCategory]);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => navigation.navigate('Receita', { id: item.id })} 
    >
      <Image source={{ uri: `data:image/jpeg;base64,${item.imagemReceita}` }} style={styles.image} />
      <Text style={styles.title}>{item.nome}</Text>
    </TouchableOpacity>
  );

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setShowCategories(false);
  };

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
        {searchQuery || selectedCategory ? (
          <TouchableOpacity onPress={clearFilters}>
            <Icon name="clear" size={24} color="#ccc" style={styles.clearIcon} />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity onPress={() => setShowCategories(!showCategories)}>
          <Icon name="filter-list" size={24} color="#ccc" style={styles.filterIcon} />
        </TouchableOpacity>
      </View>

      {showCategories && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showCategories}
          onRequestClose={() => setShowCategories(false)}
        >
          <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowCategories(false)}>
            <View style={styles.modalContent}>
              <ScrollView>
                <TouchableOpacity
                  style={[styles.categoryButton, selectedCategory === '' && styles.selectedCategory]}
                  onPress={() => { setSelectedCategory(''); setShowCategories(false); }}
                >
                  <Text style={styles.categoryButtonText}>Limpar Filtro</Text>
                </TouchableOpacity>
                {categories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
                    onPress={() => { setSelectedCategory(category); setShowCategories(false); }}
                  >
                    <Text style={styles.categoryButtonText}>{category}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>
      )}

      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
      />
    </View>
  );
};

export default SearchScreen;
