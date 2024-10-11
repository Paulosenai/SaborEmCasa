const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const salt = 10;

const userModel = {
    getAllUsers: async () =>{
        const [result] = await connection.query("SELECT * FROM cadastro_senai")
        .catch(erro => console.log(erro));
        return result
    },

    getByID: async (id) =>{
        const [result] = await connection.query("SELECT * FROM cadastro WHERE id =?",[id])
        .catch(erro => console.log(erro));
        return result
    },

    //Model para login
    getByEmail: async (email)=>{
        const [result] = await connection.query("SELECT * FROM usuariosCadastrados WHERE email=?", [email])
        .catch(erro => console.log(erro));
        return result;
    },
    validateLogin: async (email, senha) => {
        const [result] = await connection.query("SELECT * FROM usuariosCadastrados WHERE email=?", [email])

        try {
            if (result.length > 0) {
                const usuario = result[0]

                const match = await bcrypt.compare(senha, usuario.senha)

                if (match) {
                    return result;
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        }
        catch (erro) {
            console.log(erro)
        };
    },
    registerUser: async(id,nome,email,senha)=>{
        const hashsenha = await bcrypt.hash(senha, salt);
        console.log(hashsenha);
        const [result] = await connection.query("INSERT INTO usuariosCadastrados values(?,?,?,?)", [id, nome, email, hashsenha])
        .catch(erro => console.log(erro));
        return result;
    },
    updateUser: async(id, email, senha)=>{
        const [result] = await connection.query("UPDATE usuariosCadastrados SET email=?, senha=?, WHERE id=?",[id, email, senha])
        .catch(erro => console.log(erro));
        return result;
    },
     //reset senha aluno
    resetByEmail: async(email) =>{
        const [result] = await connection.query("SELECT * FROM usuariosCadastrados WHERE email=?", [email])
        .catch(error => console.log(error))
        return result; 
    },
    //update the password
    updatePassword: async(email,senha)=>{
        const result = await connection.query("UPDATE usuariosCadastrados SET senha=? WHERE email=?",
        [senha, email])
        .catch(error => console.log(error))
        return result;
    },

    getAllNews: async () => {
        const [result] = await connection.query("SELECT * FROM receitas")
            .catch(erro => console.log(erro));
        return result
    },

    getByIdNews: async (id) => {
        const [result] = await connection.query("SELECT * FROM receitas WHERE id =?", [id])
            .catch(erro => console.log(erro));
        return result
    },
    getAllNewsSalgado: async () => {
        const [result] = await connection.query("SELECT * FROM salgado")
            .catch(erro => console.log(erro));
        return result
    },

    getByIdNewsSalgado: async (id) => {
        const [result] = await connection.query("SELECT * FROM salgado WHERE id =?", [id])
            .catch(erro => console.log(erro));
        return result
    },

    getAllNewsSaudavel: async () => {
        const [result] = await connection.query("SELECT * FROM saudavel")
            .catch(erro => console.log(erro));
        return result
    },

    getByIdNewsSaudavel: async (id) => {
        const [result] = await connection.query("SELECT * FROM saudavel WHERE id =?", [id])
            .catch(erro => console.log(erro));
        return result
    },

    getAllNewsDoce: async () => {
        const [result] = await connection.query("SELECT * FROM doce")
            .catch(erro => console.log(erro));
        return result
    },


    getByIdNewsDoce: async (id) => {
        const [result] = await connection.query("SELECT * FROM doce WHERE id =?", [id])
            .catch(erro => console.log(erro));
        return result
    },

    getAllNewsBebida: async () => {
        const [result] = await connection.query("SELECT * FROM bebida")
            .catch(erro => console.log(erro));
        return result
    },


    getByIdNewsBebida: async (id) => {
        const [result] = await connection.query("SELECT * FROM bebida WHERE id =?", [id])
            .catch(erro => console.log(erro));
        return result
    },

    getAllNewsSemAcucar: async () => {
        const [result] = await connection.query("SELECT * FROM semacucar")
            .catch(erro => console.log(erro));
        return result
    },


    getByIdNewsSemAcucar: async (id) => {
        const [result] = await connection.query("SELECT * FROM semacucar WHERE id =?", [id])
            .catch(erro => console.log(erro));
        return result
    },
    
    CreateReceita: async (nome, ingredientes, modo_preparo, imagemBase64) => {
        const result = await connection.query(
          'INSERT INTO receitascadastradas (nome, ingredientes, modo_preparo, imagemReceita) VALUES (?, ?, ?, ?)',
          [nome, ingredientes, modo_preparo, imagemBase64]
        );
        return result;
      },
    getByIdReceitaUsuario: async (id) => {
        console.log(id);
        const [result] = await connection.query("SELECT nome, ingredientes, modo_preparo, id FROM receitascadastradas WHERE id =?", [id])
            .catch(erro => console.log(erro));
        return result
    },

    getAllReceitaUsuario: async () => {
        const [result] = await connection.query("SELECT nome, ingredientes, modo_preparo, id FROM receitascadastradas")
            .catch(erro => console.log(erro));
        return result
    },
    
};

module.exports = userModel;