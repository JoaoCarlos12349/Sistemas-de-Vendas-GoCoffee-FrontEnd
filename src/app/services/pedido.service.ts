import { Injectable } from '@angular/core';
import { appSettings } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = `${appSettings.apiBaseUrl}/pedidos`;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  listar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl, this.loginService.gerarCabecalhoHTTP());
  }

  salvar(pedido: Pedido): Observable<Pedido> {
    if (pedido.id) {
      return this.http.put<Pedido>(`${this.apiUrl}/${pedido.id}`, pedido, this.loginService.gerarCabecalhoHTTP());
    } else {
      return this.http.post<Pedido>(this.apiUrl, pedido, this.loginService.gerarCabecalhoHTTP());
    }
  }

  buscarPorId(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
  }  
}
