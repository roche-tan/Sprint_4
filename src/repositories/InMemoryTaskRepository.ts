import { TaskRepository } from "./ITaskRepository";
import { Task } from "../domain/entities/task";

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];

  async getAll(): Promise<Task[]> {
    return this.tasks;
  }

  async add(task: Task): Promise<Task> {
    this.tasks.push(task);
    return task;
  }

  async update(taskToUpdate: Task): Promise<Task> {
    const taskIndex = this.tasks.findIndex(
      (task) => task.id === taskToUpdate.id
    );

    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

    this.tasks[taskIndex] = taskToUpdate;
    return taskToUpdate;
  }

  async delete(id: string): Promise<void> {
    // Elimina la tarea por ID
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new Error("Tarea no encontrada");
    }

    this.tasks.splice(taskIndex, 1);
  }
}
