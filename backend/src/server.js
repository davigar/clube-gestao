const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

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
const PORT = process.env.PORT || 58981;

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

// Iniciar servidor sem banco de dados para demonstração
console.log('Iniciando servidor em modo de demonstração (sem banco de dados)');
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;