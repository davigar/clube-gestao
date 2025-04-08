# Backend do Sistema de Gestão de Clube

Este é o backend do Sistema de Gestão de Clube, desenvolvido com Node.js, Express e MongoDB.

## Configuração do Ambiente

Para configurar o ambiente de desenvolvimento, siga os passos abaixo:

1. Crie um arquivo `.env` na pasta `backend` com as seguintes variáveis:

```
PORT=53780
MONGODB_URI=mongodb://mongodb:27017/clube-gestao
JWT_SECRET=your_jwt_secret_key_here
```

Substitua os valores conforme necessário para o seu ambiente:

- `PORT`: Porta em que o servidor será executado
- `MONGODB_URI`: URI de conexão com o MongoDB
- `JWT_SECRET`: Chave secreta para geração e verificação de tokens JWT

## Instalação

```bash
# Instalar dependências
npm install

# Iniciar o servidor em modo de desenvolvimento
npm run dev
```

## Estrutura do Projeto

```
backend/
├── src/
│   ├── controllers/ # Controladores da API
│   ├── models/      # Modelos do MongoDB
│   ├── routes/      # Rotas da API
│   ├── middleware/  # Middlewares
│   ├── config/      # Configurações
│   └── utils/       # Utilitários
└── server.js        # Ponto de entrada do servidor
```