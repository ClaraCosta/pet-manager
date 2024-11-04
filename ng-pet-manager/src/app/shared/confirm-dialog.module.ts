// src/app/shared/confirm-dialog.module.ts
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [ConfirmDialogComponent]
})
export class ConfirmDialogModule {}
