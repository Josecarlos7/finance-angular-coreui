import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDecimalOnly]',
  standalone: true
})
export class DecimalOnlyDirective {
  // Regex para números con un decimal opcional
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,1}$/g);
  // Caracteres especiales permitidos
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'];
  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Permitir teclas especiales
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);

    // Validar con regex
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Validar formato final
    if (value && !value.match(/^\d+(\.\d{0,1})?$/)) {
      input.value = value.slice(0, -1);
    }
  }

}
