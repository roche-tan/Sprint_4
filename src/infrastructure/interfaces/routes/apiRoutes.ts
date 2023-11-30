//define routes for tasks (GET, PUT, PATCH, DELETE)

import express from "express";
import { TaskController } from "../controllers/taskControllers";

const router = express.Router(); //create router

router.get("/tasks", TaskController());

export default router;
