import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerComponentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    padding: 20,
  },
  newsCard: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  newsImage: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cadastroContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFA92C',
  },
  input: {
    height: 50,
    borderColor: '#FFA92C',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  receitaButton: {
    width: '100%',
    
    borderRadius: 10,
    backgroundColor: '#FFA92C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;