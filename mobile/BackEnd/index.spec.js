const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const routers = require('./src/routers');
const client = require('./config/db');

const app = express();
app.use(bodyParser.json());
app.use(routers);

let server;

//função para realizar a chamada do servidor
beforeAll(() => {
    server = app.listen(8086);
});

//função para fechar conexão com o banco e encerrar servidor
afterAll(async () => {
    await client.end();
    server.close();
});

describe('API Routes', () => {

    // rota para listar os usuarios
    it('GET /api/readReceitas/ deve retornar uma lista de informações do seu sono', async () => {
        const res = await request(app).get('/api/readReceitas');
        // console.log(res.text);//imprime os objetos do banco
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    //     //Listar usuários por ID
    it('GET /api/readReceitas/:id deve retornar uma informações da sua receita', async () => {
        const res = await request(app).get('/api/readReceitas/2');

        if (res.statusCode == 200) {
            expect(res.body).toBeInstanceOf(Object);
            console.log(res.text)
        }
        else {
            expect(res.statusCode).toEqual(401);
            expect(res.body).toHaveProperty('error', "Erro ao obter a lista de receitas")
        }
    });

    //     //  //teste de rota para cadastrar um usuario
    it('POST /api/cadastrarReceitas deve cadastrar informações do seu sono', async () => {
        const data = {
            usuario_id: 45,
            nome: "Paulo",
            ingredientes: "Paulo",
            modo_preparo: "Paulo",
            id: 1,
            imagemReceita: "teste jest1",
            privacidade: "teste jest1",
            categoria: "teste jest1",
        };
        const res = await request(app).post('/api/cadastrarReceitas').send(data);

        console.log(res.text)
        if (res.statusCode === 201) {
            expect(res.body).toHaveProperty('message', 'Receita cadastrada com sucesso!');
        }
        else {
            expect(res.statusCode).toEqual(500)
            expect(res.body).toHaveProperty('message', 'Erro ao cadastrar a receita.');

        }

    });

    //     //teste de rota para deletar usuario
    it('DELETE /api/deleteReceita/:id deve deletar as informações do seu sono', async () => {
        const id = 209;
        const res = await request(app).delete(`/api/deleteReceita/${id}`);

        if (res.statusCode === 200) {
            expect(res.body).toEqual({});
        }
        else {
            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty("msg", "Erro ao deletar receita.")
        }
    });

    //     //rota para atualizar as informações do usuario
    it('PUT /api/updateReceita/:id deve atualizar as informações do seu sono', async () => {
        const id = 45;
        const updateUser = {
            usuario_id: 45,
            nome: "Paulo",
            ingredientes: "Paulo",
            modo_preparo: "Paulo",
            id: 1,
            imagemReceita: "teste jest1",
            privacidade: "teste jest1",
            categoria: "teste jest1",
        };
        const res = await request(app).put(`/api/updateReceita/${id}`).send(updateUser);
        if (res.statusCode === 200) {
            expect(res.body).toHaveProperty("msg", "Receita atualizada com sucesso!");
        }
        else {
            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty("msg", "Erro ao atualizar a receita.")
        }
    });
});