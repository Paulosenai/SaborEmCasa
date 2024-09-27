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
  card: {
    margin: 2,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 4, 
    width: 200,
  },
  image: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 150,
    width: '100%',
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
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
  
  });

export default styles;