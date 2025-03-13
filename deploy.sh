#!/bin/bash

# Script para implantar o Sistema de Gestão de Clube usando Docker

# Verificar se o Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "Docker não está instalado. Instalando..."
    
    # Atualizar pacotes
    sudo apt-get update
    
    # Instalar dependências
    sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
    
    # Adicionar chave GPG do Docker
    curl -fsSL https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    
    # Configurar repositório estável
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]') $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    # Atualizar pacotes novamente
    sudo apt-get update
    
    # Instalar Docker Engine
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io
fi

# Verificar se o Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose não está instalado. Instalando..."
    
    # Instalar Docker Compose
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.18.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Iniciar Docker se estiver em um ambiente de contêiner
if [ -f "/.dockerenv" ]; then
    echo "Detectado ambiente de contêiner. Iniciando Docker daemon..."
    sudo dockerd > /tmp/docker.log 2>&1 &
    sleep 5
fi

# Construir e iniciar os contêineres
echo "Construindo e iniciando os contêineres..."
docker-compose build
docker-compose up -d

# Verificar status dos contêineres
echo "Verificando status dos contêineres..."
docker-compose ps

echo "Implantação concluída! O sistema está disponível em:"
echo "- Backend: http://localhost:58981"
echo "- Frontend: http://localhost:54797"