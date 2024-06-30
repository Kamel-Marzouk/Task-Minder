import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../../components/task-dialog/task-dialog.component';
import { TaskService } from '../../services/task.service';
import { GeneralDialogComponent } from 'src/app/shared/components/general-dialog/general-dialog.component';
import { SnakBarService } from 'src/app/shared/services/snak-bar.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = this.taskService.allTasks;
  noDataFound: boolean = false;
  searchValue: string = '';

  constructor(
    private tasksService: TasksService,
    private taskService: TaskService,
    private snackBarService: SnakBarService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getAllTasks();
    this.onUpdateTasks();
  }

  private getAllTasks(): void {
    this.noDataFound = false;
    this.tasksService.getAllTasks().subscribe((tasks: Task[]) => {
      this.taskService.updateTasks(tasks);
      this.updataTasks(tasks);
    })
  }

  private onUpdateTasks(): void {
    this.taskService.tasks.subscribe((tasks: Task[]) => this.updataTasks(tasks));
  }

  private updataTasks(data: Task[]): void {
    this.noDataFound = !data.length;
    if (!data) return;
    this.tasks = data;
  }

  public editTask(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: "480px",
      data: task,
    });
    const instance = dialogRef.componentInstance;
    instance.title = "edit";
    instance.task = task;
  }

  public newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: "480px",
    });
    const instance = dialogRef.componentInstance;
    instance.title = "add";
  }

  public deleteTask(task: Task): void {
    console.log(task);
    const dialogRef = this.dialog.open(GeneralDialogComponent, {
      width: "480px",
      data: task,
    });
    const instance = dialogRef.componentInstance;
    instance.title = this.translate.instant("generalDialog.deleteTask");
    instance.textMessage = this.translate.instant("generalDialog.confirmDeleteTask");
    instance.iconSrc = "assets/icons/delete.svg";

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.deleteTaskById(result.id);
    });
  }

  private deleteTaskById(taskId: string): void {
    this.tasksService.deleteTask(taskId).subscribe(() => {
      this.taskService.deleteTask(taskId);
      this.snackBarService.openSnackBar(this.translate.instant("generalDialog.successDelete"), this.translate.instant("generalDialog.task"));
    }, () => {
      this.snackBarService.openSnackBar(this.translate.instant("generalDialog.errorDeleteMessage"), this.translate.instant("generalDialog.error"));
    })
  }

  public onKey(event: KeyboardEvent): void {
    const searchValue = (event.target as HTMLInputElement).value;
    this.searchValue = searchValue;
    this.getFilterTasks(searchValue);
  }

  private getFilterTasks(searchValue: string): void {
    this.tasksService.getFilterTasks(searchValue).subscribe((tasks) => {
      this.taskService.updateTasks(tasks);
      this.updataTasks(tasks);
    });
  }

  public clearSearch(): void {
    this.getAllTasks();
    this.onUpdateTasks();
    this.searchValue = "";
  }

}

