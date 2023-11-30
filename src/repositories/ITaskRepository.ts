//interfaces to intereact with the logic
import { Task } from "../domain/entities/task";

export interface TaskRepository {
  getAll(): Promise<Task[]>;
  add(task: Task): Promise<Task>;
  update(task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
}
