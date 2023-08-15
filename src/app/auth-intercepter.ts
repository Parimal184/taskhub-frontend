import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserDetails } from "./modal/user-details";

export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let user:UserDetails = JSON.parse(localStorage.getItem('user')!);
        console.log("from task user:", user)
        if(user && user.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`
                }
            });
        }
        console.log("URL ::", request.url);
        return next.handle(request);
    }
}