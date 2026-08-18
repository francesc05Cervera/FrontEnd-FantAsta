import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { AuctionService } from '../../core/auction/auction.service';
import { AuctionResponse } from '../../models/auction.models';

@Component({ selector: 'app-dashboard', standalone: true, imports: [CommonModule, RouterLink, Navbar], templateUrl: './dashboard.html' })
export class Dashboard implements OnInit {
  private auctionService = inject(AuctionService);
  auctions = signal<AuctionResponse[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.auctionService.getMyAuctions().subscribe({
      next: (data) => {
        this.auctions.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Impossibile caricare le tue aste.');
        this.loading.set(false);
      }
    });
  }
}
