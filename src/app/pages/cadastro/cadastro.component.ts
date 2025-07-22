import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../models/pessoa';
import { LoginService } from '../../services/login.service';
import { Token } from '../../models/token';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroComponent {
  formGroup: FormGroup;
  mensagemErroLogin: string;
  token: Token;

  constructor(
    private formBuilder: FormBuilder,
    private Usuarioservice: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private pessoaService: PessoaService,
    private loginService: LoginService
  ) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      login: ['', Validators.required],
      senha: ['', Validators.required],
      cpf: ['', Validators.required],
    });

    this.mensagemErroLogin = '';
    this.token = new Token();
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.formGroup.valid) {
      const pessoa: any = {
        nome: this.formGroup.get('nome')?.value,
        sexo: '',
        endereco: '',
        cpf: this.formGroup.get('cpf')?.value,
      };

      this.pessoaService.salvar(pessoa).subscribe({
        next: (respostaPessoa: Pessoa) => {
          const usuario: any = {
            login: this.formGroup.get('login')?.value,
            senha: this.formGroup.get('senha')?.value,
            pessoa_id: respostaPessoa.id,
            tipoUsuario: 'CLIENT',
          };

          this.Usuarioservice.salvar(usuario).subscribe({
            next: () => {
              alert('Registro salvo com sucesso!');
              this.formGroup.reset();
              this.router.navigate(['/cardapio']);

              this.loginService
                .autenticar(usuario.login, usuario.senha)
                .subscribe({
                  next: (resposta) => {
                    this.token = resposta;
                    this.loginService.salvarToken(this.token.acessToken);
                  },
                });
            },
            error: () => {
              alert('Erro ao registrar usuário');
            },
          });
        },
        error: () => {
          alert('Usuário já cadastrado');
        },
      });
    }
  }
}
