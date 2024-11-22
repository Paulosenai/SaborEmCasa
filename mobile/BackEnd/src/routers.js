const express = require("express");
const clientController = require("../controller/controller");
const router = express.Router();

// Rotas existentes
router.get("/", clientController.getRoot); // Rota raiz
router.get("/api/read/:id", clientController.listByID); // Listar usuário por id
router.post("/api/create", clientController.createNewUser); // Cadastrar novo usuário
router.put("/api/update/paulo/cesar/:id", clientController.updateUser); // Atualizar o usuário
router.post("/api/registerUser", clientController.register); // Cadastrar um novo usuário
router.post("/api/validate", clientController.login); // Validar o login 
router.post("/api/reset", clientController.getEmailReset); // Verificar o email de reset
router.put("/api/resetpassword", clientController.resetPassword); // Resetar a senha
router.post('/api/cadastrarReceitas', clientController.CadastrarReceita); // Cadastrar uma receita
router.get("/api/readReceitas/", clientController.listAllReceitas); // Listar todas as receitas
router.get("/api/readReceitas/:id", clientController.listReceitasById); // Listar receita por ID
router.get("/api/readReceitaUser/:id_usuario", clientController.listReceitasUser); // Listar receitas de um usuário
router.get("/api/readReceitaPub", clientController.listReceitasPub); // Listar receitas públicas
router.get("/api/readReceitaCategoria/:categoria", clientController.listReceitasByCategoria); // Listar receitas por categoria
router.delete("/api/deleteReceita/:id", clientController.deleteReceita); // Deletar receita
router.put("/api/updateReceita/:id", clientController.updateReceita); // Atualizar receita

module.exports = router;
