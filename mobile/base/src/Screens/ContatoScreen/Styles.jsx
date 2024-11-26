import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  newsCard: {
    marginBottom: 6,
  },
  bannerstyletext: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 35,
  },
  newsImage: {
    margin: 10,
    width: '98%',
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  newsContent: {
    height: 60,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    backgroundColor: 'black',
    textAlign: 'center',
    elevation: 20,
  },
  searchInput: {
    borderRadius: 50,
    backgroundColor: '',
  },
  categoria: {
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#E5E5E5',
    margin: 10,
    flexDirection: 'row',
    height: 70,
  },
  headerComponentContainer: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  headerIconsContainer: {
    width: 50,
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    left: 50,
  },
  headerIcon: {
    padding: 2,
  },
  cardReceitas: {
    backgroundColor: '#fff',
    height: 1300,
    width: '100%',
  },
  contentCard: {
    margin: 10,
  },
  titleContent: {
    fontSize: 20,
    fontWeight: 'bold',
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
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
  },
  sidebarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#FFA92C',
    height: '100%',
    width: 250,
    zIndex: 100,
    elevation: 5,
    paddingTop: 50,
    transition: 'none',
  },
  sidebarContent: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sidebarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 20,
    color: '#f2f2f2',
  },
  sidebarItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sidebarItemText: {
    fontSize: 18,
    color: '#f2f2f2',
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#f2f2f2',
    marginTop: 20,
  },
  containerInfos: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  infoTextContainer: {
    flex: 1,
  },
  titleinfo: {
    color: '#FFA92C',
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptioninfo: {
    fontSize: 14,
    color: '#555',
  },
  imageBack: {
    margin: 10,
    borderRadius: 15,
    width: '95%',
    height: 140,
  },
  textImageback: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginEnd: 0,
    color: '#555'
  },
  cardContato: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#FFA92C',
    margin: 10,
  },
});

export default styles;
