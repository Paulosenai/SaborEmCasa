import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fundo: {
    width: '85%',
    height: 400,
    borderWidth: 3,
    borderColor: '#FFA92C',
    borderRadius: 10,
  },
  boxlogin: {
    padding: 14,
    borderWidth: 3,
    borderColor: '#FFA92C',
    borderRadius: 20,
    color: '#FFA92C',
    margin: 5,
    width: '85%',
  },
  tittle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    marginBottom: 20,
    color: 'orange',
    textAlign: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 17,
    color: 'white',
  },
  buttonContainer: {
    alignItems: "center",
  },
  buttonCont: {
    backgroundColor: '#FFA92C',
    borderRadius: 15,
    width: 140,
  },
  remember: {
    fontWeight: "bold",
    fontSize: 17,
    color: '#FFA92C',
    margin: 10,
    width: '100%',
    textAlign: "center",
  },
  imageContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 250,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalButton: {
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#e63946',
  },
  errorMessage: {
    color: 'red',
    marginLeft: 10,
  },
});

export default styles;
