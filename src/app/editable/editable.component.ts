import { Component, ContentChild, ElementRef, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { ViewModeDirective } from './view-mode.directive';
import { EditModeDirective } from './edit-mode.directive';
import { fromEvent, Subject } from 'rxjs';
import { filter, switchMapTo, take, tap } from 'rxjs/operators';

type MODE = 'view' | 'edit';

@Component({
  selector: 'app-editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.css']
})
export class EditableComponent implements OnInit {

  @Output() update = new EventEmitter();

  @ContentChild(ViewModeDirective, { static: true }) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective, { static: true }) editModeTpl: EditModeDirective;

  mode: MODE = 'view';
  private editModeSubject = new Subject<boolean>();
  private editMode$ = this.editModeSubject.asObservable();

  constructor(private host: ElementRef) { }

  get currentView(): TemplateRef<any> {
    return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
  }

  ngOnInit(): void {
    this.viewModeHandler();
    this.editModeHandler();
  }

  private viewModeHandler() {
    fromEvent(this.element.nativeElement, 'dblclick')
      .subscribe(() => {
        this.mode = 'edit';
        this.editModeSubject.next(true);
      });
  }

  private editModeHandler() {
    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({target}) => this.element.nativeElement.contains(target) === false),
      take(1),
      tap(() => console.log('clickOutside$ fires'))
    );

    this.editMode$.pipe(
      tap(() => console.log('edit fires')),
      switchMapTo(clickOutside$),
      tap(() => console.log('after switchMapTo fires')),
    ).subscribe(event => {
      this.update.next();
      this.mode = 'view';
    });
  }

  private get element(): ElementRef {
    return this.host;
  }
}
