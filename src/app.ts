//app.ts entry point to my application

import express from "express";
import cors from "cors";
import taskRouter from "./infrastructure/interfaces/routes/apiRoutes";
import { cacheControlMiddleWare } from "./infrastructure/interfaces/middlewares/cacheControlMiddleware";
import { authMiddleware } from "./infrastructure/interfaces/middlewares/authMiddleware";

const app = express();
app.use(express.json()); //middleware that transforms a req.body to a json

//the ORDER of the middlewares are important. This allows the application to work properly
app.use(cors());
app.use(cacheControlMiddleWare);
app.use(authMiddleware);

//use router
app.use("/api", taskRouter);

//start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`); //appears in terminal
});
