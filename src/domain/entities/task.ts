export class Task {
  id: string;
  newTask: string;
  isCompleted: boolean;

  constructor(id: string, newTask: string, isCompleted: boolean) {
    this.id = id;
    this.newTask = newTask;
    this.isCompleted = isCompleted;
  }
}
