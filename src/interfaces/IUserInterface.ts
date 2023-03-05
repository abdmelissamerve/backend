import { UserInput, UserOutput } from "../models";

export default interface IUserInterface {
    getAll(filters: any): Promise<UserOutput[]>;
    getById(id: number): Promise<UserOutput | null>;
    create(user: UserInput): Promise<UserOutput>;
}
