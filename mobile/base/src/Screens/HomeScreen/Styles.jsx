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
    bannerstyletext: {
      fontWeight: 'bold',
      color: '#fff',
      fontSize: 35,
    },
    newsImage: {
        margin: 10,
        width: '98%',
        height: 200,
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
      color: '#fff',
      marginTop: 3,
      borderWidth: 1,
      borderColor: '#fff',
      padding: 10,
      width: 180,
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
      margin: 10,
    },
    headerIcon: {
      padding: 2,
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
      width: 190, 
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
      right: 0,
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
      color: '#fff',
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
    userName: {
      color: 'black',
    },
    userInfoContainer: {
      width: 100,
      height: 100,
      backgroundColor: 'white',
      alignItems: 'center',
    }
});

export default styles;
