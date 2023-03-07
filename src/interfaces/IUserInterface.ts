import { User } from "../models";
import { RegisterInput } from "../types/authentication";
import { UserDTO } from "../types/user";

export default interface IUserInterface {
    getAll(filters: any): Promise<User[]>;
    getById(id: number): Promise<User | null>;
    create(user: RegisterInput): Promise<User>;
    getByEmail(email: string): Promise<User | null>;
    update(id: number, updates: UserDTO): Promise<User>;
}
