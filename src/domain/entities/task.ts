export class Task {
  id: string;
  task: string;
  isChecked: boolean;

  constructor(id: string, task: string, isChecked: boolean) {
    this.id = id;
    this.task = task;
    this.isChecked = isChecked;
  }
}
