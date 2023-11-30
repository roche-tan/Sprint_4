//interfaces to intereact with the logic
import { Task } from "../domain/entities/task";

export interface TaskRepository {
  getAll(): Promise<Task[]>;
  add(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
  delete(id: number): Promise<void>;
}
