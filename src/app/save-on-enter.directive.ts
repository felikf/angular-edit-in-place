import { Directive, HostListener } from '@angular/core';
import { EditableComponent } from './editable/editable.component';

@Directive({
  selector: '[appSaveOnEnter]'
})
export class SaveOnEnterDirective {

  constructor(private editable: EditableComponent) { }

  @HostListener('keyup.enter')
  saveOnEnter(): void {
    this.editable.toViewMode();
  }

}
