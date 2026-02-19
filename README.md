# 🧾 Projeto CRUD Angular — Cadastro de Usuários e Endereços

Aplicação web desenvolvida em **Angular 21** com objetivo de demonstrar um CRUD completo (Create, Read, Update, Delete) consumindo APIs REST.

O sistema permite:

- Cadastro de Usuários
- Cadastro de Endereços
- Consulta automática de endereço via **ViaCEP**
- Consulta de nome do Estado via **API IBGE**
- Validação de formulário
- Edição e exclusão de registros
- Navegação entre páginas (Router)
- Interface simples e responsiva

---

## 🚀 Tecnologias utilizadas

- **Angular CLI:** 21.0.1  
- **Angular Framework:** 21.x  
- **Node.js:** 20.19.6 (LTS)  
- **NPM:** 10.8.2  
- **TypeScript:** 5.x  
- **HTML / SCSS**  
- **Standalone Components (Angular Moderno)**  
- **Template Control Flow (@if, @for)**  
- **HTTP Client (REST API)**  

---

## 🌐 Integrações externas

### 📍 ViaCEP
Consulta automática de endereço pelo CEP:

## 📂 Estrutura do Projeto
```
src/app
├── pages
│ ├── usuarios
│ └── endereco
│
├── services
│ ├── usuarios.service.ts
│ └── endereco.service.ts
│
├── models
│ ├── usuario.model.ts
│ └── endereco.model.ts
│
├── layout
│ └── sidebar
│
├── app.routes.ts
└── app.config.ts
```

## ▶️ Como executar o projeto

### 1. Instalar dependências
```npm install ```

### 2. Rodar aplicação
```ng serve -o```
