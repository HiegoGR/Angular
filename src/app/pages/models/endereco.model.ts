// Modelo do Endereço usado no formulário
export interface EnderecoModel {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string; // cidade
  uf: string;         // sigla (ex: SP)
  estado: string;     // nome do estado (ex: São Paulo)
}

// Resposta padrão do ViaCEP (somente campos que vamos usar)
export interface ViaCepResponse {
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean; // quando CEP não existe
}

// Resposta do IBGE para estados
export interface IbgeEstado {
  id: number;
  sigla: string; // UF
  nome: string;  // Nome do estado
}
