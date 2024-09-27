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
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    searchInput: {
      borderRadius: 50,
      backgroundColor: '',
    },
    headerComponentContainer: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
    },
    headerIconsContainer: {
      width: 50,
      flexDirection: 'row',
      margin: 10,
    },
    headerIcon: {
      padding: 2,
    },
    gridItem: {
      flex: 1,
      margin: 8,
      borderRadius: 10,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      overflow: 'hidden', 
    },
    gridContainer: {
      justifyContent: 'space-between',
    },
    indicacoesImg: {
      width: '100%',
      height: 190,
      resizeMode: 'contain',
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
    mapContainer: {
      height: 300,
      margin: 10,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    headerContainer: {
      padding: 16,
      backgroundColor: '#FFA92C',
    },
    headerTitle: {
      fontSize: 24,
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
      margin: 10,
    },
    item: {
      flex: 1,
      margin: 8,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      overflow: 'hidden',
      elevation: 3,
    },
    image: {
      width: '100%',
      height: 150,
    },
    content: {
      padding: 8,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    row: {
      justifyContent: 'space-between',
    },
    favoriteButton: {
      color: '#FFA92C',
      marginTop: 8,
      fontWeight: 'bold',
    },
});

export default styles;
