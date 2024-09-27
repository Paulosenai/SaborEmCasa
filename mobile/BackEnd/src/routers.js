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
router.get('/api/readNews', clientController.listAllNews); //listar a receita do banco de dados
router.get('/api/readNewsID/:id', clientController.listNewsbyID); //puxa a receita pelo id do banco de daos 
router.get('/api/readNews/Salgado/', clientController.listAllNewsSalgado);
router.get('/api/readNewsID/Salgado/:id', clientController.listNewsbyIDSalgado);
router.get('/api/readNews/Saudavel/', clientController.listAllNewsSaudavel);
router.get('/api/readNewsID/Saudavel/:id', clientController.listNewsbyIDSaudavel);
router.get('/api/readNews/Doce/', clientController.listAllNewsDoce);
router.get('/api/readNewsID/Doce/:id', clientController.listNewsbyIDDoce);
router.get('/api/readNews/Bebida/', clientController.listAllNewsBebida);
router.get('/api/readNewsID/Bebida/:id', clientController.listNewsbyIDBebida);
router.get('/api/readNews/SemAcucar/', clientController.listAllNewsSemAcucar);
router.get('/api/readNewsID/SemAcucar/:id', clientController.listNewsbyIDSemAcucar);
router.post('/api/cadastrarReceitas', clientController.CadastrarReceita);
router.get('/api/receitasCadastradas', clientController.listAllReceitaUsuario);
router.get('/api/receitasCadastradasID/:id', clientController.listbyIDReceitaUsuario);


module.exports = router;