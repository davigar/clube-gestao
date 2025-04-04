const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

// Função para conectar ao MongoDB
const checkDbConnection = async () => {
  try {
    console.log('Tentando conectar ao MongoDB...');
    console.log(`URI: ${process.env.MONGODB_URI || 'mongodb://mongodb:27017/clube-gestao'}`);
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongodb:27017/clube-gestao');
    console.log('Conectado ao MongoDB com sucesso!');
    
    // Verificar as coleções existentes
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Coleções existentes:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
    // Desconectar do MongoDB
    await mongoose.disconnect();
    console.log('Desconectado do MongoDB.');
    
    process.exit(0);
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

// Executar a função
checkDbConnection();