import React, { useState, useEffect } from "react";
import { View, SafeAreaView, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, Header } from '@rneui/themed';
import axios from 'axios';
import styles from "./Styles"; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { color } from "@rneui/base";

const TopRecipes = () => {
  const navigation = useNavigation();
  const [topRecipes, setTopRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTopRecipes = async () => {
    setIsLoading(true); 
    try {
      const response = await axios.get(`http://10.0.2.2:8085/api/readReceitasAlta`);
      const sortedData = response.data.sort((a, b) => b.likes - a.likes);
      setTopRecipes(sortedData);
    } catch (error) {
      console.error("Falha ao buscar as receitas:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchTopRecipes(); 
    const interval = setInterval(fetchTopRecipes, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleViewRecipe = (id) => {
    navigation.navigate('Receita', { id });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => handleViewRecipe(item.id)}>
          <Image 
            source={{ uri: `data:image/jpeg;base64,${item.imagemReceita}` }}
            style={styles.image} 
            resizeMode="cover" 
          />
          <View style={styles.content}>
            <Text style={styles.title}>{item.nome}</Text>
            <View style={styles.likesContainer}>
              <Icon name="thumb-up" size={24} color="blue" />
              <Text style={styles.likesText}>{item.likes}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
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
                name="person"
                size={30}
                color="#fff"
                style={styles.headerIcon}
              />
            </View>
          )}
        />
      {isLoading ? (
        <ActivityIndicator style={styles.loader} color="orange" />
      ) : (
        <FlatList
          data={topRecipes}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      )}
    </SafeAreaView>
  );
};

export default TopRecipes;