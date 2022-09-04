import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import apiRoutes from './routes/apiRoutes';

// Lê as varianveis de ambiente
dotenv.config();

// Inicia a instancia do express
const app = express();

// Lê arquivos da public
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: true}));

// Chama as rotas
app.use('/api', apiRoutes);

// Resposta para qualquer rota não encontrada
app.use((req: Request, res: Response)=>{
    res.status(404);
    res.json({error: 'Endpoint não encontrado.'})
})

// Porta padrão
app.listen(process.env.PORT);