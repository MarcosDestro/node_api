"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
require('dotenv').config();
const sequelize_1 = require("sequelize");
let database = '';
if (process.env.PORT != process.env.PORT_DEV) {
    database = process.env.DATABASE_URL;
}
else {
    database = process.env.DATABASE_DEV;
}
exports.sequelize = new sequelize_1.Sequelize(database, { ssl: true });
exports.sequelize.authenticate()
    .then(() => console.info('Connection has been established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error));
// export const sequelize = new Sequelize(
//     process.env.DB_NAME as string,
//     process.env.DB_USER as string,
//     process.env.DB_PASSWORD as string,
//     {
//         dialect: 'postgres',
//         port: parseInt(process.env.DB_PORT as string),
//         host: process.env.DB_HOST as string,
//     }
// )
