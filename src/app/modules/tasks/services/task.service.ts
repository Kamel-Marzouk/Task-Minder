import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  allTasks: Task[] = [];
  tasks: Subject<Task[]> = new Subject<Task[]>();

  constructor() { }

  updateTasks(tasks: Task[]): void {
    if (!tasks) return
    this.allTasks = tasks;
    this.tasks.next(this.allTasks);
  }

  updatetask(task: Task): void {
    if (!task) return;
    const index: number = this.allTasks.findIndex((currentUser: Task) => currentUser.id == task.id);
    this.allTasks[index] = task;
    this.tasks.next(this.allTasks);
  }

  addTask(task: Task): void {
    if (!task) return;
    this.allTasks.push(task);
    this.tasks.next(this.allTasks);
  }

  deleteTask(taskId: string): void {
    if (!taskId) return;
    const index: number = this.allTasks.findIndex((task: Task) => task.id == taskId);
    this.allTasks.splice(index, 1);
    this.tasks.next(this.allTasks);
  }

}
