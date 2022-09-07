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
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomPhrase = exports.deletePhrase = exports.updatePhrase = exports.getPhrase = exports.listPhrases = exports.createPhrase = exports.name = exports.random = exports.ping = void 0;
const sequelize_1 = require("sequelize");
const Phrase_1 = require("../models/Phrase");
// Retorna uma reposta para o ping
const ping = (req, res) => {
    return res.json({ pong: true });
};
exports.ping = ping;
// Retorna um número randomico até 10
const random = (req, res) => {
    let rand = Math.ceil(Math.random() * 10);
    return res.json({ number: rand });
};
exports.random = random;
// Retorna um nome enviado pela url
const name = (req, res) => {
    let name = req.params.name;
    return res.json({ name });
};
exports.name = name;
// Pega uma frase do banco
const createPhrase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { author, txt } = req.body;
    // console.log(req.body);
    // Caso não informe autor ou frase
    if (!author || !txt) {
        return res.json({ error: 'Informe todos os parâmetros' });
    }
    let newPhrase = yield Phrase_1.Phrase.create({ author, txt });
    res.status(201); // Código para criado
    return res.json({ id: newPhrase.id, author, txt });
});
exports.createPhrase = createPhrase;
// Lista todas as frases
const listPhrases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let list = yield Phrase_1.Phrase.findAll();
    // Caso não exista frases
    if (!list) {
        return res.json({ error: 'Não há frases cadastradas' });
    }
    return res.json({ list });
});
exports.listPhrases = listPhrases;
// Pega uma frase pelo id
const getPhrase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let phrase = yield Phrase_1.Phrase.findByPk(id);
    // Caso não encontre a frase
    if (!phrase) {
        return res.json({ error: 'Frase não encontrada' });
    }
    return res.json({ phrase });
});
exports.getPhrase = getPhrase;
// Atualiza a frase pelo id da url, e pelos dados do corpo da requisição
const updatePhrase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let { author, txt } = req.body;
    // Caso algum campo vazio
    if (!author && !txt) {
        return res.json({ error: 'Informe algum parâmetro' });
    }
    let phrase = yield Phrase_1.Phrase.findByPk(id);
    // Caso não encontre
    if (!phrase) {
        return res.json({ error: 'Frase não encontrada' });
    }
    phrase.author = author !== null && author !== void 0 ? author : phrase.author;
    phrase.txt = txt !== null && txt !== void 0 ? txt : phrase.txt;
    yield phrase.save();
    return res.json({ phrase });
});
exports.updatePhrase = updatePhrase;
// Deleta uma frase pelo id da url
const deletePhrase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let phrase = yield Phrase_1.Phrase.findByPk(id);
    // Caso não encontre
    if (!phrase) {
        return res.json({ error: 'Frase não encontrada' });
    }
    yield Phrase_1.Phrase.destroy({ where: { id } });
    return res.json({ status: 'deleted' });
});
exports.deletePhrase = deletePhrase;
// Pega uma frase aleatória
const randomPhrase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let phrase = yield Phrase_1.Phrase.findOne({
        order: [
            // Executa uma função no meio da consulta
            sequelize_1.Sequelize.fn('RANDOM') // Postgres
            // Sequelize.fn('RAND') // Para sql
        ]
    });
    if (!phrase) {
        return res.json({ error: 'Não há frases cadastradas' });
    }
    return res.json({ phrase });
});
exports.randomPhrase = randomPhrase;
