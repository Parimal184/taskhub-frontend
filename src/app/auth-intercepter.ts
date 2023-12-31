import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { UserDetails } from "./modal/user-details";
import { ModalService } from "./services/modal.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "./services/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private modalService: ModalService, private router: Router, private userService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let user: UserDetails = JSON.parse(localStorage.getItem('user')!);
        if (user && user.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`
                }
            });
        }

        let url = request.url;
        if (url.includes('login') || url.includes('signup')) {
            return next.handle(request);
        } else {
            return next.handle(request).pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        this.userService.removeLoginUser();
                        this.router.navigate(['/login']);
                    }
                    return throwError(error);
                })
            );
        }
    }
}