import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {User} from "../_model/user.model";
import {AccountService} from "../_services/account.service";
import {take} from "rxjs";

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit{
  @Input() appHasRole: string[] = [];
  user: User | undefined;

  constructor(private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) this.user = user;
      }
    });
  }

  ngOnInit() {
    // this.accountService.currentUser$.pipe(take(1)).subscribe({
    //   next: user => {
    //     if (user) {
    //       this.user = user;
    //     }
    //   }
    // });
    if (this.user?.roles.some(r => this.appHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

}
