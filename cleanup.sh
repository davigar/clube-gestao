#!/bin/bash

# Script para parar e limpar os contêineres do Sistema de Gestão de Clube

echo "Parando contêineres..."
docker-compose down

echo "Removendo volumes (opcional)..."
read -p "Deseja remover os volumes? Isso apagará todos os dados. (s/N): " resposta
if [[ "$resposta" =~ ^[Ss]$ ]]; then
    docker-compose down -v
    echo "Volumes removidos."
else
    echo "Volumes mantidos."
fi

echo "Limpeza concluída!"