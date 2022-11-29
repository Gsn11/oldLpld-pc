import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * 路由守卫
 * 检查是否登录
 */
@Injectable({
    providedIn: 'root'
})
export class CheckLogin implements CanActivate {
    constructor(
        private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (localStorage.getItem('LOGINSTATES') === 'islogin') {
            this.router.navigate(['index/home']);
            return false;
        } else {
            return true;
        }
    }

}
