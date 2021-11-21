import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) =>{
    res.send({1: "hello to my new serwer", 2: "get method", 3: "path \/"})
});

app.listen(7777, () => console.log("Server address http://localhost:7777"));