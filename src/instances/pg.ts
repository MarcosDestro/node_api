require('dotenv').config();

// import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        dialect: 'postgres',
        port: parseInt(process.env.DB_PORT as string),
        host: process.env.DB_HOST as string,
    }

    // 'phrases',
    // 'postgres',
    // '1234',
    // {
    //     dialect: 'postgres',
    //     port: parseInt('5432'),
    //     host: 'localhost'
    // }
)