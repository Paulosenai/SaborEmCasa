const express = require("express");
const clientController = require("../controller/controller");
const router = express.Router();

router.get("/", clientController.getRoot); //rota raiz
router.get("/api/read", clientController.listAllUsers); //Listar todos os usuários
router.get("/api/read/:id",clientController.listByID); //Listar usuário por id
router.post("/api/create", clientController.createNewUser); //Cadastrar novo usuário
router.put("/api/update/paulo/cesar/:id", clientController.updateUser); //Atualizar o usuario
router.post("/api/registerUser", clientController.register); //Cadastrar um novo usuario
router.post("/api/validate", clientController.login); //validar o login 
router.post("/api/reset", clientController.getEmailReset);//verificar o email de reset
router.post("/api/resetpassword", clientController.resetPassword);//resetar a senha
router.post('/api/cadastrarReceitas', clientController.CadastrarReceita);
router.get("/api/readReceitas/",clientController.listAllReceitas);
router.get("/api/readReceitas/:id",clientController.listReceitasById);
router.get("/api/readReceitaPriv",clientController.listReceitasPriv);



module.exports = router;