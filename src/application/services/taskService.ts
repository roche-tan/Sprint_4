import { Task } from "../../domain/entities/task";
import { UuidGenerator } from "../../infrastructure/idGenerator/uiidGenerator";
import { TaskRepository } from "../../repositories/ITaskRepository";

export class TaskManager {
  // private taskList: Task[] = [];

  private taskRepository: TaskRepository;
  private idGenerator: UuidGenerator;

  // constructor(idGenerator: UuidGenerator) {
  //   this.idGenerator = idGenerator;
  // }

  constructor(taskRepository: TaskRepository, idGenerator: UuidGenerator) {
    this.taskRepository = taskRepository;
    this.idGenerator = idGenerator;
  }

  //set new list of tasks
  async setTaskList(tasks: Task[]): Promise<void> {
    await this.taskRepository.setTaskList(tasks);
  }

  // //allows other parts of the code get a copy of task list. Is needed for the tests
  async getTaskList(): Promise<Task[]> {
    return await this.taskRepository.getAll(); //slice to provent mutation of the array
  }

  // Add a new task to taskList array
  // addTask(newTask: string): Task[] {
  async addTask(newTask: string): Promise<Task> {
    // const generateNewTask = new Task(
    //   this.idGenerator.generate(),
    //   newTask,
    //   false
    // );

    if (newTask === "") {
      throw new Error("Tarea vacía");
    }

    const taskExists = (await this.taskRepository.getAll()).some(
      (task) => task.task === newTask
    );

    if (taskExists) {
      throw new Error("La tarea ya está en la lista");
    }

    // this.taskList.push(generateNewTask);

    const task = new Task(this.idGenerator.generate(), newTask, false);

    return this.taskRepository.add(task);
  }

  // remove a task from list
  async removeTask(taskName: string): Promise<void> {
    const task = await this.taskRepository.getAll();
    const taskToDelete = task.find((task) => task.task === taskName);

    if (!taskToDelete) {
      throw new Error("Tarea no encontrada");
    }

    if (!taskToDelete.isChecked) {
      throw new Error("Tarea no marcada como completa");
    }

    await this.taskRepository.delete(taskToDelete.id);
  }

  // Mark task as completed
  async markTaskCompleted(taskName: string): Promise<void> {
    const tasks = await this.taskRepository.getAll();
    const taskToMark = tasks.find((task) => task.task === taskName);

    if (!taskToMark) {
      throw new Error("Tarea no encontrada");
    }

    if (taskToMark) {
      taskToMark.isChecked = !taskToMark.isChecked;
    }
    await this.taskRepository.update(taskToMark);
  }
}
