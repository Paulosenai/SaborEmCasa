import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  searchInput: {
    marginTop: 20,
    height: 70,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 1, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginTop: 20,
      marginBottom: 16,
      backgroundColor: '#fff',
      paddingHorizontal: 10,
    },
  
    searchInput: {
      flex: 1, 
      height: 40,
      paddingHorizontal: 10,
      fontSize: 16,
    },
  
    searchIcon: {
      marginRight: 10,
    },
});

export default styles;