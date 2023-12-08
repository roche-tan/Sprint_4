import { Task } from "../../../../domain/entities/task";
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
  it("should set the task list correctly", async () => {
    //create an instance of the class
    const taskManager = new TaskManager(mockTaskRepository, mockIdGenerator);
    //mock task list
    const mockTaskList = [
      { id: "1", newTask: "Task 1", isCompleted: false },
      { id: "2", newTask: "Task 2", isCompleted: true }
    ];

    //call setTaskList with the mockTaskList
    taskManager.setTaskList(mockTaskList);

    // Check if taskList property of the instance is updated
    expect(await taskManager.getTaskList()).toEqual(mockTaskList);
  });

  it("should return an empty list when no tasks are added", async () => {
    const tasks = await taskManager.getTaskList();
    expect(tasks).toEqual([]);
  });
});

describe("add task to array list", () => {
  it("add new task if does not exist", async () => {
    await taskManager.addTask("task4");
    const currentTaskList = await taskManager.getTaskList();
    expect(currentTaskList.some((task) => task.newTask === "task4")).toBe(true);
  });

  // it("should thow error if input is empty", () => {
  //   expect(() => taskManager.addTask("")).toThrow("Tarea vacía");
  // });

  it("should throw an error if newTask is empty", async () => {
    expect.assertions(1); // Ensure that one assertion is called within the test

    try {
      await taskManager.addTask("");
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Tarea vacía");
      } else {
        throw error;
      }
    }
  });

  it("should not add task if it is already in list", async () => {
    const existingTask = new Task("existing-id", "task1", false);
    mockTaskRepository.getAll = jest.fn().mockResolvedValue([existingTask]);

    expect.assertions(1); // Ensure that one assertion is called within the test

    try {
      await taskManager.addTask("task1");
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("La tarea ya está en la lista");
      } else {
        throw error;
      }
    }
  });
});

describe("Update task", () => {
  it("marks task4 as completed", async () => {
    await taskManager.addTask("task4");
    await taskManager.markTaskCompleted("task4");

    const currentTaskList = await taskManager.getTaskList();
    const task4 = currentTaskList.find((task) => task.newTask === "task4");

    expect(task4?.isCompleted).toBe(true);
  });

  it("should allow marking a completed task as not completed", async () => {
    await taskManager.addTask("task6");
    await taskManager.markTaskCompleted("task6");

    await taskManager.markTaskCompleted("task6"); // Revert to not completed
    const task = (await taskManager.getTaskList()).find(
      (task) => task.newTask === "task6"
    );
    expect(task?.isCompleted).toBe(false);
  });

  it("should throw an error if the task does not exist", async () => {
    const nonExistentTaskName = "non-existent-task";

    expect.assertions(1); // Ensure that one assertion is called within the test

    try {
      // Act: Attempt to mark a non-existent task as completed
      await taskManager.markTaskCompleted(nonExistentTaskName);
    } catch (error) {
      // Assert: Check if the correct error is thrown
      if (error instanceof Error) {
        expect(error.message).toBe("Tarea no encontrada");
      } else {
        throw error;
      }
    }
  });
});

describe("Remove task to list", () => {
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
    expect(updatedList.some((task) => task.newTask === "task4")).toBe(false);
  });

  it("should throw error if task is not checked", async () => {
    await taskManager.addTask("task1");

    expect.assertions(1);

    try {
      await taskManager.removeTask("task1");
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Tarea no marcada como completa");
      } else {
        throw error;
      }
    }
  });

  it("should not remove task if it is not in the list", async () => {
    expect.assertions(1); // Ensure that one assertion is called within the test

    try {
      // Act: Attempt to remove a non-existent task
      await taskManager.removeTask("non-existent-task");
    } catch (error) {
      // Assert: Check if the correct error is thrown
      if (error instanceof Error) {
        expect(error.message).toBe("Tarea no encontrada");
      } else {
        throw error;
      }
    }
  });
});
