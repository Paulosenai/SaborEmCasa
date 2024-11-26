const clientController = require("../model/model");
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userController = {
    //route root 
    getRoot: async (req, res) => {
        res.status(200).json({ msg: "The API is running!!!" })
    },

    //Controller para listar todos os usuários do banco
    listAllUsers: async (req, res) => {
        try {
            const clients = await clientController.getAllUsers();
            res.status(200).json(clients);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de usuários" })
        }
    },

    //listar usuário por id
    listByID: async (req, res) => {
        try {
            const sql = await clientController.getByID(req.params.id);

            if (sql.length > 0) {
                res.status(200).json(sql)
            }
            else {
                res.status(401).json({ msg: "Não existe registro no banco com este ID" })
            }
        }
        catch (error) {
            return error
        }
    },

    //Criar um novo usuário
    createNewUser: async (req, res) => {
        const { id, nome, sobrenome, idade } = req.body;

        try {
            const sql = await clientController.getByID(id);

            if (sql.length > 0) {
                res.status(401).json({ msg: "O ID já está cadastrado no BD" })
            }
            else {
                await clientController.registerUser(id, nome, sobrenome, idade);
                res.status(201).json({ msg: "Usuário cadastrado com sucesso" });
            }
        }
        catch (error) {
            return error
        }
    },

    updateUser: async (req, res) => {
        const { email, senha } = req.body;
        try {
            const sql = await clientController.getByID(req.params.id)

            if (sql.length > 0) {
                await clientController.updateUser(email, senha, req.params.id)
                res.status(200).json({ msg: "Atualizado com sucesso" })
            }
            else {
                res.status(401).json({ msg: "O id nao existe na base de dados" })
            }
        }
        catch (erro) {
            if (erro) {
                res.status(500).json({ msg: "Erro no servidor" + erro })
            }
        }
    },
    //cadastrar um novo usuario no banco 
    register: async (req, res) => {
        const { id, nome, email, senha } = req.body;
        try {
            const sql = await clientController.getByEmail(email);

            if (sql.length > 0) {
                res.status(401).json({ msg: "O email ja esta cadastrado, Insira um email valido" })
            }
            else {
                await clientController.registerUser(id, nome, email, senha);
                res.status(201).json({ msg: "Usuario cadastrado com sucesso" })
            }
        }
        catch (erro) {
            console.log(erro);
            res.status(500).json({ msg: "Ocorreu um erro durante o registro de usuarios" });
        }
    },
    login: async (req, res) => {
        let { email, senha } = req.body;

        senha = senha.toString();

        try {
            const sql = await clientController.validateLogin(email, senha);

            if (sql != null) {
                res.status(200).json(sql[0]);
            }
            else {
                res.status(401).json({ msg: "Email ou senha incorretos" });
            }
        }
        catch (error) {
            if (error) {
                console.log(error)
                res.status(500).json(error);
            }
        }
    },
    // Controller para reset de senha
    getEmailReset: async (req, res) => {
        let { email } = req.body

        email = email.toLowerCase();

        try {
            const sql = await clientController.getByEmail(email);

            if (sql.length > 0) {
                res.status(200).json({ msg: 'Success' })
            }
            else {
                res.status(404).json({ msg: "Email nao cadastrado no BD" });
            }
        }
        catch (error) {
            if (error) {
                res.status(500).json(error);
            }
        }
    },
    resetPassword: async (req, res) => {
        let { email, senha } = req.body

        email = email.toLowerCase();

        try {
            const sql = await clientController.updatePassword(email, senha);
            res.status(200).json({ msg: "Senha Atualizada com sucesso" });
        }
        catch (error) {
            console.log("Erro ao redefinir a senha");
            res.status(500).json({ msg: "Erro no servidor" })
        }
    },
    listAllReceitas: async (req, res) => {
        try {
            const clients = await clientController.getAllReceitas();
            res.status(200).json(clients);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de receitas" })
        }
    },
    listReceitasById: async (req, res) => {
        try {
            const clients = await clientController.getReceitasById(req.params.id);
            res.status(200).json(clients);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de receitas" })
        }
    },
    listReceitasUser: async (req, res) => {
        try {
            const clients = await clientController.getAllReceitasUser(req.params.id_usuario);
            res.status(200).json(clients);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de receitas" })
        }
    },
    listFavoritosUser: async (req, res) => {
        try {
            const clients = await clientController.getAllFavoritosUsuario(req.params.id_usuario);
            res.status(200).json(clients[0]);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de favoritos" })
        }
    },
    listReceitasPub: async (req, res) => {
        try {
            const clients = await clientController.getAllReceitasPub();
            res.status(200).json(clients);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de receitas" })
        }
    },

    listReceitasByCategoria: async (req, res) => {
        try {
            const clients = await clientController.getReceitasCategoria(req.params.categoria);
            res.status(200).json(clients);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de receitas" })
        }
    },
    CadastrarReceita: async (req, res) => {
        try {
            const { id, nome, ingredientes, modo_preparo, imagemBase64, id_usuario, privacidade, categoria } = req.body;

            await clientController.CreateReceita(id, nome, ingredientes, modo_preparo, imagemBase64, id_usuario, privacidade, categoria);
            res.status(201).json({ message: 'Receita cadastrada com sucesso!' });

        } catch (error) {
            console.error('Erro ao cadastrar a receita:', error);
            res.status(500).json({ message: 'Erro ao cadastrar a receita.' });
        }
    },

    deleteReceita: async (req, res) => {
        const receitaId = req.params.id;

        try {
            const receita = await clientController.getReceitasById(receitaId);

            if (receita.length === 0) {
                return res.status(404).json({ msg: "Receita não encontrada." });
            }

            await clientController.deleteReceita(receitaId);

            res.status(200).json({ msg: "Receita deletada com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar a receita:", error);
            res.status(500).json({ msg: "Erro ao deletar receita." });
        }
    },
    updateReceita: async (req, res) => {
        const { id } = req.params; // Pegando o ID da receita a ser atualizada
        const { nome, ingredientes, modo_preparo, imagemBase64, privacidade, categoria } = req.body;

        try {
            // Verifica se a receita existe
            const receita = await clientController.getReceitasById(id);

            if (receita.length === 0) {
                return res.status(404).json({ msg: "Receita não encontrada." });
            }     
            await clientController.updateReceita(id, nome, ingredientes, modo_preparo, imagemBase64, privacidade, categoria);
            res.status(200).json({ msg: "Receita atualizada com sucesso!" });
        } catch (error) {
            console.error("Erro ao atualizar a receita:", error);
            res.status(500).json({ msg: "Erro ao atualizar a receita." });
        }
    },
};

module.exports = userController;
