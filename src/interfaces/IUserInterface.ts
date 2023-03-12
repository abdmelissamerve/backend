import { User } from "../models";
import { Register } from "../types/authentication";
import { UserDTO } from "../types/user";

export default interface IUserInterface {
    getAll(filters: any): Promise<User[]>;
    getById(id: number): Promise<UserDTO | null>;
    create(user: Register): Promise<User>;
    getByEmail(email: string): Promise<User | null>;
    update(id: number, updates: UserDTO): Promise<User>;
}
