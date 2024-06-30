import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnakBarService } from 'src/app/shared/services/snak-bar.service';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { TaskService } from '../../services/task.service';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  title: string = "";
  TaskForm: FormGroup = new FormGroup({});

  constructor(
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private snackBarService: SnakBarService,
    private tasksService: TasksService,
    private taskService: TaskService,
    private translate: TranslateService,
    public translation: TranslationService,
    @Inject(MAT_DIALOG_DATA) public task: Task,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.onDetectPath();
  }

  onSubmit() {
    if (this.TaskForm.invalid) return;
    this.title == 'add' ? this.createTask() : this.updateTask();
  }

  private onDetectPath(): void {
    if (this.title == 'edit') this.TaskForm.reset(this.task);
    else this.title = 'add';
  }

  private initForm(): void {
    this.TaskForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'imgSrc': new FormControl('https://www.google.co.uk/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'),
      'description': new FormControl(null, Validators.required),
    });
  }

  private createTask() {
    this.tasksService.createTask(this.TaskForm.value).subscribe((response: Task) => {
      this.taskService.addTask(response);
      this.dialogRef.close();
      this.snackBarService.openSnackBar(this.translate.instant('taskDialog.successCreate'), this.translate.instant('taskDialog.task'));
    }, (error: any) => {
      this.snackBarService.openSnackBar(error, this.translate.instant('taskDialog.error'));
    })
  }

  private updateTask() {
    this.tasksService.updateTask(this.TaskForm.value, this.task.id).subscribe((response: Task) => {
      this.taskService.updatetask(response);
      this.snackBarService.openSnackBar(this.translate.instant('taskDialog.successUpdate'), this.translate.instant('taskDialog.task'));
      this.dialogRef.close();
    }, (error: any) => {
      this.snackBarService.openSnackBar(error, this.translate.instant('taskDialog.error'));
    })
  }

}
