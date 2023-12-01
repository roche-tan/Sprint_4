// intereacts with TaskRepository to permform the necessary CRUD operations

import { Request, Response } from "express";
import { InMemoryTaskRepository } from "../../../repositories/InMemoryTaskRepository";
import { Task } from "../../../domain/entities/task";
import { UuidGenerator } from "../../idGenerator/uiidGenerator";

export class TaskController {
  private idGenerator: UuidGenerator;
  private taskRepository: InMemoryTaskRepository;

  constructor(
    idGenetaror: UuidGenerator,
    taskRepository: InMemoryTaskRepository
  ) {
    this.idGenerator = idGenetaror;
    this.taskRepository = taskRepository;
  }

  async getAllTask(req: Request, res: Response) {
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
    try {
      const { taskName, isCompleted } = req.body; // Asume que recibes estos datos
      const newTaskId = this.idGenerator.generate();
      const newTask = new Task(newTaskId, taskName, isCompleted);
      await this.taskRepository.add(newTask);
      res.status(201).json(newTask); // Devuelve la tarea creada
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        // If it's not an Error instance, you can send a generic response
        res.status(500).send("An unexpected error occurred");
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
