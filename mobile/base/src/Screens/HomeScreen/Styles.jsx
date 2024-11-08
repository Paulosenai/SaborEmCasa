import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  contentCard: {
    margin: 10,
    flex: 1, 
  },
  titleContent: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10, 
    flexShrink: 1, 
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
  sidebarContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FFA92C', 
    height: '100%',
    width: 270, 
    zIndex: 100,
    elevation: 5,
    paddingTop: 35,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden', 
    transition: 'transform 0.3s ease', 
    borderColor: '#fff',
    borderWidth: 1,
  },
  userInfoContainer: {
    flexDirection: 'row',        
    justifyContent: 'space-between',  
    alignItems: 'center',        
    paddingBottom: 30,           
    paddingLeft: 15,             
    paddingRight: 15,   
    borderBottomColor: '#fff',
    borderBottomWidth: 1,        
  },
  avatarContainer: {
    flexDirection: 'row',       
    alignItems: 'center',       
  },
  avatarIcon: {
    marginRight: 10,           
  },
  userName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebarContent: {
    paddingTop: 20,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    backgroundColor: 'transparent',
    transition: 'background-color 0.3s ease',
  },
  sidebarItemText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 15,
    flex: 1,
    letterSpacing: 1, 
  },
  sidebarItemTextLogout: {
    fontSize: 18,
    color: '#FF6347', 
    marginLeft: 15,
    flex: 1,
  },
  sidebarItemIcon: {
    color: '#fff',
    fontSize: 24,
  },
  sidebarOpen: {
    transform: [{ translateX: 0 }],
  },
  sidebarClosed: {
    transform: [{ translateX: 300 }],
  },
  favoriteIconContainer: {
    position: 'absolute', 
    top: 10,             
    left: 10,          
    zIndex: 1,
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
  loadMoreText: {
    textAlign: 'center',
    marginBottom: 30,
  }
});

export default styles;
