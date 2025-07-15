import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html'
})
export class PedidoListComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.getAllPedidos();
  }

  getAllPedidos(): void {
    this.pedidoService.listar().subscribe((data) => {
      this.pedidos = data;
    });
  }
}
