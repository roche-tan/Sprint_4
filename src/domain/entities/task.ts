export class Task {
  task: string;
  isChecked: boolean;

  constructor(task: string, isChecked: boolean) {
    this.task = task;
    this.isChecked = isChecked;
  }
}
