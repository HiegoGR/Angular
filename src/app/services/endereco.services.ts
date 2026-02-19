import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, catchError } from 'rxjs';
import { IbgeEstado, EnderecoModel, ViaCepResponse} from '../pages/models/endereco.model';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  // Cache da lista de estados (carrega uma vez e reaproveita)
  private estados$?: Observable<IbgeEstado[]>;

  constructor(private http: HttpClient) {}

  // Consulta CEP no ViaCEP
  buscarCep(cep: string): Observable<ViaCepResponse> {
    return this.http.get<ViaCepResponse>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  // Busca lista de estados no IBGE (e guarda em cache)
  buscarEstadosIbge(): Observable<IbgeEstado[]> {
    if (!this.estados$) {
      this.estados$ = this.http
        .get<IbgeEstado[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .pipe(
          // evita quebrar a tela se der erro de rede
          catchError(() => of([] as IbgeEstado[])),
          // cacheia para não chamar toda hora
          shareReplay(1)
        );
    }
    return this.estados$;
  }
}