import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: '#f8f8f8', 
  },
  item: {
    paddingTop: 20,
    flex: 1,
    margin: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5, 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    overflow: 'hidden', 
  },
  image: {
    height: 150,
    borderRadius: 10,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555', 
  },
  loader: {
    alignSelf: 'center',
    marginTop: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  textCenter: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },
});

export default styles;