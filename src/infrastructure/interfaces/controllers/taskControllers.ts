// intereacts with TaskRepository to permform the necessary CRUD operations

import { Request, Response } from "express";
import { InMemoryTaskRepository } from "../../../repositories/InMemoryTaskRepository";

export class TaskController {
  private taskRepository: InMemoryTaskRepository;

  constructor(taskRepository: InMemoryTaskRepository) {
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
}
