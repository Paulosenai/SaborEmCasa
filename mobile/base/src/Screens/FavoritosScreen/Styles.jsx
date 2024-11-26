import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'orange',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    marginRight: 80,
  },
  headerTitle: {
    marginTop: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  item: {
    width: '48%',
    margin: '1%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 2,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  image: {
    height: 150,
    width: '100%',
    resizeMode: 'cover',
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  favoriteButton: {
    color: '#007BFF',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  }
});

export default styles;