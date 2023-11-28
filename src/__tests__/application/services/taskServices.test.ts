/* const {
  taskList,
  Task,
  setTaskList,
  addInput,
  removeInput,
  markTaskCompleted
} = require("../src/todo-list");*/

import { TaskManager } from "../../../application/services/taskService";

let taskManager: TaskManager; //Intanciar TaskManager to use its methods

//before each test, we eecure a new instance of TaskManager. Is needed to ensure each test is initialized without previous tests alterations
beforeEach(() => {
  taskManager = new TaskManager();
});

describe("setTaskList method", () => {
  it("should set the task list correctly", () => {
    //create an instance of the class
    const taskManager = new TaskManager();
    //mock task list
    const mockTaskList = [
      { task: "Task 1", isChecked: false },
      { task: "Task 2", isChecked: true }
    ];

    //call setTaskList with the mockTaskList
    taskManager.setTaskList(mockTaskList);

    // Check if taskList property of the instance is updated
    expect(taskManager.getTaskList()).toEqual(mockTaskList);
  });
});

describe("add task to array list", () => {
  it("should thow error if input is empty", () => {
    expect(() => taskManager.addTask("")).toThrow("Tarea vacía");
  });

  it("should not add task if it is already in list", () => {
    taskManager.addTask("task1");
    expect(() => taskManager.addTask("task1")).toThrow(
      "La tarea ya está en la lista"
    );
  });

  it("add new task if does not exist", () => {
    taskManager.addTask("task4");
    const currentTaskList = taskManager.getTaskList();
    expect(currentTaskList.some((task) => task.task === "task4")).toBe(true);
  });
});

describe("Mark task as completed", () => {
  it("marks task4 as completed", () => {
    taskManager.addTask("task4");
    taskManager.markTaskCompleted("task4");

    const currentTaskList = taskManager.getTaskList();
    const task4 = currentTaskList.find((task) => task.task === "task4");

    expect(task4?.isChecked).toBe(true);
  });
});

describe("remove task to list", () => {
  it("should throw error if task is not checked", () => {
    taskManager.addTask("task1");
    expect(() => taskManager.removeTask("task1")).toThrow("Tarea no marcada");
  });

  it("should not remove task if it is not in the list", () => {
    taskManager.addTask("task1");
    taskManager.addTask("task2");
    const initialTaskList = taskManager.getTaskList();

    taskManager.removeTask("task3");
    const updatedTaskList = taskManager.getTaskList();

    //should be the same as task3 does not exist
    expect(updatedTaskList).toEqual(initialTaskList);
  });

  it("removes task4 from taskList when checked", () => {
    taskManager.addTask("task4");
    taskManager.markTaskCompleted("task4");
    //task list initial length
    const initialLength = taskManager.getTaskList().length;

    // Remove task
    taskManager.removeTask("task4");
    const updatedList = taskManager.removeTask("task4");

    // we check if task4 has been removed from list
    expect(updatedList.length).toBe(initialLength - 1);

    //confirm task4 is no longer on list
    expect(updatedList.some((task) => task.task === "task4")).toBe(false);
  });
});
