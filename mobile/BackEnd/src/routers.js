const express = require("express");
const clientController = require("../controller/controller");
const router = express.Router();

// Rotas existentes
router.get("/", clientController.getRoot); // rota raiz
router.get("/api/read", clientController.listAllUsers); // Listar todos os usuários
router.get("/api/read/:id", clientController.listByID); // Listar usuário por id
router.post("/api/create", clientController.createNewUser); // Cadastrar novo usuário
router.put("/api/update/paulo/cesar/:id", clientController.updateUser); // Atualizar o usuário
router.post("/api/registerUser", clientController.register); // Cadastrar um novo usuário
router.post("/api/validate", clientController.login); // Validar o login 
router.post("/api/reset", clientController.getEmailReset); // Verificar o email de reset
router.post("/api/resetpassword", clientController.resetPassword); // Resetar a senha
router.post('/api/cadastrarReceitas', clientController.CadastrarReceita);
router.get("/api/readReceitas/", clientController.listAllReceitas);
router.get("/api/readFavs/:id_usuario", clientController.listFavoritosUser);
router.get("/api/readReceitas/:id", clientController.listReceitasById);
router.get("/api/readReceitaUser/:id_usuario", clientController.listReceitasUser);
router.get("/api/readReceitaPub", clientController.listReceitasPub);
router.get("/api/readReceitaCategoria/:categoria", clientController.listReceitasByCategoria);
router.delete("/api/deleteReceita/:id", clientController.deleteReceita);
router.put("/api/editReceita/:id", clientController.editReceita); 

module.exports = router;