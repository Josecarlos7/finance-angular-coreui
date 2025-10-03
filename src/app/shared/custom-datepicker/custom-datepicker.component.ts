import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-datepicker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-datepicker.component.html',
  styleUrl: './custom-datepicker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDatepickerComponent),
      multi: true
    }
  ]
})
export class CustomDatepickerComponent implements ControlValueAccessor {
  @Input() placeholder: string = 'Seleccionar fecha';
  @Input() minDate?: Date;
  @Input() maxDate?: Date;

  @Output() dateChange = new EventEmitter<Date>();

  isOpen = false;
  selectedDate: Date | null = null;

  // Variables para el calendario
  currentDate: Date = new Date();
  currentMonth: number = this.currentDate.getMonth();
  currentYear: number = this.currentDate.getFullYear();

  daysInMonth: Date[] = [];
  weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  private onChange = (value: any) => { };
  private onTouched = () => { };

  constructor() {
    this.generateCalendar();
  }

  // ControlValueAccessor methods
  writeValue(value: Date): void {
    this.selectedDate = value;
    if (value) {
      this.currentMonth = value.getMonth();
      this.currentYear = value.getFullYear();
      this.generateCalendar();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Generar días del mes actual
  generateCalendar(): void {
    this.daysInMonth = [];

    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

    // Días del mes anterior (para completar la primera semana)
    const startingDayOfWeek = firstDay.getDay();
    for (let i = 0; i < startingDayOfWeek; i++) {
      const date = new Date(this.currentYear, this.currentMonth, -i);
      this.daysInMonth.unshift(date);
    }

    // Días del mes actual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      this.daysInMonth.push(new Date(this.currentYear, this.currentMonth, i));
    }

    // Días del próximo mes (para completar la última semana)
    const remainingDays = 42 - this.daysInMonth.length; // 6 semanas
    for (let i = 1; i <= remainingDays; i++) {
      this.daysInMonth.push(new Date(this.currentYear, this.currentMonth + 1, i));
    }
  }

  // Navegación del calendario
  previousMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }

  // Seleccionar fecha
  selectDate(date: Date): void {
    // Solo permitir seleccionar días del mes actual
    if (date.getMonth() === this.currentMonth) {
      this.selectedDate = date;
      this.isOpen = false;

      this.onChange(date);
      this.onTouched();
      this.dateChange.emit(date);
    }
  }

  // Verificar si es hoy
  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  // Verificar si está seleccionado
  isSelected(date: Date): boolean {
    if (!this.selectedDate) return false;
    return date.toDateString() === this.selectedDate.toDateString();
  }

  // Verificar si es del mes actual
  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentMonth;
  }

  // Formatear fecha para display
  getDisplayValue(): string {
    if (!this.selectedDate) return this.placeholder;

    return this.selectedDate.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  // Toggle calendario
  toggleCalendar(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.generateCalendar();
    }
  }

  // Cerrar calendario
  closeCalendar(): void {
    this.isOpen = false;
  }
  
  selectToday(): void {
    const today = new Date();
    this.selectDate(today);
  }
}
