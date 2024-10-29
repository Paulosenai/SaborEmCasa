import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10, 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fundo: {
    width: '85%',
    height: 450,
    borderWidth: 3,
    borderColor: '#FFA92C',
    borderRadius: 10,
  },
  remember: {
    fontWeight: "bold",
    fontSize: 17,
    color: '#FFA92C',
    margin: 10,
    width: '100%',
    textAlign: "center",
  },
  boxlogin: {
    padding: 10,
    borderWidth: 3,
    borderColor: '#FFA92C',
    borderRadius: 20,
    width: '85%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
},
  tittle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    marginBottom: 20,
    color: 'orange',
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
  },
  
  buttonText: {
    fontWeight: "bold",
    fontSize: 17,
    color: 'white',
  },
  buttonCont: {
    backgroundColor: '#FFA92C',
    borderRadius: 15,
    width: 140,   
    alignItems: "center",
  },
  botao: {
    flexDirection: "row"
  },
  imageContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 250,
  },
  errorContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#F8D7DA', // Cor de fundo leve para a mensagem de erro
    borderColor: '#F5C6CB', // Cor da borda
    borderWidth: 1,
    borderRadius: 5,
},
errorText: {
    color: '#721C24', // Cor do texto de erro
    fontSize: 16,
    textAlign: 'center', // Centralizar o texto
},   
});

export default styles;