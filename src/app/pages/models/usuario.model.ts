// Representa o formato do usuário que o frontend envia/recebe do backend
export interface Usuario {
  id?: number;              // id opcional (vem do backend)
  nomeCompleto: string;
  dataNascimento: string;   // pode ser 'YYYY-MM-DD'
  nomeMae: string;
  nomePai: string;
  cpf: string;
}