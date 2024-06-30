import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() task: Task | undefined;
  @Output() editHandler: EventEmitter<Task> = new EventEmitter();
  @Output() deleteHandler: EventEmitter<Task> = new EventEmitter();


  edit(task: Task | undefined): void {
    this.editHandler.emit(task)
  }
  delete(task: Task | undefined): void {
    this.deleteHandler.emit(task);
  }

}
