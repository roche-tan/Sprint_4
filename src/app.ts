import express from "express";
import taskRouter from "./infrastructure/interfaces/routes/apiRoutes";

const app = express();
app.use(express.json()); //middleware that transforms a req.body to a json

const PORT = 3000;

//in apiRoutes
app.get("/", (req, res) => {
  console.log("someon pinged here"); //appears in terminal
  res.send("ping-pong"); //appears in localhost/3000
});

//use router
app.use("/api", taskRouter);

//iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`); //appears in terminal
});
