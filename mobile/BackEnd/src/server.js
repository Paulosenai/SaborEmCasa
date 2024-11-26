const express = require("express");
const router = require("./routers");
const client = require("../config/db");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(router);

app.use((req, res, next) => {

    res.header("Acess-Control-Allow-Origin", "*");


    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");


    res.header("Access-Control-Allow-Headers", "Content-Type");


    app.use(cors());

    next();
});

client.query("select 1").then(() => {
    console.log("connection success")
    app.listen(8085, function () {
        console.log("Servidor rodando na url:http://localhost:8085")
    });
})
    .catch(erro => console.log("connection failed \n" + erro));

