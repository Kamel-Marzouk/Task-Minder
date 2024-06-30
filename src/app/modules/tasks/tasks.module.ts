import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './pages/tasks/tasks.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TasksService } from './services/tasks.service';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    TasksComponent,
    TaskCardComponent,
    TaskDialogComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TasksRoutingModule,
    FormsModule
  ],
  providers: [
    TasksService
  ]
})
export class TasksModule { }
