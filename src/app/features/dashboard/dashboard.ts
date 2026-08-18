import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';

@Component({ selector: 'app-dashboard', standalone: true, imports: [CommonModule, RouterLink, Navbar], templateUrl: './dashboard.html' })
export class Dashboard {}
