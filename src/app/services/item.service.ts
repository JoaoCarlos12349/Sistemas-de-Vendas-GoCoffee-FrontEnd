import { Injectable } from '@angular/core';
import { appSettings } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { ItemPedido } from '../models/item-pedido';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = `${appSettings.apiBaseUrl}/itens-pedido`;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  listar(): Observable<ItemPedido[]> {
    return this.http.get<ItemPedido[]>(this.apiUrl, this.loginService.gerarCabecalhoHTTP());
  }

  salvar(item: ItemPedido): Observable<ItemPedido> {
    if (item.id) {
      return this.http.put<ItemPedido>(`${this.apiUrl}/${item.id}`, item, this.loginService.gerarCabecalhoHTTP());
    } else {
      return this.http.post<ItemPedido>(this.apiUrl, item, this.loginService.gerarCabecalhoHTTP());
    }
  }
  
  buscarPorId(id: number): Observable<ItemPedido> {
    return this.http.get<ItemPedido>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
  }
}
