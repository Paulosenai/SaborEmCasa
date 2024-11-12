import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff'
      },
      newsCard: {
        marginBottom: 6 
    },
    newsImage: {
      margin: 10,
      width: '98%',
      height: 110,
      justifyContent: 'center',
      alignItems: 'center',
      
  },
  row: {
    flex: 1,
    justifyContent: 'space-between', 
  },
  cardReceitas: {
    backgroundColor: '#fff',
    height: 1300,
    width: '100%',
  },
  contentCard:{
    margin: 10,
  },
  titleContent: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    margin: 7,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 4, 
    width: 194, 
  },
  card: {
    position: 'relative',
    margin: 7,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 4,
    width: 190,
    height: 250, 
  },
  image: {
    position: 'relative',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 150,
    width: '100%',
    resizeMode: 'cover',
  },
  imageCategoriaIcons: {
    margin: 10,
    height: 50,
    width: 50,
    resizeMode: 'contain',
    marginLeft: 17,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  description: {
    fontSize: 14,
  },
  favoriteIcon: {
    position: 'absolute', 
    top: 0,
    left: 0,
    zIndex: 1,        
    borderColor: 'red',
    borderWidth: 1,
    padding: 4,
    borderRadius: 50,
    backgroundColor: 'red'
  },
  favoriteIconContainer: {
    position: 'absolute', 
    top: 10,             
    left: 10,          
    zIndex: 1,
  },

  });

export default styles;