import { Project } from "../models/projects";
import { AdminProjectRepository, UserProjectRepository } from "../repositories/ProjectRepository";
import { AdminTaskRepository } from "../repositories/TaskRepository";

export class AdminProjectService {
    constructor(private projectRepository: AdminProjectRepository, private taskRepository: AdminTaskRepository) {}

    async getAllProjects(filters: any): Promise<Project[]> {
        return this.projectRepository.findAll(filters);
    }

    async getProjectById(id: number): Promise<Project | null> {
        return this.projectRepository.findById(id);
    }

    async getProjectsByUserId(userId: number): Promise<Project[]> {
        return this.projectRepository.findAll({ userId: userId });
    }

    async createProject(newProject: any): Promise<Project> {
        return this.projectRepository.save(newProject);
    }

    async updateProject(id: number, updatedProject: Partial<Project>): Promise<Project | null> {
        const project = await this.projectRepository.findById(id);

        if (project?.user?.id !== updatedProject.user) {
            const tasks = await this.taskRepository.findAll({ projectId: id });
            tasks.forEach(async (task) => {
                await this.taskRepository.update(task.id, {
                    user: updatedProject.user,
                });
            });
        }
        return this.projectRepository.update(id, updatedProject);
    }

    async deleteProject(id: number): Promise<void> {
        return this.projectRepository.delete(id);
    }
}

export class UserProjectService {
    constructor(private projectRepository: UserProjectRepository) {}

    async getAllProjects(filters: any): Promise<Project[]> {
        return this.projectRepository.findAll(filters);
    }

    async getProjectById(id: number, userId: number): Promise<Project | null> {
        return this.projectRepository.findById(id, userId);
    }

    async createProject(newProject: any): Promise<Project> {
        return this.projectRepository.save(newProject);
    }

    async updateProject(id: number, updatedProject: Partial<Project>): Promise<Project | null> {
        return this.projectRepository.update(id, updatedProject);
    }

    async deleteProject(id: number): Promise<void> {
        return this.projectRepository.delete(id);
    }
}
