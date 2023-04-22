import { Task } from "../models/tasks";

export interface IAdminTaskRepository {
    findAll(filters: any): Promise<Task[]>;
    findById(id: number): Promise<Task | null>;
    save(task: Partial<Task>): Promise<Task>;
    update(id: number, updates: any): Promise<Task | null>;
    delete(id: number): Promise<void>;
}

export interface IUserTaskRepository {
    findAll(filters: any): Promise<Task[]>;
    findById(id: number, userId: number): Promise<Task | null>;
    save(task: Partial<Task>): Promise<Task>;
    update(id: number, updates: any): Promise<Task | null>;
    delete(id: number): Promise<void>;
}
