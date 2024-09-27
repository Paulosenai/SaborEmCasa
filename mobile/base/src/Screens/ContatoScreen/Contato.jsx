import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity, TextInput, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Header } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import styles from "./Styles";

const Sidebar = ({ isOpen, onClose }) => {
  const [translateX] = useState(new Animated.Value(-300));

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : -300,
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
        <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateToScreen('Login')}>
          <Text style={styles.sidebarItemText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateToScreen('Register')}>
          <Text style={styles.sidebarItemText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const Home = () => {
  const navigation = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Define chef data
  const chefs = [
    {
      name: 'Chef Clovis',
      specialty: 'Especialista em comidas salgadas',
      phone: '+55 14 997654327',
      image: require("../../../res/img/pratoSalgado.jpg"),
    },
    {
      name: 'Chef Abetini',
      specialty: 'Especialista em confeitaria',
      phone: '+55 14 996435786',
      image: require("../../../res/img/bomba-de-chocolate.jpg"),
    },
    {
      name: 'Chef Miguel',
      specialty: 'Especialista em drinks',
      phone: '+55 14 997765897',
      image: require("../../../res/img/drinks.jpg"),
      
    }
  ];

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
        rightComponent={
          <View style={styles.headerIconsContainer}>
            <Icon name="person" size={30} color="#fff" onPress={toggleSidebar} style={styles.headerIcon} />
          </View>
        }
      />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <ScrollView>
        {/* cards */}
        <View style={styles.section}>
          <View style={styles.newsCard}>
            <ImageBackground
              source={require("../../../res/img/bannercontato.png")}
              style={styles.newsImage}
            />
          </View>
          {chefs.map((chef, index) => (
            <View key={index} style={styles.cardContato}>
              <View style={styles.containerInfos}>
                <ImageBackground
                  source={require("../../../res/img/Avatar.png")}
                  style={styles.avatarImage}
                />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.titleinfo}>{chef.name}</Text>
                  <Text style={styles.descriptioninfo}>{chef.specialty}</Text>
                  <Text style={styles.descriptioninfo}>Telefone para contato:</Text>
                  <Text style={styles.descriptioninfo}>{chef.phone}</Text>
                  
                </View>
              </View>
              <Image
                source={chef.image}
                style={styles.imageBack}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
