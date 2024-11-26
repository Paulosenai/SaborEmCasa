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
    fontWeight: 'bold',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalSuccess: {
    backgroundColor: '#fff',
    borderColor: 'orange',
    borderWidth: 5,
  },
  modalError: {
    backgroundColor: '#fff',
    borderColor: 'orange',
    borderWidth: 5,
  },
  modalMessage: {
    color: 'gray',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'orange',
  },
  modalButtonText: {
    color: '#FFA92C',
    fontSize: 16,
  },
});

export default styles;