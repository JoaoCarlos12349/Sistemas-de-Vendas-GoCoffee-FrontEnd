import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Token } from '../../models/token';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  formGroup: FormGroup;
  token: Token;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      login: ['', Validators.required],
      senha: ['', Validators.required],
    });

    this.token = new Token();
  }
  ngOnInit(): void {
    this.loginService.limparToken();
  }
  onSubmit(): void {
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;

      this.loginService.autenticar(formValue.login, formValue.senha).subscribe({
        next: (resposta) => {
          this.token = resposta;
          this.loginService.salvarToken(this.token.acessToken);
          this.router.navigate(['/cardapio']);
        },
        error: (err) => {
          alert('Login ou senha inválidos.');
        },
      });
    }
  }
}
