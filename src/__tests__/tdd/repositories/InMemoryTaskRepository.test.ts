import { Task } from "../../../domain/entities/task";
import { InMemoryTaskRepository } from "../../../repositories/InMemoryTaskRepository";

describe("InMemoryTaskRepository - update method", () => {
  let taskRepository: InMemoryTaskRepository;

  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository();
  });

  it("should throw an error if the task to update is not found", async () => {
    const nonExistentTask = new Task("non-existent-id", "Task 1", false);

    expect.assertions(1);

    try {
      await taskRepository.update(nonExistentTask);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Task not found");
      } else {
        throw error;
      }
    }
  });
});

describe("InMemoryTaskRepository - delete method", () => {
  let taskRepository: InMemoryTaskRepository;

  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository();
  });

  it("should throw an error if the task to delete is not found", async () => {
    const nonExistentTaskId = "non-existent-id";

    expect.assertions(1);

    try {
      await taskRepository.delete(nonExistentTaskId);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Tarea no encontrada");
      } else {
        throw error;
      }
    }
  });
});
