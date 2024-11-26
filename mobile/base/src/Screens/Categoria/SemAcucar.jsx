import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { View, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Header } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./Styles";

export default function Semacucar({ route }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const navigation = useNavigation();
  const [favoritedItems, setFavoritedItems] = useState(new Set());

  const categoria = route.params.categoria

  useEffect(() => {
    axios.get(`http://10.0.2.2:8085/api/readReceitaCategoria/${categoria}`)
      .then(response => {
        const sortData = response.data.sort((a, b) => a.id - b.id);
        console.log(response.data)
        setData(sortData);
        setFilteredData(sortData);
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
  }, []);

  const handleVizualizar = (id) => {
    if (!isScrolling) {
      navigation.navigate('ReceitaCategorias', { id });
    }
  };

  const handleScroll = (event) => {
    setIsScrolling(true);
    setTimeout(() => setIsScrolling(false), 100);
  };

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
          <TouchableOpacity onPress={() => handleFavoriteToggle(item.id)} style={styles.favoriteIconContainer}>
            <Icon
              name={favoritedItems.has(item.id) ? 'favorite' : 'favorite-border'}
              size={25}
              color="white"
              style={styles.favoriteIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleVizualizar(item.id)}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${item.imagemReceita}` }}
              style={styles.image}
            />
            <View style={styles.content}>
              <Text style={styles.title}>{item.nome}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        backgroundColor="#FFA92C"
        barStyle="light-content"
        centerComponent={
          <View style={styles.headerComponentContainer}>
            <Image source={require('../../../res/img/logo2.png')} style={{ width: 90, height: 50 }} />
          </View>
        }
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          onPress: () => navigation.goBack(),
        }}
      />
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={styles.section}>
          <View style={styles.newsCard}>
            <ImageBackground
              source={require("../../../res/img/SemAçucar.png")}
              style={styles.newsImage}
            >
            </ImageBackground>
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