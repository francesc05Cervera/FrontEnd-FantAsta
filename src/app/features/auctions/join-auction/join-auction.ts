import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuctionService } from '../../../core/auction/auction.service';
import { AuctionResponse } from '../../../models/auction.models';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-join-auction',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, Navbar],
  templateUrl: './join-auction.html'
})
export class JoinAuction {
  private fb = inject(FormBuilder);
  private auctionService = inject(AuctionService);
  private router = inject(Router);

  lookupLoading = signal(false);
  joinLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  foundAuction = signal<AuctionResponse | null>(null);

  form = this.fb.group({
    auctionCode: ['', [Validators.required, Validators.maxLength(20)]]
  });

  search(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.lookupLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.foundAuction.set(null);

    const code = this.form.getRawValue().auctionCode!.trim().toUpperCase();
    this.auctionService.findByCode(code).subscribe({
      next: (auction) => {
        this.foundAuction.set(auction);
        this.lookupLoading.set(false);
      },
      error: (err) => {
        this.lookupLoading.set(false);
        this.errorMessage.set(err.status === 404
          ? 'Nessuna asta trovata con questo codice.'
          : 'Impossibile cercare l’asta. Riprova più tardi.');
      }
    });
  }

  join(): void {
    const auction = this.foundAuction();
    if (!auction) return;

    if (auction.status && auction.status !== 'OPEN') {
      this.errorMessage.set('Questa asta non è aperta alle richieste di partecipazione.');
      return;
    }

    this.joinLoading.set(true);
    this.errorMessage.set(null);
    this.auctionService.join(auction.id).subscribe({
      next: () => {
        this.joinLoading.set(false);
        this.successMessage.set('Richiesta inviata con successo.');
        setTimeout(() => this.router.navigate(['/dashboard']), 900);
      },
      error: (err) => {
        this.joinLoading.set(false);
        this.errorMessage.set(err.status === 409
          ? 'Hai già inviato una richiesta o partecipi già a questa asta.'
          : err.status === 401
            ? 'Sessione scaduta. Effettua nuovamente il login.'
            : 'Non è stato possibile inviare la richiesta di partecipazione.');
      }
    });
  }
}
