import { User } from "../models/user";

export default interface IUserRepository {
    findAll(filters: any): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    save(user: Partial<User>): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    update(id: number, updates: any): Promise<User | null>;
}
