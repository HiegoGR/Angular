import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnderecoService } from '../../services/endereco.services';
import { EnderecoModel, IbgeEstado } from '../models/endereco.model';

@Component({
  selector: 'app-endereco',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './endereco.html',
  styleUrl: './endereco.scss',
})
export class Endereco implements OnInit {
  // Modelo do formulário (bind com ngModel)
  endereco: EnderecoModel = {
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
    estado: '',
  };

  // Lista de estados carregada do IBGE
  estados: IbgeEstado[] = [];

  // Flags para UX
  carregandoCep = false;
  erroCep: string | null = null;

  constructor(
    private enderecoService: EnderecoService,
    private cdr: ChangeDetectorRef //força a tela atualizar imediatamente
  ) {}

  ngOnInit(): void {
    // Carrega a lista de estados logo ao abrir a tela (1 vez)
    this.enderecoService.buscarEstadosIbge().subscribe({
      next: (lista) => (this.estados = lista),
      error: () => (this.estados = []),
    });
  }

  pesquisarCep(): void {
    // Limpa mensagem de erro anterior
    this.erroCep = null;

    // Remove tudo que não for número (usuário pode digitar 12.345-678)
    const cepSomenteNumeros = (this.endereco.cep || '').replace(/\D/g, '');

    // Validação simples de CEP (8 dígitos)
    if (cepSomenteNumeros.length !== 8) {
      this.erroCep = 'CEP inválido. Digite 8 números.';
      return;
    }

    this.carregandoCep = true;

    // Chama ViaCEP e preenche os campos
    this.enderecoService.buscarCep(cepSomenteNumeros).subscribe({
      next: (res) => {
        this.carregandoCep = false;

        // ViaCEP retorna { erro: true } quando CEP não existe
        if (res.erro) {
          this.erroCep = 'CEP não encontrado.';
          this.cdr.detectChanges();
          return;
        }

        // Preenche campos retornados pelo ViaCEP
        
        this.endereco.cep = (res.cep ?? cepSomenteNumeros).replace(/\D/g, '');
        this.endereco.logradouro = res.logradouro ?? '';
        this.endereco.complemento = res.complemento ?? '';
        this.endereco.bairro = res.bairro ?? '';
        this.endereco.localidade = res.localidade ?? '';
        this.endereco.uf = res.uf ?? '';

        // A partir da UF (sigla), busca o nome do estado via lista do IBGE
        const estadoEncontrado = this.estados.find(
          (e) => e.sigla?.toUpperCase() === (this.endereco.uf || '').toUpperCase()
        );

        // Se encontrou, preenche o campo "estado" com o nome
        this.endereco.estado = estadoEncontrado?.nome ?? '';

        // ✅ força a tela atualizar imediatamente (sem precisar clicar fora)
        this.cdr.detectChanges();
      },
      error: () => {
        this.carregandoCep = false;
        this.erroCep = 'Erro ao consultar CEP. Tente novamente.';
        this.cdr.detectChanges();
      },
    });
  }

  limpar(): void {
    // Limpa o formulário
    this.erroCep = null;
    this.endereco = {
      cep: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      localidade: '',
      uf: '',
      estado: '',
    };
  }

  salvar(): void {
    // Aqui você ainda não passou endpoints de salvar endereço.
    // Por enquanto vamos só mostrar no console.
    console.log('Endereço para salvar:', this.endereco);
    alert('Endereço pronto! (por enquanto só exibindo no console)');
  }
}
