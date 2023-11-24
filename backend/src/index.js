import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import morgan from 'morgan';
import { dbConnect } from './database/connect.js';
import { routes } from './routes/index.js';

// Ocultar Credenciais do DB
const server = express();
const PORT = process.env.PORT | 3333;
//dbConnect;

server.use(cors()); //cors({origin:'http://localhost:3000'}) para restringir o acesso da aplicação 
server.use(express.json());
server.use(express.static("public"));
server.use(morgan("dev"));
server.use(routes);
server.listen(3333, ()=>{
    console.log("DevRadar Server is up");
});