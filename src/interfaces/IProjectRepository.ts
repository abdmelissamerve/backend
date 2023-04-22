import { Project } from "../models/projects";

export default interface IProjectRepository {
    findAll(filters: any): Promise<Project[]>;
    findById(id: number): Promise<Project | null>;
    save(project: Partial<Project>): Promise<Project>;
    update(id: number, updates: any): Promise<Project | null>;
    delete(id: number): Promise<void>;
}
