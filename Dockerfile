FROM node:18-alpine as base

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Instalar dependências
RUN npm run install:all

# Copiar código fonte
COPY . .

# Construir o frontend
RUN cd frontend && npm run build

# Expor portas
EXPOSE 58524 52348

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]