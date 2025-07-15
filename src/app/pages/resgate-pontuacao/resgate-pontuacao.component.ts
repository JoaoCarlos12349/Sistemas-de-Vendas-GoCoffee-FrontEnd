import { Component, OnInit } from '@angular/core';
import { ResgatePontuacaoService } from '../../services/resgate-pontuacao.service';
import { ResgatePontuacao } from '../../models/resgate-pontuacao';



@Component({
  selector: 'app-resgate-pontuacao',
  templateUrl: './resgate-pontuacao.component.html'
})
export class ResgatePontuacaoComponent implements OnInit {
  resgates: ResgatePontuacao[] = [];

  constructor(private resgatePontuacaoService: ResgatePontuacaoService) {}

  ngOnInit(): void {
    this.getAllResgates();
  }

  getAllResgates(): void {
    this.resgatePontuacaoService.listar().subscribe((data) => {
      this.resgates = data;
    });
  }
}
