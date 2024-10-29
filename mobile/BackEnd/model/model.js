const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const salt = 10;

const userModel = {
    getByEmail: async (email) => {
        const [result] = await connection.query("SELECT * FROM usuariosCadastrados WHERE email=?", [email])
            .catch(erro => console.log(erro));
        return result;
    },
    validateLogin: async (email, senha) => {
        const [result] = await connection.query("SELECT * FROM usuariosCadastrados WHERE email=?", [email]);

        try {
            if (result.length > 0) {
                const usuario = result[0];
                const match = await bcrypt.compare(senha, usuario.senha);

                if (match) {
                    return result;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (erro) {
            console.log(erro);
        }
    },
    registerUser: async (id, nome, email, senha) => {
        const hashsenha = await bcrypt.hash(senha, salt);
        const [result] = await connection.query("INSERT INTO usuariosCadastrados values(?,?,?,?)", [id, nome, email, hashsenha])
            .catch(erro => console.log(erro));
        return result;
    },
    updateUser: async (id, email, senha) => {
        const hashsenha = await bcrypt.hash(senha, salt); // Re-hash if password is updated
        const [result] = await connection.query("UPDATE usuariosCadastrados SET email=?, senha=? WHERE id=?", [email, hashsenha, id])
            .catch(erro => console.log(erro));
        return result;
    },
    getAllReceitas: async () => {
        const [result] = await connection.query("SELECT * FROM receitascadastradas ")
            .catch(erro => console.log(erro));
        return result;
    },
    getReceitasCategoria: async (categoria) => {
        const [result] = await connection.query("SELECT * FROM receitascadastradas WHERE categoria = ?", [categoria])
            .catch(erro => console.log(erro));
        return result;
    },
    getAllReceitasPub: async () => {
        const [result] = await connection.query("SELECT * FROM receitascadastradas WHERE privacidade = 'publico' ")
            .catch(erro => console.log(erro));
        return result;
    },
    getAllReceitasUser: async (id_usuario) => {
        const [result] = await connection.query("SELECT * FROM receitascadastradas WHERE id_usuario = ?", [id_usuario])
            .catch(erro => console.log(erro));
        return result;
    },
    getReceitasById: async (id) => {
        try {
            const [result] = await connection.query("SELECT * FROM receitascadastradas WHERE id = ?", [id]);
            if (result.length === 0) {
                console.log(`Nenhuma receita encontrada com o ID: ${id}`);
                return null;
            }
            return result[0];
        } catch (erro) {
            console.error('Erro ao buscar receita por ID:', erro);
            throw erro;
        }
    },
    CreateReceita: async (id, nome, ingredientes, modo_preparo, imagemBase64, id_usuario, privacidade, categoria) => {
        const result = await connection.query(
            'INSERT INTO receitascadastradas (id, nome, ingredientes, modo_preparo, imagemReceita, id_usuario, privacidade, categoria) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
            [id, nome, ingredientes, modo_preparo, imagemBase64, id_usuario, privacidade, categoria]);
        return result;
    },
    getByIdReceitaUsuario: async (id) => {
        const [result] = await connection.query("SELECT nome, ingredientes, modo_preparo, id FROM receitascadastradas WHERE id =?", [id])
            .catch(erro => console.log(erro));
        return result;
    },
    getAllReceitaUsuario: async () => {
        const [result] = await connection.query("SELECT nome, ingredientes, modo_preparo, id FROM receitascadastradas")
            .catch(erro => console.log(erro));
        return result;
    },
    getAllFavoritosUsuario: async (id_usuario) => {
        const [result] = await connection.query("SELECT * FROM favoritos WHERE id_usuario = ?", [id_usuario])
            .catch(erro => console.log(erro));
        return result;
    },
    deleteReceita: async (id) => {
        const [result] = await connection.query("DELETE FROM receitascadastradas WHERE id = ?", [id])
            .catch(erro => console.log(erro));
        return result;
    },
    updateReceita: async (id, data) => {
        const { nome, ingredientes, modo_preparo, imagemBase64, privacidade, categoria } = data;
        const result = await db.query('UPDATE receitas SET nome = ?, ingredientes = ?, modo_preparo = ?, imagemBase64 = ?, privacidade = ?, categoria = ? WHERE id = ?', [nome, ingredientes, modo_preparo, imagemBase64, privacidade, categoria, id]);
        return result;
    }
};

module.exports = userModel;