import { DataTypes } from "sequelize";
import { connection } from "../database/database";

export const UserModel = connection.define('User',
    {
        UserId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: true,
            primaryKey: true
        },
        Username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        UserRole: {
            type: DataTypes.STRING,
            allowNull: false
        },
        UserEmail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ClapsAvailable: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        CreatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, 
    {
        timestamps: false,
    }
);
