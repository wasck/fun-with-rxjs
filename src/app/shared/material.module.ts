import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

const imps = [
  MatCardModule,
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatToolbarModule
];

const exports = imps;

@NgModule({
  declarations: [],
  imports: [CommonModule, ...imps],
  exports
})
export class MaterialModule { }
