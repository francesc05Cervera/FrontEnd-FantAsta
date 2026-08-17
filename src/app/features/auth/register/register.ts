import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html'
})
export class Register {
  loading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  form = this.fb.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.authService
      .register(this.form.getRawValue() as {
        name: string;
        surname: string;
        email: string;
        password: string;
      })
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.successMessage.set('Registrazione completata! Ora puoi accedere.');
          setTimeout(() => this.router.navigate(['/login']), 1200);
        },
        error: (err) => {
          this.loading.set(false);
          this.errorMessage.set(
            err.status === 409
              ? 'Esiste già un account con questa email.'
              : 'Errore durante la registrazione. Riprova più tardi.'
          );
        }
      });
  }
}
