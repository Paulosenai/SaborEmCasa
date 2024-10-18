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

    getAllReceitas: async () => {
        const [result] = await connection.query("SELECT * FROM receitascadastradas ")
            .catch(erro => console.log(erro));
        return result
    },
    getAllReceitasPub: async () => {
        const [result] = await connection.query("SELECT * FROM receitas WHERE privacidade = 'Público' ")
            .catch(erro => console.log(erro));
        return result
    },
    getAllReceitasPriv: async () => {
        const [result] = await connection.query("SELECT * FROM receitascadastradas WHERE privacidade = 'Privado'")
            .catch(erro => console.log(erro));
        return result
    },
    getAllReceitasUser: async (id_usuario) => {
        const [result] = await connection.query("SELECT * FROM receitas WHERE id_usuario = ?", [id_usuario])
            .catch(erro => console.log(erro));
        return result
    },

    getReceitasById: async (id) => {
        const [result] = await connection.query("SELECT * FROM receitasCadastradas WHERE id =?", [id])
            .catch(erro => console.log(erro));
        return result
    },
    
    CreateReceita: async (id, nome, ingredientes, modo_preparo, imagemReceita, id_usuario, privacidade, categoria) => {
        const result = await connection.query(
          'INSERT INTO receitascadastradas (id, nome, ingredientes, modo_preparo, imagemReceita, id_usuario, privacidade, categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [id, nome, ingredientes, modo_preparo, imagemReceita, id_usuario, privacidade, categoria]
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