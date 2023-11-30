import { Task } from "../../domain/entities/task";
import { UuidGenerator } from "../../infrastructure/idGenerator/uiidGenerator";

export class TaskManager {
  private taskList: Task[] = [];
  private idGenerator: UuidGenerator;

  constructor(idGenerator: UuidGenerator) {
    this.idGenerator = idGenerator;
  }

  //set new list of tasks
  setTaskList(tasks: Task[]): void {
    this.taskList = [...tasks];
  }

  //allows other parts of the code get a copy of task list. Is needed for the tests
  getTaskList(): Task[] {
    return this.taskList.slice(); //slice to provent mutation of the array
  }

  // Add a new task to taskList array
  addTask(newTask: string): Task[] {
    const taskExists = this.taskList.some((task) => task.task === newTask);
    const generateNewTask = new Task(
      this.idGenerator.generate(),
      newTask,
      false
    );

    if (newTask === "") {
      throw new Error("Tarea vacía");
    }

    if (taskExists) {
      throw new Error("La tarea ya está en la lista");
    }

    this.taskList.push(generateNewTask);

    return this.taskList;
  }

  // remove a task from list
  removeTask(taskName: string): Task[] {
    this.taskList = this.taskList.filter((task) => {
      if (task.task === taskName && !task.isChecked) {
        throw new Error("Tarea no marcada");
      }
      if (task.task === taskName && task.isChecked) {
        return false;
      }
      return true;
    });
    return this.taskList;
  }

  // Mark task as completed
  markTaskCompleted(taskName: string): void {
    const taskToMark = this.taskList.find((task) => task.task === taskName);

    if (taskToMark) {
      taskToMark.isChecked = !taskToMark.isChecked;
    }
  }
}
