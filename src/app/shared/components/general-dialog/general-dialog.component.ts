import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-general-dialog',
  templateUrl: './general-dialog.component.html',
  styleUrls: ['./general-dialog.component.scss']
})
export class GeneralDialogComponent {
  title: string = '';
  iconSrc: string = '';
  textMessage: string = '';

  constructor(
    private dialogRef: MatDialogRef<GeneralDialogComponent>,
    public translation: TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() { }

  closeDialog() {
    this.dialogRef.close(undefined);
  }

  confirm(): void {
    this.dialogRef.close(this.data);
  }

}
