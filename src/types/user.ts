import { Optional } from "sequelize";
import { UserModel } from "../models/user";

export interface UserDTO {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
}

export interface CreateUserDTO  extends Optional<UserModel, "id">{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    role: string;
    isActive: boolean;
    photoUrl?: string;
}

export interface UpdateUserDTO {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    role?: string;
    isActive?: boolean;
    photoUrl?: string;

}