import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { UsuariosService } from '../../services/usuarios.services';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss'
})
export class Usuarios implements OnInit {
  // Modelo do formulário (bind com ngModel)
  usuario: Usuario = {
    nomeCompleto: '',
    dataNascimento: '',
    nomeMae: '',
    nomePai: '',
    cpf: ''
  };

  // Lista para mostrar usuários cadastrados
  usuarios: Usuario[] = [];

  // Controla se estamos editando um usuário existente
  editandoId: number | null = null;

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    // Ao abrir a tela, já busca os usuários
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuariosService.buscarTodos().subscribe({
      next: (lista) => this.usuarios = lista,
      error: (err) => console.error('Erro ao buscar usuários', err)
    });
  }

  salvar(): void {
    // Se estiver editando, chama PUT; senão, chama POST
    if (this.editandoId) {
      const payload: Usuario = { ...this.usuario, id: this.editandoId };

      this.usuariosService.atualizar(payload).subscribe({
        next: () => {
          this.resetarFormulario();
          this.carregarUsuarios();
        },
        error: (err) => console.error('Erro ao atualizar usuário', err)
      });
      return;
    }

    this.usuariosService.cadastrar(this.usuario).subscribe({
      next: () => {
        this.resetarFormulario();
        this.carregarUsuarios();
      },
      error: (err) => console.error('Erro ao cadastrar usuário', err)
    });
  }

  editar(u: Usuario): void {
    // Preenche o formulário com os dados do usuário selecionado
    this.editandoId = u.id ?? null;
    this.usuario = {
      nomeCompleto: u.nomeCompleto,
      dataNascimento: u.dataNascimento,
      nomeMae: u.nomeMae,
      nomePai: u.nomePai,
      cpf: u.cpf
    };
  }

  remover(id?: number): void {
    if (!id) return;

    this.usuariosService.deletar(id).subscribe({
      next: () => this.carregarUsuarios(),
      error: (err) => console.error('Erro ao deletar usuário', err)
    });
  }

  resetarFormulario(): void {
    // Volta o formulário para “novo cadastro”
    this.editandoId = null;
    this.usuario = {
      nomeCompleto: '',
      dataNascimento: '',
      nomeMae: '',
      nomePai: '',
      cpf: ''
    };
  }
}
