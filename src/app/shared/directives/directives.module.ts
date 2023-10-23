import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideImg404sDirective } from './hideImg404s.directive';
import { ErrorImageDirective } from './errorImage.directive';

@NgModule({
  declarations: [
    ErrorImageDirective,
    HideImg404sDirective,
  ],
  exports: [
    ErrorImageDirective,
    HideImg404sDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
