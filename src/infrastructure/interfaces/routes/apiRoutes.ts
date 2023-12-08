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
console.log("apiRoutes", taskRepository);

// router.get("/tasks", taskController.getAllTask); //this gets undefined result
router.get("/tasks", (req, res) => taskController.getAllTask(req, res));

// router.post("/tasks", taskController.addTask);
router.post("/tasks", (req, res) => taskController.addTask(req, res));

router.put("/tasks/:id", (req, res) => taskController.updateTask(req, res));
router.delete("/tasks/:id", (req, res) => taskController.deleteTask(req, res));

export default router;
