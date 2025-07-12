import { Injectable } from '@angular/core';
import { appSettings } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { ResgatePontuacao } from '../models/resgate-pontuacao';

@Injectable({
  providedIn: 'root'
})
export class ResgatePontuacaoService {

  private apiUrl = `${appSettings.apiBaseUrl}/situacoes-pedido`;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  listar(): Observable<ResgatePontuacao[]> {
    return this.http.get<ResgatePontuacao[]>(this.apiUrl, this.loginService.gerarCabecalhoHTTP());
  }

  salvar(resgate: ResgatePontuacao): Observable<ResgatePontuacao> {
    if (resgate.id) {
      return this.http.put<ResgatePontuacao>(`${this.apiUrl}/${resgate.id}`, resgate, this.loginService.gerarCabecalhoHTTP());
    } else {
      return this.http.post<ResgatePontuacao>(this.apiUrl, resgate, this.loginService.gerarCabecalhoHTTP());
    }
  }
  
  buscarPorId(id: number): Observable<ResgatePontuacao> {
    return this.http.get<ResgatePontuacao>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
  }
}
