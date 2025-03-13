# Sistema de Gestão de Clube

Um sistema completo para gestão de clubes esportivos e recreativos, com funcionalidades de gestão de espaços, membros, campeonatos e pagamentos.

## Funcionalidades

### Gestão de Espaços
- Cadastro e gerenciamento de espaços (campos, quadras, salões, etc.)
- Calendário de reservas e disponibilidade
- Agendamento de eventos e manutenções

### Gestão de Membros
- Cadastro de membros ativos e inativos
- Perfis de usuários com diferentes permissões
- Histórico de atividades e pagamentos

### Gestão de Campeonatos
- Cadastro de campeonatos internos e externos
- Convocação de atletas
- Acompanhamento de resultados e desempenho

### Sistema Financeiro
- Geração de cobranças via WhatsApp
- Pagamento via PIX
- Conciliação bancária
- Relatórios financeiros

## Tecnologias Utilizadas

### Backend
- Node.js com Express
- MongoDB (banco de dados)
- JWT para autenticação
- APIs RESTful

### Frontend
- Next.js (React)
- Tailwind CSS para estilização
- React Query para gerenciamento de estado
- Responsivo para Web e Mobile

## Requisitos

- Node.js 18+
- MongoDB
- NPM ou Yarn

## Instalação

1. Clone o repositório:
```
git clone https://github.com/seu-usuario/clube-gestao.git
cd clube-gestao
```

2. Instale as dependências:
```
npm run install:all
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na pasta `backend` baseado no `.env.example`

4. Inicie o servidor de desenvolvimento:
```
npm run dev
```

## Estrutura do Projeto

```
clube-gestao/
├── backend/             # API Node.js/Express
│   ├── src/
│   │   ├── controllers/ # Controladores da API
│   │   ├── models/      # Modelos do MongoDB
│   │   ├── routes/      # Rotas da API
│   │   ├── middleware/  # Middlewares
│   │   ├── config/      # Configurações
│   │   └── utils/       # Utilitários
│   └── server.js        # Ponto de entrada do servidor
│
├── frontend/            # Aplicação Next.js
│   ├── public/          # Arquivos estáticos
│   └── src/
│       ├── app/         # Páginas da aplicação
│       ├── components/  # Componentes React
│       ├── hooks/       # Hooks personalizados
│       ├── services/    # Serviços de API
│       └── utils/       # Utilitários
│
└── package.json         # Scripts e dependências do projeto raiz
```

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## Contato

Para mais informações, entre em contato pelo email: seu-email@exemplo.com