import {CanActivateFn, Router} from '@angular/router';
import {AccountService} from "../_services/account.service";
import {inject} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {map} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);
  const router = inject(Router);

  return accountService.currentUser$.pipe(
    map(user => {
      if (user) return true;
      else {
        toastr.error("You are not logged in to enter this page");
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
