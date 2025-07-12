import { TestBed } from '@angular/core/testing';

import { ResgatePontuacaoService } from './resgate-pontuacao.service';

describe('ResgatePontuacaoService', () => {
  let service: ResgatePontuacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResgatePontuacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
