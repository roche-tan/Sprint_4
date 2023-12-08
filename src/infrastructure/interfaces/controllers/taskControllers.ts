// intereacts with TaskRepository to permform the necessary CRUD operations

import { Request, Response } from "express";
import { InMemoryTaskRepository } from "../../../repositories/InMemoryTaskRepository";
import { Task } from "../../../domain/entities/task";
import { UuidGenerator } from "../../idGenerator/uiidGenerator";
// import { TaskManager } from "../../../application/services/taskService";

export class TaskController {
  private idGenerator: UuidGenerator;
  private taskRepository: InMemoryTaskRepository;
  // private taskManager: TaskManager;

  constructor(
    idGenetaror: UuidGenerator,
    taskRepository: InMemoryTaskRepository
    // taskManager: TaskManager
  ) {
    this.idGenerator = idGenetaror;
    this.taskRepository = taskRepository;
    // this.taskManager = taskManager;
  }

  async getAllTask(req: Request, res: Response) {
    console.log(this.taskRepository);
    try {
      const tasks = await this.taskRepository.getAll();
      res.json(tasks);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        // If it's not an Error instance, you can send a generic response
        res.status(500).send("An unexpected error occurred");
      }
    }
  }

  async addTask(req: Request, res: Response) {
    // console.log(this.taskRepository);
    try {
      const { taskName, isCompleted } = req.body;
      const newTaskId = this.idGenerator.generate();
      const newTask = new Task(newTaskId, taskName, isCompleted);
      await this.taskRepository.add(newTask);
      console.log("add task: :", newTaskId, newTask, isCompleted);
      res.status(201).json(newTask); // Devuelve la tarea creada
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        // If it's not an Error instance, you can send a generic response
        res.status(400).json({ error: "Un error inesperado ocurrió" });
      }
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const taskUpdate = req.body;
      const updateTaskList = await this.taskRepository.update(taskUpdate);
      res.status(200).json(updateTaskList);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        // If it's not an Error instance, you can send a generic response
        res.status(500).send("An unexpected error occurred");
      }
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const taskId = req.params.id;
      const tasks = await this.taskRepository.getAll();
      const taskToDelete = tasks.find((task) => task.id === taskId);

      if (!taskToDelete) {
        throw new Error("Tarea no marcada como completa");
      }

      if (!taskToDelete.isCompleted) {
        throw new Error("Tarea no marcada como completa");
      }

      await this.taskRepository.delete(taskId);
      res.status(200).send("Task deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        // If it's not an Error instance, you can send a generic response
        res.status(500).send("An unexpected error occurred");
      }
    }
  }
}
