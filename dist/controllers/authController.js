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
exports.dash = exports.me = exports.login = exports.register = void 0;
// Lê as variaveis de ambiente
require('dotenv').config();
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Caso não envie todos os dados
    if (!req.body.email && !req.body.password) {
        return res.json({ error: 'E-mail e/ou senha não enviados.' });
    }
    let { email, password } = req.body;
    let hasUser = yield User_1.User.findOne({ where: { email } });
    // Caso encontre o usuário com o mesmo email
    if (hasUser) {
        return res.json({ error: 'E-mail já existe.' });
    }
    let newUser = yield User_1.User.create({ email, password });
    // Cria o token
    const token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET_KEY);
    res.status(201);
    return res.json({ id: newUser.id, token });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Caso não envie todos os dados
    if (!req.body.email || !req.body.password) {
        return res.json({ error: 'Informe todos os dados para continuar' });
    }
    let email = req.body.email;
    let password = req.body.password;
    // Pesquisa pelo usuário no banco
    let user = yield User_1.User.findOne({
        where: { email, password }
    });
    // Caso não encontre
    if (!user) {
        return res.json({ error: 'E-mail e/ou senha não conferem' });
    }
    // Cria o token
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
    // Retorna os dados
    return res.json({ status: 'logged', token });
});
exports.login = login;
/**
 * Tras as informações do cadastro
 */
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        return res.json({ error: 'Informe todos os dados para continuar' });
    }
    const [, token] = req.headers.authorization.split(' ');
    const decoded = jsonwebtoken_1.default.verify(token, // Envia token 
    process.env.JWT_SECRET_KEY // Envia secret_key
    );
    let { email, id } = decoded;
    return res.json({ id, email });
});
exports.me = me;
/**
 * Painel privado
 */
const dash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({ message: 'Bem-vindo!' });
});
exports.dash = dash;
