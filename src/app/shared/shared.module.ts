import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './services/http.service';
import { AngularMatrialModule } from './modules/angular-matrial.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NoDataFoundComponent } from './components/no-data-found/no-data-found.component';
import { GeneralDialogComponent } from './components/general-dialog/general-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

const components: any[] = [InputComponent, SpinnerComponent, NoDataFoundComponent, GeneralDialogComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMatrialModule,
    TranslateModule
  ],
  exports: [
    AngularMatrialModule,
    ReactiveFormsModule,
    TranslateModule,
    ...components
  ],
  providers: [
    HttpService
  ]
})
export class SharedModule { }
