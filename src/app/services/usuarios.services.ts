import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  buscarTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/buscar/usuario`);
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/cadastrar/usuario`, usuario);
  }

  atualizar(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/atualizar/usuario`, usuario);
  }

  buscarPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/buscar/usuario/${id}`);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/buscar/usuario/${id}`);
  }
}
