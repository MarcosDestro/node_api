"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Lê as variaveis de ambiente
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("./instances/pg");
// Inicia a instancia do express
const app = (0, express_1.default)();
// Inicia o cors, podendo passar a função vazia para liberar tudo
app.use((0, cors_1.default)({
    origin: '*',
    methods: [
        'GET', 'POST', 'PUT', 'DELETE'
    ]
}));
// Lê arquivos da public
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(express_1.default.urlencoded({ extended: true }));
// Chama as rotas
app.use('/api', apiRoutes_1.default);
app.get('/testConnection', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pg_1.sequelize.authenticate();
        res.json({ connection: 'ok' });
        return console.log('Connection has been established successfully.');
    }
    catch (error) {
        return console.error('Unable to connect to the database:', error);
    }
}));
// Resposta para qualquer rota não encontrada
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});
// Porta padrão
app.listen(process.env.PORT);
