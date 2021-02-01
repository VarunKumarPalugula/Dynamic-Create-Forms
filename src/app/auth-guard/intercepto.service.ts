import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from '@app/auth-guard/authentication.service';
// import { AuthenticationService } from '@app/core/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: any, next: any) {
    const authService: any = this.injector.get(AuthenticationService);
    const tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getBererToken()}`,
      },
    });
    return next.handle(tokenReq);
  }
}
