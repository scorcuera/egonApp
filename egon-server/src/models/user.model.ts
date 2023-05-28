import { DataTypes } from "sequelize";
import { connection } from "../database";

export const User = connection.define('User', {
    UserId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    UserPassword: {
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
        allowNull: false
    }
});
