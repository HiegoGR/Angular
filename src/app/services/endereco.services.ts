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

  // ✅ Troque para o host do seu backend
  private baseUrl = 'http://localhost:8080';

  // ---------- EXTERNOS (ViaCEP / IBGE) ----------
  buscarCep(cep: string): Observable<ViaCepResponse> {
    return this.http.get<ViaCepResponse>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  buscarEstadosIbge(): Observable<IbgeEstado[]> {
    if (!this.estados$) {
      this.estados$ = this.http
        .get<IbgeEstado[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .pipe(
          catchError(() => of([] as IbgeEstado[])),
          shareReplay(1)
        );
    }
    return this.estados$;
  }

  // ---------- BACKEND (CRUD ENDEREÇO) ----------
  criarEndereco(payload: EnderecoModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/endereco`, payload);
  }

  atualizarEndereco(payload: EnderecoModel): Observable<any> {
    return this.http.put(`${this.baseUrl}/atualizar/endereco`, payload);
  }

  listarEnderecos(): Observable<EnderecoModel[]> {
    return this.http.get<EnderecoModel[]>(`${this.baseUrl}/buscar/endereco`);
  }

  buscarEnderecoPorId(id: number): Observable<EnderecoModel> {
    return this.http.get<EnderecoModel>(`${this.baseUrl}/buscar/endereco/${id}`);
  }

  deletarEndereco(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/endereco/${id}`);
  }

}
