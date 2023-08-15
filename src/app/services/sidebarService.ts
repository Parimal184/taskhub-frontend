import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  constructor(private router: Router) {}

  shouldShowSidebar(): boolean {
    const excludedRoutes = ['/login', '/signup'];
    return !excludedRoutes.includes(this.router.url);
  }
}
