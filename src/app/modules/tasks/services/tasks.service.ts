import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpService) { }

  public getAllTasks(): Observable<Task[]> {
    return this.http.getAll('/tasks');
  }

  public getFilterTasks(filterValue: string): Observable<Task[]> {
    return this.http.getAll('/tasks').pipe(map((tasks: Task[]) => tasks.filter((task: Task) => task.description.includes(filterValue))));
  }

  public createTask(task: Task): Observable<Task> {
    return this.http.create('/tasks', task);
  }

  public updateTask(task: Task, taskId: string): Observable<Task> {
    return this.http.update('/tasks', taskId, task);
  }

  public deleteTask(id: string): Observable<Task> {
    return this.http.delete('/tasks', id);
  }

}
