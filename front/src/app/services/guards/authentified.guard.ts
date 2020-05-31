import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { CanLoad, CanActivate, Router, RouterStateSnapshot, UrlSegment, Route, ActivatedRouteSnapshot } from '@angular/router';





@Injectable({
  providedIn: 'root'
})
export class Helper {
  private c: boolean = false;
  sub: Subscription;
  constructor(private store: Store<{ user: any }>) {
    this.sub = this.store.select('user').subscribe(user => {
      this.c = user.isAuthentified;
    })

  }
  get connected(): boolean { return this.c; }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}


@Injectable({
  providedIn: 'root'
})
export class UserLoadService implements CanLoad {
  state;
  constructor(private helper: Helper, private router: Router) {
  this.state=this.router.routerState.snapshot;

  }

  canLoad(route: Route,segment:UrlSegment[]): boolean {
    if (this.helper.connected)
      return true;
      if (!this.state.url.includes('return=')){
        this.router.navigate(['/login'], {
          queryParams: {
            return: segment.map(x=>x.path).join('/')
          }
        });
      }else{
        this.router.navigate(['/login']);
      }
    return false;
  }
}




@Injectable({
  providedIn: 'root'
})
export class UserActivateService implements CanActivate {
  constructor(private helper: Helper, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.helper.connected)return true;
    this.router.navigate(['/login'], {
      queryParams: {
        return: state.url
      }
    });
    return false;
  }
}
