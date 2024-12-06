import React from 'react';
import { View, SafeAreaView, ScrollView, Image, ImageBackground} from 'react-native';
import { Text, Header } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';;
import styles from "./Styles";

const Contato = () => {
  // Define chef data
  const chefs = [
    {
      name: 'Chef Fabia',
      specialty: 'Especialista em comidas salgadas',
      phone: '+55 14 997654327',
      image: require("../../../res/img/pratoSalgado.jpg"),
    },
    {
      name: 'Chef Rafael',
      specialty: 'Especialista em confeitaria',
      phone: '+55 14 996435786',
      image: require("../../../res/img/bomba-de-chocolate.jpg"),
    },
    {
      name: 'Chef Marcelo',
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
            <Icon name="person" size={30} color="#fff" style={styles.headerIcon} />
          </View>
        }
      />
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

export default Contato;
