#!/bin/bash

# Script para executar o Sistema de Gestão de Clube localmente

# Verificar se o MongoDB está instalado
if ! command -v mongod &> /dev/null; then
    echo "MongoDB não está instalado. Por favor, instale o MongoDB antes de continuar."
    echo "Visite: https://www.mongodb.com/docs/manual/installation/"
    exit 1
fi

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "Node.js não está instalado. Por favor, instale o Node.js antes de continuar."
    echo "Visite: https://nodejs.org/"
    exit 1
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "npm não está instalado. Por favor, instale o npm antes de continuar."
    echo "Visite: https://www.npmjs.com/get-npm"
    exit 1
fi

# Instalar dependências
echo "Instalando dependências..."
npm run install:all

# Verificar se o MongoDB está em execução
if ! pgrep -x "mongod" > /dev/null; then
    echo "MongoDB não está em execução. Iniciando MongoDB..."
    mongod --dbpath=/tmp/mongodb --fork --logpath=/tmp/mongodb.log
    
    if [ $? -ne 0 ]; then
        echo "Erro ao iniciar o MongoDB. Criando diretório de dados..."
        mkdir -p /tmp/mongodb
        mongod --dbpath=/tmp/mongodb --fork --logpath=/tmp/mongodb.log
        
        if [ $? -ne 0 ]; then
            echo "Falha ao iniciar o MongoDB. Por favor, inicie o MongoDB manualmente."
            exit 1
        fi
    fi
    
    echo "MongoDB iniciado com sucesso."
else
    echo "MongoDB já está em execução."
fi

# Configurar variáveis de ambiente para o backend
echo "Configurando variáveis de ambiente para o backend..."
if [ ! -f "backend/.env" ]; then
    cat > backend/.env << EOL
PORT=58524
MONGODB_URI=mongodb://localhost:27017/clube-gestao
JWT_SECRET=clube-gestao-secret-key-2025
NODE_ENV=development
CORS_ORIGIN=http://localhost:52348
EOL
    echo "Arquivo .env criado para o backend."
else
    echo "Arquivo .env já existe para o backend."
fi

# Inicializar o banco de dados
echo "Inicializando o banco de dados com dados de exemplo..."
cd backend && npm run init-db
cd ..

# Iniciar o backend e o frontend em paralelo
echo "Iniciando o sistema..."
npm run dev

# Exibir informações de acesso
echo "Sistema iniciado! Acesse:"
echo "- Backend: http://localhost:58524"
echo "- Frontend: http://localhost:52348"
echo ""
echo "Credenciais de acesso:"
echo "- Admin: admin@clubegestao.com / admin123"
echo "- Usuário: joao@exemplo.com / senha123"