const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Carregar variáveis de ambiente
dotenv.config();

// Importar rotas
const userRoutes = require('./routes/userRoutes');
const spaceRoutes = require('./routes/spaceRoutes');
const eventRoutes = require('./routes/eventRoutes');
const championshipRoutes = require('./routes/championshipRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Inicializar app
const app = express();
const PORT = process.env.PORT || 58524;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/spaces', spaceRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/championships', championshipRoutes);
app.use('/api/payments', paymentRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.send('API do Sistema de Gestão de Clube está funcionando!');
});

// Função para conectar ao MongoDB com retry
const connectWithRetry = () => {
  console.log('Tentando conectar ao MongoDB...');
  mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://mongodb:27017/clube-gestao')
    .then(() => {
      console.log('Conectado ao MongoDB com sucesso!');
      // Iniciar servidor após conexão bem-sucedida
      app.listen(PORT, '0.0.0.0', () => {
        console.log(`Servidor rodando na porta ${PORT}`);
      });
    })
    .catch(err => {
      console.error('Erro ao conectar ao MongoDB:', err);
      console.log('Tentando reconectar em 5 segundos...');
      setTimeout(connectWithRetry, 5000);
    });
};

// Iniciar tentativa de conexão
connectWithRetry();

module.exports = app;