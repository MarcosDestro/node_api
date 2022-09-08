// Lê as variaveis de ambiente
require('dotenv').config();

import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import apiRoutes from './routes/apiRoutes';
import cors from 'cors';
import { sequelize } from './instances/pg';

// Inicia a instancia do express
const app = express();

// Inicia o cors, podendo passar a função vazia para liberar tudo
app.use(cors({
    origin: '*',
    methods: [
        'GET', 'POST', 'PUT', 'DELETE'
    ]
}));

// Lê arquivos da public
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: true}));

// Chama as rotas
app.use('/api', apiRoutes);

app.get('/testConnection', async (req, res)=>{
    try {
        await sequelize.authenticate();
        res.json({connection: 'ok'});
        return console.log('Connection has been established successfully.');
      } catch (error) {
        return console.error('Unable to connect to the database:', error);
      }
});

// Resposta para qualquer rota não encontrada
app.use((req: Request, res: Response)=>{
    res.status(404);
    res.json({error: 'Endpoint não encontrado.'})
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); // Bad Request
    console.log(err);
    res.json({ error: 'Ocorreu algum erro.' });
}
app.use(errorHandler);


// Porta padrão
app.listen(process.env.PORT);
