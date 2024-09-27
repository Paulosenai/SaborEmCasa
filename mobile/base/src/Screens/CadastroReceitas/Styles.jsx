import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cadastroContainer: {
    margin: 10,
  },
  input: {
    width: 100,
  },
  headerIconsContainer: {
    width: 50,
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    left: 50,
  },
    newsCard: {
    marginBottom: 6,
  },
  newsImage: {
    margin: 10,
    width: '98%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    height: 100,
    borderColor: '#FFA92C',
    borderWidth: 2, 
    borderRadius: 20,
    margin: 10,
    fontWeight: 'bold',
  },
  receitaButton: {
    backgroundColor: '#FFA92C',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  title: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: "#FFA92C"
  },
 
});

export default styles;
