import { AdminTaskRepository, UserTaskRepository } from "../repositories/TaskRepository";
import { Task } from "../models/tasks";

export class TaskService {
    constructor(private taskRepository: AdminTaskRepository) {}

    async getAllTasks(filters: any): Promise<Task[]> {
        return this.taskRepository.findAll(filters);
    }

    async getTaskById(id: number): Promise<Task | null> {
        return this.taskRepository.findById(id);
    }

    async getTasksByProjectId(projectId: number): Promise<Task[]> {
        return this.taskRepository.findAll({ projectId: projectId });
    }

    async createTask(newTask: any): Promise<Task> {
        return this.taskRepository.save(newTask);
    }

    async updateTask(id: number, updatedTask: Partial<Task>): Promise<Task | null> {
        return this.taskRepository.update(id, updatedTask);
    }

    async deleteTask(id: number): Promise<void> {
        return this.taskRepository.delete(id);
    }
}

export class UserTaskService {
    constructor(private taskRepository: UserTaskRepository) {}

    async getAllTasks(filters: any): Promise<Task[]> {
        return this.taskRepository.findAll(filters);
    }

    async getTaskById(id: number, userId: number): Promise<Task | null> {
        return this.taskRepository.findById(id, userId);
    }

    async getTasksByProjectId(projectId: number, userId: number): Promise<Task[]> {
        return this.taskRepository.findAll({ projectId: projectId, userId: userId });
    }

    async createTask(newTask: any): Promise<Task> {
        return this.taskRepository.save(newTask);
    }

    async updateTask(id: number, updatedTask: Partial<Task>): Promise<Task | null> {
        return this.taskRepository.update(id, updatedTask);
    }

    async deleteTask(id: number): Promise<void> {
        return this.taskRepository.delete(id);
    }
}
