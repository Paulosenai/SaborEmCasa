import React, { useState, useEffect, useCallback } from "react";
import { View, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity, FlatList, TextInput, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Header } from '@rneui/themed';
import styles from "./Style";
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const Sidebar = ({ isOpen, onClose }) => {
  const [translateX] = useState(new Animated.Value(300));

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : 300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const navigation = useNavigation();
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
    onClose();
  };

  return (
    <Animated.View style={[styles.sidebarContainer, { transform: [{ translateX }] }]}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Fechar</Text>
      </TouchableOpacity>
      <View style={styles.sidebarContent}>
        <Text style={styles.sidebarTitle}>Login</Text>
        <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateToScreen('LoginScreen')}>
          <Text style={styles.sidebarItemText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateToScreen('RegisterScreen')}>
          <Text style={styles.sidebarItemText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const ReceitasUsuario = () => {
  const navigation = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8085/api/receitasCadastradas');
      const sortedData = response.data.sort((a, b) => a.id - b.id);
      setData(sortedData);
      setFilteredData(sortedData);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    navigation.navigate('VisualizaçãoReceitas', { id });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => handleVizualizar(item.id)}>
          <Image source={require("../../../res/img/purê.png")} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
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
      <ScrollView>
        <View style={styles.section}>
          <View style={styles.newsCard}>
            <ImageBackground
              source={require("../../../res/img/ReceitasUsuarios.png")}
              style={styles.newsImage}
            />
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
};

export default ReceitasUsuario;
