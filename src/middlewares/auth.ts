// Lê as variaveis de ambiente
require('dotenv').config();

import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';

export const Auth = {
    private: (req: Request, res: Response, next: NextFunction) => {
        let success = false;

        // Fazer autenticação
        if(req.headers.authorization){
            // Divide o token
            const [ authType, token ] = req.headers.authorization.split(' ');

            //Verifica se é Bearer
            if(authType === 'Bearer'){
                try {
                    // Verifica se jwt é válido
                    const decoded = JWT.verify(
                        token, // Envia token 
                        process.env.JWT_SECRET_KEY as string // Envia secret_key
                    );
                    success = true

                } catch(err) {
                    return res.json({ error: err });
                }
            }
        }

        // Caso não dê sucesso
        if(!success){
            res.status(403); // Not authorized
            return res.json({ error: 'Não autorizado' });
        }
        // Envia para o próximo passo
        return next();
    }
}