import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuctionService } from '../../../core/auction/auction.service';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({ selector: 'app-create-auction', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink, Navbar], templateUrl: './create-auction.html' })
export class CreateAuction {
  private fb = inject(FormBuilder);
  private auctionService = inject(AuctionService);
  private router = inject(Router);
  loading = signal(false);
  errorMessage = signal<string | null>(null);

  form = this.fb.group({
    name: ['', [Validators.required]],
    maxPlayersPerTeam: [25, [Validators.required, Validators.min(1)]],
    maxGoalkeepers: [3, [Validators.required, Validators.min(0)]],
    maxDefenders: [8, [Validators.required, Validators.min(0)]],
    maxMidfielders: [8, [Validators.required, Validators.min(0)]],
    maxForwards: [6, [Validators.required, Validators.min(0)]],
    initialCredits: [500, [Validators.required, Validators.min(1)]]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);
    const raw = this.form.getRawValue();
    this.auctionService.create({
      name: raw.name!,
      maxPlayersPerTeam: Number(raw.maxPlayersPerTeam),
      maxGoalkeepers: Number(raw.maxGoalkeepers),
      maxDefenders: Number(raw.maxDefenders),
      maxMidfielders: Number(raw.maxMidfielders),
      maxForwards: Number(raw.maxForwards),
      initialCredits: Number(raw.initialCredits)
    }).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.status === 401 ? 'Sessione scaduta, effettua di nuovo il login.' : `Errore durante la creazione dell'asta (${err.status || 'rete'}).`);
      }
    });
  }
}
