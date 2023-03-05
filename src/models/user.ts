import { Model, Sequelize, DataTypes, Optional } from "sequelize";
import database from "../database";

interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isActive: boolean;
    photoUrl?: string;
    role: string;
    // timestamps!
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface UserInput extends Optional<UserModel, "id"> {}

export interface UserOutput extends Partial<UserModel> {}

class User extends Model<UserModel, UserInput> implements UserModel {
    public id: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public isActive!: boolean;
    public photoUrl?: string;
    public role!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING(255),
        },
        lastName: {
            type: DataTypes.STRING(255),
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        photoUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "user",
        },
    },
    {
        sequelize: database,
        tableName: "users",
        timestamps: true,
        paranoid: true,
    }
);

export default User;
