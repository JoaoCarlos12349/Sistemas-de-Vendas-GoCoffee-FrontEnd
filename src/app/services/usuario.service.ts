import { Injectable } from '@angular/core';
import { appSettings } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = `${appSettings.apiBaseUrl}/usuarios`;

  constructor(private http: HttpClient, private loginService: LoginService) {}

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(
      this.apiUrl,
      this.loginService.gerarCabecalhoHTTP()
    );
  }

  salvar(usuario: Usuario): Observable<Usuario> {   
    return this.http.post<Usuario>(
      this.apiUrl,
      usuario,
      this.loginService.gerarCabecalhoHTTP()
    );
  }

  buscarPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(
      `${this.apiUrl}/${id}`,
      this.loginService.gerarCabecalhoHTTP()
    );
  }
}
