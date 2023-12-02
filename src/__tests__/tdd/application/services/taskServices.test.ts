import { TaskManager } from "../../../../application/services/taskService";
import { IIdGenerator } from "../../../../domain/interfaces/IIdGenerator";
import { InMemoryTaskRepository } from "../../../../repositories/InMemoryTaskRepository";

let taskManager: TaskManager; //Intanciar TaskManager to use its methods
let mockIdGenerator: IIdGenerator;
let mockTaskRepository: InMemoryTaskRepository;

//before each test, we secure a new instance of TaskManager. Is needed to ensure each test is initialized without previous tests alterations
beforeEach(() => {
  mockIdGenerator = {
    generate: jest.fn(() => "mock-id")
  };
  mockTaskRepository = new InMemoryTaskRepository();
  taskManager = new TaskManager(mockTaskRepository, mockIdGenerator);
});

describe("setTaskList method", () => {
  it("should set the task list correctly", () => {
    //create an instance of the class
    const taskManager = new TaskManager(mockTaskRepository, mockIdGenerator);
    //mock task list
    const mockTaskList = [
      { id: "1", task: "Task 1", isChecked: false },
      { id: "2", task: "Task 2", isChecked: true }
    ];

    //call setTaskList with the mockTaskList
    taskManager.setTaskList(mockTaskList);

    // Check if taskList property of the instance is updated
    expect(taskManager.getTaskList()).toEqual(mockTaskList);
  });

  it("should return an empty list when no tasks are added", async () => {
    const tasks = await taskManager.getTaskList();
    expect(tasks).toEqual([]);
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

  it("add new task if does not exist", async () => {
    await taskManager.addTask("task4");
    const currentTaskList = await taskManager.getTaskList();
    expect(currentTaskList.some((task) => task.task === "task4")).toBe(true);
  });
});

describe("Update task", () => {
  it("marks task4 as completed", async () => {
    await taskManager.addTask("task4");
    await taskManager.markTaskCompleted("task4");

    const currentTaskList = await taskManager.getTaskList();
    const task4 = currentTaskList.find((task) => task.task === "task4");

    expect(task4?.isChecked).toBe(true);
  });

  it("should allow marking a completed task as not completed", async () => {
    await taskManager.addTask("task6");
    await taskManager.markTaskCompleted("task6");

    await taskManager.markTaskCompleted("task6"); // Revert to not completed
    const task = (await taskManager.getTaskList()).find(
      (t) => t.task === "task6"
    );
    expect(task?.isChecked).toBe(false);
  });
});

describe("Remove task to list", () => {
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

  it("removes task4 from taskList when checked", async () => {
    await taskManager.addTask("task4");
    await taskManager.markTaskCompleted("task4");
    //task list initial length
    const initialTaskList = await taskManager.getTaskList();
    const initialLength = initialTaskList.length;

    // Remove task
    await taskManager.removeTask("task4");
    const updatedList = await taskManager.getTaskList();

    // we check if task4 has been removed from list
    expect(updatedList.length).toBe(initialLength - 1);

    //confirm task4 is no longer on list
    expect(updatedList.some((task) => task.task === "task4")).toBe(false);
  });
});
