//define routes for tasks (GET, PUT, PATCH, DELETE)

import express from "express";
import { TaskController } from "../controllers/taskControllers";
import { InMemoryTaskRepository } from "../../../repositories/InMemoryTaskRepository";
import { UuidGenerator } from "../../idGenerator/uiidGenerator";

const router = express.Router(); //create router

// Create instance of repository and controller
const taskRepository = new InMemoryTaskRepository();
const idGenerator = new UuidGenerator();
const taskController = new TaskController(idGenerator, taskRepository);

router.get("/tasks", taskController.getAllTask);
router.post("/tasks", taskController.addTask);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);

export default router;
