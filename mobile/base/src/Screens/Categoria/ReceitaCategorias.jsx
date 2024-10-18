import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Header } from '@rneui/themed';
import axios from 'axios';

export default function Receita({ navigation, route }) {
  const [recipe, setRecipe] = useState(null);
  const id = route.params.id;

  useEffect(() => {
    // Faz a requisição à API para obter os dados da receita
    axios.get(`http://10.0.2.2:8085/api/readReceitas/${id}`)
      .then(response => {
        setRecipe(response.data);
      })
      .catch(error => {
        console.log("Erro ao buscar a receita:", JSON.stringify(error));
      });
  }, [id]);

  // Verifica se a receita está carregando
  if (!recipe) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        backgroundColor="#FFA92C"
        barStyle="light-content"
        centerComponent={{
          text: recipe.nome,
          style: { color: "#fff", fontSize: 24, fontWeight: "bold" },
        }}
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          onPress: () => navigation.goBack(),
        }}
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.imageContainer}>
          {recipe.imagemReceita ? (
            <Image 
              source={{ uri: `data:image/jpeg;base64,${recipe.imagemReceita}` }} 
              style={styles.image} 
              onLoad={() => console.log('Imagem carregada com sucesso')} 
              onError={(error) => console.log('Erro ao carregar imagem:', error)} 
            />
          ) : (
            <Image 
              source={require('../../../res/img/brigadeiro.png')} 
              style={styles.image} 
            />
          )}
        </View>

        <View style={styles.receitacontainer}>
          <Text style={styles.titleContent}>{recipe.nome}</Text>
          <Text style={styles.subTitle}>Ingredientes:</Text>
          <View style={styles.ingredientsContainer}>
            {Array.isArray(recipe.ingredientes) 
              ? recipe.ingredientes.map((ingrediente, index) => (
                  <View key={index} style={styles.ingredientCircle}>
                    <Text style={styles.ingredientText}>{ingrediente}</Text>
                  </View>
                ))
              : recipe.ingredientes.split(',').map(ing => ing.trim()).map((ingrediente, index) => (
                  <View key={index} style={styles.ingredientCircle}>
                    <Text style={styles.ingredientText}>{ingrediente}</Text>
                  </View>
                ))
            }
          </View>

          <Text style={styles.subTitle}>Modo de preparo:</Text>
          <Text style={styles.preparation}>{recipe.modo_preparo}</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F8',
  },
  imageContainer: {
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 200,
  },
  titleContent: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFA92C', 
    borderRadius: 10, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  subTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#FFA92C',
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    justifyContent: 'flex-start',
  },
  ingredientCircle: {
    backgroundColor: '#FFA92C',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  ingredientText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  preparation: {
    fontSize: 18,
    color: '#333',
    padding: 10,  
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.84,
    elevation: 5,
    marginBottom: 15,
    lineHeight: 24, 
    textAlign: 'left', // Alinhamento à esquerda
  },
  receitacontainer: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 10,
  },
});