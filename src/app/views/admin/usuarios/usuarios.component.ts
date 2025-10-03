import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, RowComponent } from '@coreui/angular';
import { CommonModule } from '@angular/common'; // ← AÑADIR ESTO
import { CustomDatepickerComponent } from 'src/app/shared/custom-datepicker/custom-datepicker.component';


@Component({
  selector: 'app-usuarios',
  imports: [
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ButtonDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    ReactiveFormsModule,
    FormsModule,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    CommonModule,
    CustomDatepickerComponent
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  public visible = false;

  miFecha: Date = new Date();

  abrirModalRegistro() {
    this.visible = !this.visible;
  }
  
  handleAbrirModalRegistro(event: any) {
    this.visible = event;
  }
  
  onDateChange(fecha: Date) {
    console.log('Fecha seleccionada:', fecha);
  }

}
