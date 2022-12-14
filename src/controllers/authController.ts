// Lê as variaveis de ambiente
require('dotenv').config();

import { Request, Response } from 'express';
import { User, UserInstance } from '../models/User';
import JWT from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
    // Caso não envie todos os dados
    if(!req.body.email && !req.body.password) {
        return res.json({ error: 'E-mail e/ou senha não enviados.' });
    }

    let { email, password } = req.body;
    let hasUser = await User.findOne({where: { email }});

    // Caso encontre o usuário com o mesmo email
    if(hasUser) {
        return res.json({ error: 'E-mail já existe.' });
    } 

    let newUser = await User.create({ email, password });

    // Cria o token
    const token = JWT.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET_KEY as string,
    );

    res.status(201);
    return res.json({ id: newUser.id, token });
}

export const login = async (req: Request, res: Response) => {
    // Caso não envie todos os dados
    if(!req.body.email || !req.body.password) {
        return res.json({ error: 'Informe todos os dados para continuar' });
    }

    let email: string = req.body.email;
    let password: string = req.body.password;

    // Pesquisa pelo usuário no banco
    let user = await User.findOne({ 
        where: { email, password }
    });

    // Caso não encontre
    if(!user) {
        return res.json({ error: 'E-mail e/ou senha não conferem' });
    }

    // Cria o token
    const token = JWT.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET_KEY as string,
        {
            expiresIn: process.env.JWT_EXPIRES as string,
        }
    );

    // Retorna os dados
    return res.json({ status: 'logged', token });
}

/**
 * Tras as informações do cadastro
 */
export const me = async (req: Request, res: Response)=>{
    if(!req.headers.authorization){
        return res.json({ error: 'Informe todos os dados para continuar' });
    }

    const [ , token ] = req.headers.authorization.split(' ');
    const decoded = JWT.verify(
        token, // Envia token 
        process.env.JWT_SECRET_KEY as string // Envia secret_key
    );

    let { email, id }: any = decoded;
    return res.json({ id, email });
}

/**
 * Painel privado
 */
export const dash = async (req: Request, res: Response)=>{
    return res.json({message: 'Bem-vindo!'});
}