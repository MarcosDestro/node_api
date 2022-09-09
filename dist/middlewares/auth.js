"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
// Lê as variaveis de ambiente
require('dotenv').config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.Auth = {
    private: (req, res, next) => {
        let success = false;
        // Fazer autenticação
        if (req.headers.authorization) {
            // Divide o token
            const [authType, token] = req.headers.authorization.split(' ');
            //Verifica se é Bearer
            if (authType === 'Bearer') {
                try {
                    // Verifica se jwt é válido
                    const decoded = jsonwebtoken_1.default.verify(token, // Envia token 
                    process.env.JWT_SECRET_KEY // Envia secret_key
                    );
                    success = true;
                }
                catch (err) {
                    return res.json({ error: err });
                }
            }
        }
        // Caso não dê sucesso
        if (!success) {
            res.status(403); // Not authorized
            return res.json({ error: 'Não autorizado' });
        }
        // Envia para o próximo passo
        return next();
    }
};
