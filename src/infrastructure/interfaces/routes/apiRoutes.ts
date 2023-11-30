import express from "express";

const router = express.Router(); //create router

//dummy data
const tasks = [
  { task: "task1", isChecked: false },
  { task: "task2", isChecked: true },
  { task: "task3", isChecked: false }
];

//enpoints
router.get("/", (req, res) => {
  // res.send("Fetching all entry tasks");
  res.send({
    tasks
  }); //appears in localhost/3000
});

router.post("/", (req, res) => {
  res.send("Saving a task");
});

export default router;
