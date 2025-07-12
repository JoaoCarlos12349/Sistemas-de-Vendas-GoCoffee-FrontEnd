import { Injectable } from '@angular/core';
import { appSettings } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = `${appSettings.apiBaseUrl}/produtos`;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl, this.loginService.gerarCabecalhoHTTP());
  }

  salvar(produto: Produto): Observable<Produto> {
    if (produto.id) {
      return this.http.put<Produto>(`${this.apiUrl}/${produto.id}`, produto, this.loginService.gerarCabecalhoHTTP());
    } else {
      return this.http.post<Produto>(this.apiUrl, produto, this.loginService.gerarCabecalhoHTTP());
    }
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
  }
}
