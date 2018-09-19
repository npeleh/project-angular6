import {Directive, ElementRef, HostListener, Input, OnInit, DoCheck} from '@angular/core';

@Directive({
  selector: '[appFocusElement]'
})

export class FocusElementDirective implements OnInit, DoCheck {
  @Input('appFocusElement') focus: {};

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    // if (this.focus[this.elementRef.nativeElement.id].state) {
    //   this.elementRef.nativeElement.focus();
    // }
  }

  ngDoCheck() {
    if (this.focus[this.elementRef.nativeElement.id].state) {
      this.elementRef.nativeElement.focus();
    }
  }

  @HostListener('keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.which === 13) {
      this.elementRef.nativeElement.blur();
      this.focus[this.elementRef.nativeElement.id].state = false;
      this.focus[this.focus[this.elementRef.nativeElement.id].next].state = true;
      console.log(this.focus[this.elementRef.nativeElement.id]);
    }
  }

  @HostListener('blur', ['$event']) onBlurHanldler(event: KeyboardEvent) {
    this.focus[this.elementRef.nativeElement.id].state = false;
  }

}
