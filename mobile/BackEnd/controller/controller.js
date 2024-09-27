const clientController = require("../model/model");
const jwt = require('jsonwebtoken');

const userController = {
    //route root 
    getRoot: async(req,res)=>{
        res.status(200).json({msg: "The API is running!!!"})
    },

    //Controller para listar todos os usuários do banco
    listAllUsers: async(req,res)=>{
        try{
            const clients = await clientController.getAllUsers();
            res.status(200).json(clients);
        }
        catch(error){
            res.status(500).json({error: "Erro ao obter a lista de usuários"})
        }
    },

    //listar usuário por id
    listByID: async(req,res)=>{
        try{
            const sql = await clientController.getByID(req.params.id);

            if(sql.length > 0){
                res.status(200).json(sql)
            }
            else{
                res.status(401).json({msg:"Não existe registro no banco com este ID"})
            }
        }
        catch(error){
            return error
        }
    },

    //Criar um novo usuário
    createNewUser: async(req,res)=>{
        const {id,nome,sobrenome,idade} = req.body;

        try{
            const sql = await clientController.getByID(id);

            if(sql.length > 0){
                res.status(401).json({msg: "O ID já está cadastrado no BD"})
            }
            else{
                await clientController.registerUser(id,nome,sobrenome,idade);
                res.status(201).json({msg:"Usuário cadastrado com sucesso"});
            }
        }
        catch(error){
            return error
        }
    },

    updateUser: async(req,res)=>{
        const{email, senha}= req.body;
        try{
            const sql = await clientController.getByID(req.params.id)

            if(sql.length > 0){
                await clientController.updateUser(email, senha, req.params.id)
                res.status(200).json({msg:"Atualizado com sucesso"})
            }
            else{
                res.status(401).json({msg:"O id nao existe na base de dados"})
            }
        }
        catch(erro){
            if(erro){
                res.status(500).json({msg:"Erro no servidor"+erro})
            }
        }
    },
    //cadastrar um novo usuario no banco 
    register: async(req,res)=>{
        const{id,nome,email,senha} = req.body;
        try{
            const sql = await clientController.getByEmail(email);

            if(sql.length > 0){
                res.status(401).json({msg:"O email ja esta cadastrado, Insira um email valido"})
            }
            else{
                await clientController.registerUser(id,nome, email, senha);
                res.status(201).json({msg:"Usuario cadastrado com sucesso"})
            }
        }
        catch(erro){
            console.log(erro);
            res.status (500).json({msg:"Ocorreu um erro durante o registro de usuarios"});
        }
    },
    login: async (req,res)=>{
        let {email,senha} = req.body;

        senha = senha.toString();

        try{
            const sql = await clientController.validateLogin(email, senha);

            if(sql != null){
                res.status(200).json(sql[0]);
            }
            else{
                res.status(401).json({msg:"Email ou senha incorretos"});
            }          
        }
        catch (error){
            if(error){
                console.log(error)
                res.status(500).json(error);
            }
        }
    },
     //controller para reset 
     getEmailReset: async(req, res)=>{
        let{email} = req.body

        email = email.toLowerCase();

        try{
            const sql = await clientController.getByEmail(email);

            if(sql.length > 0){
                res.status(200).json({msg:'Success'})
            }
            else{
                res.status(404).json({msg:"Email nao cadastrado no BD"});
            }
        }
        catch(error){
            if(error){
                res.status(500).json(error);
            }
        }
    },

    resetPassword: async(req, res)=>{
        let{email,senha} = req.body

        email = email.toLowerCase();

        try{
            const sql = await clientController.updatePassword(email,senha);
            res.status(200).json({msg:"Senha Atualizada com sucesso"});
        }
        catch(error){
           console.log("Erro ao redefinir a senha");
           res.status(500).json({msg:"Erro no servidor"})
        }
    },
    listAllNews: async (req, res) => {
        try {
            const clients = await clientController.getAllNews();
            res.status(200).json(clients);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de receitas" })
        }
    },


    listNewsbyID: async (req, res) => {
        try {
            const sql = await clientController.getByIdNews(req.params.id);

            if(sql.length> 0)
            {
                res.status(200).json(sql)
            }
            else{
                res.status(401).json({msg:"Não existe registro no banco com este id"})
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de noticias" })
        }
    },
    listAllNewsSalgado: async (req, res) => {
        try {
            const clients = await clientController.getAllNewsSalgado();
            res.status(200).json(clients);
            console.log(clients)
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de noticias" })
        }
    },


    listNewsbyIDSalgado: async (req, res) => {
        try {
            const sql = await clientController.getByIdNewsSalgado(req.params.id);

            if(sql.length> 0)
            {
                res.status(200).json(sql)
            }
            else{
                res.status(401).json({msg:"Não existe registro no banco com este id"})
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de noticias" })
        }
    },

    listAllNewsSaudavel: async (req, res) => {
        try {
            const clients = await clientController.getAllNewsSaudavel();
            res.status(200).json(clients);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de noticias" })
        }
    },


    listNewsbyIDSaudavel: async (req, res) => {
        try {
            const sql = await clientController.getByIdNewsSaudavel(req.params.id);

            if(sql.length> 0)
            {
                res.status(200).json(sql)
            }
            else{
                res.status(401).json({msg:"Não existe registro no banco com este id"})
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de noticias" })
        }
    },

    listAllNewsDoce: async (req, res) => {
        try {
            const clients = await clientController.getAllNewsDoce();
            res.status(200).json(clients);
            
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de noticias" })
        }
    },


    listNewsbyIDDoce: async (req, res) => {
        try {
            const sql = await clientController.getByIdNewsDoce(req.params.id);

            if(sql.length> 0)
            {
                res.status(200).json(sql)
            }
            else{
                res.status(401).json({msg:"Não existe registro no banco com este id"})
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de noticias" })
        }
    },
    listAllNewsBebida: async (req, res) => {
        try {
            const clients = await clientController.getAllNewsBebida();
            res.status(200).json(clients);
            
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de noticias" })
        }
    },


    listNewsbyIDBebida: async (req, res) => {
        try {
            const sql = await clientController.getByIdNewsBebida(req.params.id);

            if(sql.length> 0)
            {
                res.status(200).json(sql)
            }
            else{
                res.status(401).json({msg:"Não existe registro no banco com este id"})
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de noticias" })
        }
    },

    listAllNewsSemAcucar: async (req, res) => {
        try {
            const clients = await clientController.getAllNewsSemAcucar();
            res.status(200).json(clients);
            
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de noticias" })
        }
    },


    listNewsbyIDSemAcucar: async (req, res) => {
        try {
            const sql = await clientController.getByIdNewsSemAcucar(req.params.id);

            if(sql.length> 0)
            {
                res.status(200).json(sql)
            }
            else{
                res.status(401).json({msg:"Não existe registro no banco com este id"})
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de noticias" })
        }
    },
    CadastrarReceita: async (req, res) => {
        try {
          const { nome, ingredientes, modo_preparo, image_uri } = req.body;
               
          await clientController.CreateReceita(nome, ingredientes, modo_preparo, image_uri);
          res.status(201).json({ message: 'Receita cadastrada com sucesso!' });

        } catch (error) {
          console.error('Erro ao cadastrar a receita:', error);
          res.status(500).json({ message: 'Erro ao cadastrar a receita.' });
        }
      },

    listbyIDReceitaUsuario: async (req, res) => {
        try {
            const sql = await clientController.getByIdReceitaUsuario(req.params.id);

            if(sql.length> 0)
            {
                res.status(200).json(sql)
            }
            else{
                res.status(401).json({msg:"Não existe registro no banco com este id"})
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de receitas" })
        }
    },
    listAllReceitaUsuario: async (req, res) => {
        try {
            const clients = await clientController.getAllReceitaUsuario();
            res.status(200).json(clients);
            
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de receitas" })
        }
    },
    
};

module.exports = userController;
