import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxSpinnerModule} from "ngx-spinner";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ToastrModule} from "ngx-toastr";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {TabsModule} from "ngx-bootstrap/tabs";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxSpinnerModule.forRoot({ type: 'line-scale-party' }),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    PaginationModule.forRoot(),
    TabsModule.forRoot()
  ],
  exports: [
    NgxSpinnerModule,
    BsDropdownModule,
    ToastrModule,
    PaginationModule,
    TabsModule
  ]
})
export class SharedModule { }