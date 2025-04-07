const express = require('express');
const router = express.Router();
const Championship = require('../models/Championship');
const Socio = require('../models/Socio');
const jwt = require('jsonwebtoken');

// Middleware de autenticação
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Autenticação necessária' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const socio = await Socio.findById(decoded.id);
    
    if (!socio) {
      return res.status(401).json({ message: 'Sócio não encontrado' });
    }
    
    req.socio = socio;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

// Middleware de autorização para admin e manager
const adminManagerMiddleware = (req, res, next) => {
  if (req.socio.role !== 'admin' && req.socio.role !== 'manager') {
    return res.status(403).json({ message: 'Acesso negado. Apenas administradores e gerentes podem realizar esta ação.' });
  }
  next();
};

// Listar todos os campeonatos
router.get('/', async (req, res) => {
  try {
    const championships = await Championship.find()
      .sort({ startDate: 1 });
    
    res.json(championships);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar campeonatos', error: error.message });
  }
});

// Obter campeonato por ID
router.get('/:id', async (req, res) => {
  try {
    const championship = await Championship.findById(req.params.id)
      .populate('participants.user', 'name email');
    
    if (!championship) {
      return res.status(404).json({ message: 'Campeonato não encontrado' });
    }
    
    res.json(championship);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter campeonato', error: error.message });
  }
});

// Criar novo campeonato (apenas admin e manager)
router.post('/', authMiddleware, adminManagerMiddleware, async (req, res) => {
  try {
    const { 
      name, 
      description, 
      startDate, 
      endDate, 
      location, 
      organizer, 
      type, 
      sport, 
      categories, 
      registrationDeadline, 
      registrationFee, 
    } = req.body;
    
    const championship = new Championship({
      name,
      description,
      startDate,
      endDate,
      location,
      organizer,
      type,
      sport,
      categories,
      registrationDeadline,
      registrationFee,
    });
    
    await championship.save();
    
    res.status(201).json({
      message: 'Campeonato criado com sucesso',
      championship,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar campeonato', error: error.message });
  }
});

// Atualizar campeonato (apenas admin e manager)
router.put('/:id', authMiddleware, adminManagerMiddleware, async (req, res) => {
  try {
    const { 
      name, 
      description, 
      startDate, 
      endDate, 
      location, 
      organizer, 
      type, 
      sport, 
      categories, 
      registrationDeadline, 
      registrationFee,
      status,
      results,
    } = req.body;
    
    const championship = await Championship.findById(req.params.id);
    
    if (!championship) {
      return res.status(404).json({ message: 'Campeonato não encontrado' });
    }
    
    const updatedChampionship = await Championship.findByIdAndUpdate(
      req.params.id,
      { 
        name, 
        description, 
        startDate, 
        endDate, 
        location, 
        organizer, 
        type, 
        sport, 
        categories, 
        registrationDeadline, 
        registrationFee,
        status,
        results,
      },
      { new: true },
    );
    
    res.json({
      message: 'Campeonato atualizado com sucesso',
      championship: updatedChampionship,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar campeonato', error: error.message });
  }
});

// Excluir campeonato (apenas admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.socio.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem excluir campeonatos.' });
    }
    
    const championship = await Championship.findByIdAndDelete(req.params.id);
    
    if (!championship) {
      return res.status(404).json({ message: 'Campeonato não encontrado' });
    }
    
    res.json({ message: 'Campeonato excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir campeonato', error: error.message });
  }
});

// Convocar atleta para campeonato (apenas admin e manager)
router.post('/:id/convoke', authMiddleware, adminManagerMiddleware, async (req, res) => {
  try {
    const { userId, category } = req.body;
    
    // Verificar se o sócio existe
    const socio = await Socio.findById(userId);
    if (!socio) {
      return res.status(404).json({ message: 'Sócio não encontrado' });
    }
    
    const championship = await Championship.findById(req.params.id);
    
    if (!championship) {
      return res.status(404).json({ message: 'Campeonato não encontrado' });
    }
    
    // Verificar se o usuário já está convocado
    const existingParticipant = championship.participants.find(
      (p) => p.user.toString() === userId,
    );
    
    if (existingParticipant) {
      return res.status(400).json({ message: 'Atleta já convocado para este campeonato' });
    }
    
    // Adicionar participante
    championship.participants.push({
      user: userId,
      category,
      status: 'convocado',
    });
    
    await championship.save();
    
    res.json({
      message: 'Atleta convocado com sucesso',
      championship,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao convocar atleta', error: error.message });
  }
});

// Atualizar status de participação (atleta responde à convocação)
router.put('/:id/participation', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['confirmado', 'recusado'].includes(status)) {
      return res.status(400).json({ message: 'Status inválido' });
    }
    
    const championship = await Championship.findById(req.params.id);
    
    if (!championship) {
      return res.status(404).json({ message: 'Campeonato não encontrado' });
    }
    
    // Encontrar participante
    const participantIndex = championship.participants.findIndex(
      (p) => p.user.toString() === req.socio._id.toString(),
    );
    
    if (participantIndex === -1) {
      return res.status(404).json({ message: 'Você não foi convocado para este campeonato' });
    }
    
    // Atualizar status
    championship.participants[participantIndex].status = status;
    await championship.save();
    
    res.json({
      message: `Participação ${status === 'confirmado' ? 'confirmada' : 'recusada'} com sucesso`,
      championship,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar participação', error: error.message });
  }
});

// Atualizar desempenho do atleta (apenas admin e manager)
router.put('/:id/performance/:userId', authMiddleware, adminManagerMiddleware, async (req, res) => {
  try {
    const { position, notes } = req.body;
    
    const championship = await Championship.findById(req.params.id);
    
    if (!championship) {
      return res.status(404).json({ message: 'Campeonato não encontrado' });
    }
    
    // Encontrar participante
    const participantIndex = championship.participants.findIndex(
      (p) => p.user.toString() === req.params.userId,
    );
    
    if (participantIndex === -1) {
      return res.status(404).json({ message: 'Atleta não encontrado neste campeonato' });
    }
    
    // Atualizar desempenho
    championship.participants[participantIndex].performance = { position, notes };
    await championship.save();
    
    res.json({
      message: 'Desempenho atualizado com sucesso',
      championship,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar desempenho', error: error.message });
  }
});

// Listar campeonatos por período
router.get('/period/:start/:end', async (req, res) => {
  try {
    const { start, end } = req.params;
    
    const championships = await Championship.find({
      $or: [
        { startDate: { $gte: new Date(start), $lte: new Date(end) } },
        { endDate: { $gte: new Date(start), $lte: new Date(end) } },
        { $and: [{ startDate: { $lte: new Date(start) } }, { endDate: { $gte: new Date(end) } }] },
      ],
    }).sort({ startDate: 1 });
    
    res.json(championships);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar campeonatos', error: error.message });
  }
});

// Listar campeonatos por esporte
router.get('/sport/:sport', async (req, res) => {
  try {
    const championships = await Championship.find({ sport: req.params.sport })
      .sort({ startDate: 1 });
    
    res.json(championships);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar campeonatos', error: error.message });
  }
});

// Listar campeonatos do sócio
router.get('/my/participations', authMiddleware, async (req, res) => {
  try {
    const championships = await Championship.find({
      'participants.user': req.socio._id,
    }).sort({ startDate: 1 });
    
    res.json(championships);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar campeonatos', error: error.message });
  }
});

module.exports = router;