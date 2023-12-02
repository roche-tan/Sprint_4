//handling errors, parsing requests
import express from "express";
const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(express.json);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("Interval Server Error");
});
