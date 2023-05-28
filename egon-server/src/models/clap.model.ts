import { DataTypes } from "sequelize";
import { connection } from "../database";

export const Clap = connection.define('Clap', {
    ClapId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    },
    FromUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'UserId',
        }
    },
    ToUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'UserId',
        }
    },
    ClapCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    SentAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    timestamps: false
});
