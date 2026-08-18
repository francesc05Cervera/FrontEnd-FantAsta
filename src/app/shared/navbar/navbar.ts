import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({ selector: 'app-navbar', standalone: true, imports: [CommonModule, RouterLink], templateUrl: './navbar.html' })
export class Navbar {
  private authService = inject(AuthService);
  private router = inject(Router);
  currentUser = this.authService.currentUser;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
