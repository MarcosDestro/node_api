"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
require('dotenv').config();
// import dotenv from 'dotenv';
const sequelize_1 = require("sequelize");
// dotenv.config();
exports.sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    port: parseInt(process.env.DB_PORT),
    host: process.env.DB_HOST,
}
// 'phrases',
// 'postgres',
// '1234',
// {
//     dialect: 'postgres',
//     port: parseInt('5432'),
//     host: 'localhost'
// }
);
