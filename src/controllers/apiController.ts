import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import { Phrase } from '../models/Phrase';
import { User } from '../models/User';

// Retorna uma reposta para o ping
export const ping = (req: Request, res: Response) => {
    return res.json({ pong: true });
}

// Retorna um número randomico até 10
export const random = (req: Request, res: Response)=>{
    let rand: number = Math.ceil(Math.random()*10);
    return res.json({number: rand});
}

// Retorna um nome enviado pela url
export const name = (req: Request, res: Response)=>{
    let name: string = req.params.name;
    return res.json({name});
}

// Pega uma frase do banco
export const createPhrase = async (req: Request, res: Response)=>{
    let { author, txt } = req.body;
    // console.log(req.body);

    // Caso não informe autor ou frase
    if(!author || !txt){
        return res.json({ error: 'Informe todos os parâmetros' });
    }

    let newPhrase = await Phrase.create({ author, txt });
    res.status(201); // Código para criado
    return res.json({ id: newPhrase.id, author, txt });
}

// Lista todas as frases
export const listPhrases = async (req: Request, res: Response) => {
    let list = await Phrase.findAll();

    // Caso não exista frases
    if(!list){
        return res.json({ error: 'Não há frases cadastradas' });
    }
    return res.json({ list });
}

// Pega uma frase pelo id
export const getPhrase = async (req: Request, res: Response) => {
    let { id } = req.params;
    let phrase = await Phrase.findByPk(id);

    // Caso não encontre a frase
    if(!phrase){
        return res.json({error: 'Frase não encontrada'});
    }
    return res.json({ phrase });
}

// Atualiza a frase pelo id da url, e pelos dados do corpo da requisição
export const updatePhrase = async (req: Request, res: Response) => {
    let { id } = req.params;
    let { author, txt } = req.body;
    
    // Caso algum campo vazio
    if(!author && !txt){
        return res.json({ error: 'Informe algum parâmetro' });
    }

    let phrase = await Phrase.findByPk(id);    

    // Caso não encontre
    if(!phrase){
        return res.json({error: 'Frase não encontrada'});
    }

    phrase.author = author ?? phrase.author;
    phrase.txt = txt ?? phrase.txt;
    await phrase.save();

    return res.json({ phrase });
}

// Deleta uma frase pelo id da url
export const deletePhrase = async (req: Request, res: Response) => {
    let { id } = req.params;
    let phrase = await Phrase.findByPk(id);

    // Caso não encontre
    if(!phrase){
        return res.json({error: 'Frase não encontrada'});
    }

    await Phrase.destroy({ where: { id } });
    return res.json({ status: 'deleted' });
}

// Pega uma frase aleatória
export const randomPhrase = async (req: Request, res: Response) => {
    let phrase = await Phrase.findOne({
        order: [
            // Executa uma função no meio da consulta
            Sequelize.fn('RANDOM') // Postgres
            // Sequelize.fn('RAND') // Para sql
        ]
    })

    if(!phrase){
        return res.json({error: 'Não há frases cadastradas'});
    }
    return res.json({ phrase });
}
