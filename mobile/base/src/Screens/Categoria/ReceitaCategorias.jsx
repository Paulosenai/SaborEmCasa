import React, { useState, useEffect } from "react";
import { View, SafeAreaView, FlatList } from 'react-native';
import { Text, Header } from '@rneui/themed';
import axios from 'axios';
import styles from "./Styles";

export default function Receita({ navigation, route }) {
  const [data, setData] = useState([]);
  const [mostrarNews, setMostrarNews] = useState(false);
  const id = route.params.id;

  useEffect(() => {
    // Função para buscar dados de uma API
    const fetchDataFromApi = async (url) => {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.log(`Error fetching data from ${url}:`, error);
        return [];
      }
    };

    const fetchAllData = async () => {
      const urls = [
        `http://10.0.2.2:8085/api/readNewsID/Bebida/${id}`,
        `http://10.0.2.2:8085/api/readNewsID/Doce/${id}`,
        `http://10.0.2.2:8085/api/readNewsID/Salgado/${id}`,
        `http://10.0.2.2:8085/api/readNewsID/Saudavel/${id}`,
        `http://10.0.2.2:8085/api/readNewsID/Semacucar/${id}`,
      ];

      try {
        const responses = await Promise.all(urls.map(url => fetchDataFromApi(url)));
        const combinedData = responses.flat();
        const sortedData = combinedData.sort((a, b) => a.id - b.id);
        setData(sortedData);
      } catch (error) {
        console.log('Error fetching data from APIs:', error);
      }
    };

    // Chama a função para buscar os dados
    fetchAllData();
  }, [id]);

  const renderItem = ({ item }) => (
    <View style={styles.itemNew}>
      <View style={styles.cardReceitas}>
        <View style={styles.contentCard}>
          <Text style={styles.titleContent}>{item.title}</Text>
          <Text style={styles.description}>{item.content}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.scrollview}>
      <Header
        backgroundColor="#FFA92C"
        barStyle="light-content"
        centerComponent={{
          text: 'Receita',
          style: { color: "#fff", fontSize: 20, fontWeight: "bold" },
        }}
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          onPress: () => navigation.goBack(),
        }}
        rightComponent={{
          icon: 'person',
          color: '#fff',
        }}
      />
      <View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
        />
      </View>
    </SafeAreaView>
  );
}
