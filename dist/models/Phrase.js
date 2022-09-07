"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phrase = void 0;
const sequelize_1 = require("sequelize");
const pg_1 = require("../instances/pg");
exports.Phrase = pg_1.sequelize.define('Phrase', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    author: {
        type: sequelize_1.DataTypes.STRING
    },
    txt: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'phrases',
    timestamps: false
});
