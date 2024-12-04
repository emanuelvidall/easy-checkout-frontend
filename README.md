# Frontend Project / Projeto Frontend

## Description / Descrição

This project is a frontend application for creating/managing products and their payments.  
Este projeto é uma aplicação frontend para criação/gestão de produtos e seus pagamentos.

The payments are done with QRCode PIX generated via MercadoPago gateway, which comunicates with the backend project.
Os pagamentos são feitos através de QRCode PIX gerado pelo gateway do MercadoPago, que comunica-se com o projeto backend.

---

## Technologies and Libraries / Tecnologias e Bibliotecas

The project uses the following technologies and libraries:  
O projeto utiliza as seguintes tecnologias e bibliotecas:

- **Next.js**: React framework for server-side rendering and static site generation / Framework React para renderização do lado do servidor e geração de sites estáticos
- **ShadCN**: Component library for accessible and customizable UI components / Biblioteca de componentes para uma interface acessível e personalizável
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development / Framework CSS utilitário para desenvolvimento rápido de UI
- **Apollo Client**: GraphQL client for efficient data fetching and caching / Cliente GraphQL para busca e cache eficientes de dados
- **TypeScript**: Strongly-typed language for enhanced code quality / Linguagem fortemente tipada para maior qualidade de código
- **ESLint & Prettier**: Code linting and formatting tools / Ferramentas de linting e formatação de código

---

## Project Structure / Estrutura do Projeto

The project follows a modular structure for better maintainability:  
O projeto segue uma estrutura modular para melhor manutenção:

- `src/components`: Reusable UI components / Componentes reutilizáveis de interface do usuário
- `src/pages`: Page components mapped to routes / Componentes de página mapeados para rotas
- `src/styles`: Global and modular styling with Tailwind CSS / Estilização global e modular com Tailwind CSS
- `src/services`: API service integration using Apollo Client / Integração de serviços API com Apollo Client
- `src/utils`: Helper functions and utilities / Funções auxiliares e utilitários

---

## Getting Started / Começando

### Prerequisites / Pré-requisitos

Ensure you have the following installed:  
Certifique-se de ter o seguinte instalado:

- Node.js (v16 or later) / Node.js (v16 ou superior)
- npm or yarn package manager / Gerenciador de pacotes npm ou yarn

---

### Installation / Instalação

Clone the repository and install dependencies:  
Clone o repositório e instale as dependências:

```bash
git clone <repository-url>
cd <project-directory>
npm install
```

---

### Running the Application / Executando a Aplicação

Start the development server:  
Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.  
A aplicação estará disponível em `http://localhost:3000`.

---

### Building for Production / Criando para Produção

Create an optimized build:  
Crie uma build otimizada:

```bash
npm run build
```

Start the production server:  
Inicie o servidor de produção:

```bash
npm start
```

---
