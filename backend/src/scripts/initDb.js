const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Space = require('../models/Space');
const Event = require('../models/Event');
const Championship = require('../models/Championship');
const Payment = require('../models/Payment');

// Carregar variáveis de ambiente
dotenv.config();

// Função para conectar ao MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongodb:27017/clube-gestao');
    console.log('Conectado ao MongoDB com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    return false;
  }
};

// Função para limpar o banco de dados
const clearDatabase = async () => {
  try {
    await User.deleteMany({});
    await Space.deleteMany({});
    await Event.deleteMany({});
    await Championship.deleteMany({});
    await Payment.deleteMany({});
    console.log('Banco de dados limpo com sucesso!');
  } catch (error) {
    console.error('Erro ao limpar o banco de dados:', error);
    throw error;
  }
};

// Função para criar usuário administrador
const createAdminUser = async () => {
  try {
    const adminUser = new User({
      name: 'Administrador',
      email: 'admin@clubegestao.com',
      password: 'admin123',
      phone: '(11) 99999-9999',
      role: 'admin',
      status: 'active',
      membershipType: 'premium',
    });

    await adminUser.save();
    console.log('Usuário administrador criado com sucesso!');
    return adminUser;
  } catch (error) {
    console.error('Erro ao criar usuário administrador:', error);
    throw error;
  }
};

// Função para criar usuários de exemplo
const createSampleUsers = async () => {
  try {
    const users = [
      {
        name: 'João Silva',
        email: 'joao@exemplo.com',
        password: 'senha123',
        phone: '(11) 98888-8888',
        role: 'member',
        status: 'active',
        membershipType: 'standard',
      },
      {
        name: 'Maria Oliveira',
        email: 'maria@exemplo.com',
        password: 'senha123',
        phone: '(11) 97777-7777',
        role: 'member',
        status: 'active',
        membershipType: 'family',
      },
      {
        name: 'Carlos Santos',
        email: 'carlos@exemplo.com',
        password: 'senha123',
        phone: '(11) 96666-6666',
        role: 'instructor',
        status: 'active',
        membershipType: 'premium',
      },
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} usuários de exemplo criados com sucesso!`);
    return createdUsers;
  } catch (error) {
    console.error('Erro ao criar usuários de exemplo:', error);
    throw error;
  }
};

// Função para criar espaços de exemplo
const createSampleSpaces = async () => {
  try {
    const spaces = [
      {
        name: 'Campo de Futebol Principal',
        type: 'campo',
        description: 'Campo de futebol oficial com grama natural',
        capacity: 22,
        location: 'Área Externa - Setor A',
        amenities: ['Vestiário', 'Iluminação', 'Arquibancada'],
        status: 'available',
        pricePerHour: 150,
      },
      {
        name: 'Quadra de Tênis 1',
        type: 'quadra',
        description: 'Quadra de tênis com piso rápido',
        capacity: 4,
        location: 'Área Externa - Setor B',
        amenities: ['Vestiário', 'Iluminação'],
        status: 'available',
        pricePerHour: 80,
      },
      {
        name: 'Piscina Olímpica',
        type: 'piscina',
        description: 'Piscina olímpica aquecida',
        capacity: 30,
        location: 'Área Interna - Setor C',
        amenities: ['Vestiário', 'Chuveiros', 'Sauna'],
        status: 'available',
        pricePerHour: 200,
      },
      {
        name: 'Salão de Festas',
        type: 'salão',
        description: 'Salão para eventos sociais',
        capacity: 100,
        location: 'Área Interna - Setor D',
        amenities: ['Cozinha', 'Som', 'Ar-condicionado', 'Mesas e Cadeiras'],
        status: 'available',
        pricePerHour: 300,
      },
    ];

    const createdSpaces = await Space.insertMany(spaces);
    console.log(`${createdSpaces.length} espaços de exemplo criados com sucesso!`);
    return createdSpaces;
  } catch (error) {
    console.error('Erro ao criar espaços de exemplo:', error);
    throw error;
  }
};

// Função para criar eventos de exemplo
const createSampleEvents = async (users, spaces) => {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const events = [
      {
        title: 'Treino de Futebol',
        space: spaces[0]._id,
        startTime: new Date(tomorrow.setHours(18, 0, 0, 0)),
        endTime: new Date(tomorrow.setHours(20, 0, 0, 0)),
        createdBy: users[2]._id, // Instrutor
        attendees: [users[0]._id, users[1]._id],
        description: 'Treino semanal de futebol',
        eventType: 'treino',
        status: 'scheduled',
        recurrence: 'weekly',
        recurrenceEndDate: new Date(nextWeek),
        maxAttendees: 22,
      },
      {
        title: 'Aula de Tênis',
        space: spaces[1]._id,
        startTime: new Date(tomorrow.setHours(10, 0, 0, 0)),
        endTime: new Date(tomorrow.setHours(12, 0, 0, 0)),
        createdBy: users[2]._id, // Instrutor
        attendees: [users[0]._id],
        description: 'Aula particular de tênis',
        eventType: 'aula',
        status: 'scheduled',
        recurrence: 'none',
        price: 120,
        maxAttendees: 2,
      },
      {
        title: 'Festa de Aniversário',
        space: spaces[3]._id,
        startTime: new Date(nextWeek.setHours(19, 0, 0, 0)),
        endTime: new Date(nextWeek.setHours(23, 0, 0, 0)),
        createdBy: users[1]._id,
        description: 'Festa de aniversário de Maria',
        eventType: 'evento_social',
        status: 'scheduled',
        recurrence: 'none',
        price: 1200,
        maxAttendees: 50,
      },
    ];

    const createdEvents = await Event.insertMany(events);
    console.log(`${createdEvents.length} eventos de exemplo criados com sucesso!`);
    return createdEvents;
  } catch (error) {
    console.error('Erro ao criar eventos de exemplo:', error);
    throw error;
  }
};

// Função para criar campeonatos de exemplo
const createSampleChampionships = async (users) => {
  try {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    const twoMonthsLater = new Date(today);
    twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);
    
    const championships = [
      {
        name: 'Campeonato Interno de Futebol',
        description: 'Campeonato interno entre os membros do clube',
        startDate: nextMonth,
        endDate: twoMonthsLater,
        location: 'Campo de Futebol Principal',
        organizer: 'Clube Gestão',
        type: 'interno',
        sport: 'Futebol',
        categories: [
          {
            name: 'Adulto Masculino',
            ageMin: 18,
            ageMax: 45,
            gender: 'masculino',
          },
          {
            name: 'Adulto Feminino',
            ageMin: 18,
            ageMax: 45,
            gender: 'feminino',
          },
          {
            name: 'Master',
            ageMin: 46,
            gender: 'misto',
          },
        ],
        participants: [
          {
            user: users[0]._id,
            category: 'Adulto Masculino',
            status: 'confirmado',
          },
          {
            user: users[1]._id,
            category: 'Adulto Feminino',
            status: 'confirmado',
          },
        ],
        registrationDeadline: new Date(nextMonth.setDate(nextMonth.getDate() - 7)),
        registrationFee: 50,
        status: 'upcoming',
      },
    ];

    const createdChampionships = await Championship.insertMany(championships);
    console.log(`${createdChampionships.length} campeonatos de exemplo criados com sucesso!`);
    return createdChampionships;
  } catch (error) {
    console.error('Erro ao criar campeonatos de exemplo:', error);
    throw error;
  }
};

// Função para criar pagamentos de exemplo
const createSamplePayments = async (users, events, championships) => {
  try {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    const payments = [
      {
        user: users[0]._id,
        amount: 150,
        description: 'Mensalidade de Abril/2025',
        paymentType: 'mensalidade',
        paymentMethod: 'pix',
        status: 'pago',
        dueDate: new Date(lastMonth.setDate(10)),
        paymentDate: new Date(lastMonth.setDate(8)),
        pixCode: 'pix-code-example-123',
        transactionId: 'tx-123456',
        notificationSent: true,
        notificationDate: new Date(lastMonth.setDate(5)),
      },
      {
        user: users[0]._id,
        amount: 150,
        description: 'Mensalidade de Maio/2025',
        paymentType: 'mensalidade',
        paymentMethod: 'pix',
        status: 'pendente',
        dueDate: new Date(today.setDate(10)),
        notificationSent: true,
        notificationDate: new Date(today.setDate(5)),
      },
      {
        user: users[1]._id,
        amount: 150,
        description: 'Mensalidade de Abril/2025',
        paymentType: 'mensalidade',
        paymentMethod: 'pix',
        status: 'pago',
        dueDate: new Date(lastMonth.setDate(10)),
        paymentDate: new Date(lastMonth.setDate(9)),
        pixCode: 'pix-code-example-456',
        transactionId: 'tx-789012',
        notificationSent: true,
        notificationDate: new Date(lastMonth.setDate(5)),
      },
      {
        user: users[1]._id,
        amount: 150,
        description: 'Mensalidade de Maio/2025',
        paymentType: 'mensalidade',
        paymentMethod: 'pix',
        status: 'pendente',
        dueDate: new Date(today.setDate(10)),
        notificationSent: true,
        notificationDate: new Date(today.setDate(5)),
      },
      {
        user: users[0]._id,
        amount: 50,
        description: 'Inscrição no Campeonato Interno de Futebol',
        paymentType: 'campeonato',
        paymentMethod: 'pix',
        status: 'pendente',
        dueDate: new Date(nextMonth.setDate(1)),
        notificationSent: false,
        relatedEntity: championships[0]._id,
        relatedEntityModel: 'Championship',
      },
      {
        user: users[1]._id,
        amount: 50,
        description: 'Inscrição no Campeonato Interno de Futebol',
        paymentType: 'campeonato',
        paymentMethod: 'pix',
        status: 'pendente',
        dueDate: new Date(nextMonth.setDate(1)),
        notificationSent: false,
        relatedEntity: championships[0]._id,
        relatedEntityModel: 'Championship',
      },
    ];

    const createdPayments = await Payment.insertMany(payments);
    console.log(`${createdPayments.length} pagamentos de exemplo criados com sucesso!`);
    return createdPayments;
  } catch (error) {
    console.error('Erro ao criar pagamentos de exemplo:', error);
    throw error;
  }
};

// Função principal para inicializar o banco de dados
const initializeDatabase = async () => {
  try {
    // Conectar ao MongoDB
    const connected = await connectDB();
    if (!connected) {
      console.error('Não foi possível conectar ao MongoDB. Abortando inicialização do banco de dados.');
      process.exit(1);
    }

    // Limpar o banco de dados
    await clearDatabase();

    // Criar dados de exemplo
    const adminUser = await createAdminUser();
    const users = await createSampleUsers();
    const allUsers = [adminUser, ...users];
    
    const spaces = await createSampleSpaces();
    const events = await createSampleEvents(allUsers, spaces);
    const championships = await createSampleChampionships(allUsers);
    const payments = await createSamplePayments(allUsers, events, championships);

    console.log('Banco de dados inicializado com sucesso!');
    
    // Desconectar do MongoDB
    await mongoose.disconnect();
    console.log('Desconectado do MongoDB.');
    
    process.exit(0);
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    process.exit(1);
  }
};

// Executar a função principal
initializeDatabase();