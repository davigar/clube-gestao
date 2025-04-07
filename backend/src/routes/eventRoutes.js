const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Space = require('../models/Space');
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
  if (req.socio.role !== 'admin' && req.socio.role !== 'manager' && req.socio.role !== 'instructor') {
    return res.status(403).json({ message: 'Acesso negado. Apenas administradores, gerentes e instrutores podem realizar esta ação.' });
  }
  next();
};

// Listar todos os eventos
router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
      .populate('space', 'name type location')
      .populate('createdBy', 'name email')
      .sort({ startTime: 1 });
    
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar eventos', error: error.message });
  }
});

// Obter evento por ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('space', 'name type location capacity')
      .populate('createdBy', 'name email')
      .populate('attendees', 'name email');
    
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter evento', error: error.message });
  }
});

// Criar novo evento (apenas admin, manager e instructor)
router.post('/', authMiddleware, adminManagerMiddleware, async (req, res) => {
  try {
    const { title, space, startTime, endTime, description, eventType, recurrence, recurrenceEndDate, price, maxAttendees } = req.body;
    
    // Verificar se o espaço existe
    const spaceExists = await Space.findById(space);
    if (!spaceExists) {
      return res.status(404).json({ message: 'Espaço não encontrado' });
    }
    
    // Verificar disponibilidade do espaço
    const conflictingEvents = await Event.find({
      space,
      $or: [
        { startTime: { $lt: new Date(endTime), $gte: new Date(startTime) } },
        { endTime: { $gt: new Date(startTime), $lte: new Date(endTime) } },
        { $and: [{ startTime: { $lte: new Date(startTime) } }, { endTime: { $gte: new Date(endTime) } }] },
      ],
    });
    
    if (conflictingEvents.length > 0) {
      return res.status(400).json({ message: 'Espaço já reservado para este horário' });
    }
    
    // Criar evento
    const event = new Event({
      title,
      space,
      startTime,
      endTime,
      createdBy: req.socio._id,
      description,
      eventType,
      recurrence,
      recurrenceEndDate,
      price,
      maxAttendees,
    });
    
    await event.save();
    
    res.status(201).json({
      message: 'Evento criado com sucesso',
      event,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar evento', error: error.message });
  }
});

// Atualizar evento (apenas admin, manager e instructor)
router.put('/:id', authMiddleware, adminManagerMiddleware, async (req, res) => {
  try {
    const { title, startTime, endTime, description, eventType, status, price, maxAttendees } = req.body;
    
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    
    // Verificar se o sócio é o criador do evento ou admin
    if (event.createdBy.toString() !== req.socio._id.toString() && req.socio.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado. Apenas o criador do evento ou administradores podem atualizá-lo.' });
    }
    
    // Se as datas foram alteradas, verificar disponibilidade
    if ((startTime && new Date(startTime).toString() !== event.startTime.toString()) || 
        (endTime && new Date(endTime).toString() !== event.endTime.toString())) {
      
      const conflictingEvents = await Event.find({
        _id: { $ne: req.params.id },
        space: event.space,
        $or: [
          { startTime: { $lt: new Date(endTime || event.endTime), $gte: new Date(startTime || event.startTime) } },
          { endTime: { $gt: new Date(startTime || event.startTime), $lte: new Date(endTime || event.endTime) } },
          { $and: [{ startTime: { $lte: new Date(startTime || event.startTime) } }, { endTime: { $gte: new Date(endTime || event.endTime) } }] },
        ],
      });
      
      if (conflictingEvents.length > 0) {
        return res.status(400).json({ message: 'Espaço já reservado para este horário' });
      }
    }
    
    // Atualizar evento
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { title, startTime, endTime, description, eventType, status, price, maxAttendees },
      { new: true },
    )
      .populate('space', 'name type location')
      .populate('createdBy', 'name email');
    
    res.json({
      message: 'Evento atualizado com sucesso',
      event: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar evento', error: error.message });
  }
});

// Excluir evento (apenas admin e criador)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    
    // Verificar se o sócio é o criador do evento ou admin
    if (event.createdBy.toString() !== req.socio._id.toString() && req.socio.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado. Apenas o criador do evento ou administradores podem excluí-lo.' });
    }
    
    await Event.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Evento excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir evento', error: error.message });
  }
});

// Participar de um evento
router.post('/:id/attend', authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    
    // Verificar se o evento já está lotado
    if (event.maxAttendees && event.attendees.length >= event.maxAttendees) {
      return res.status(400).json({ message: 'Evento já está com lotação máxima' });
    }
    
    // Verificar se o sócio já está participando
    if (event.attendees.includes(req.socio._id)) {
      return res.status(400).json({ message: 'Você já está participando deste evento' });
    }
    
    // Adicionar sócio aos participantes
    event.attendees.push(req.socio._id);
    await event.save();
    
    res.json({
      message: 'Participação confirmada com sucesso',
      event,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao participar do evento', error: error.message });
  }
});

// Cancelar participação em um evento
router.delete('/:id/attend', authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    
    // Verificar se o sócio está participando
    if (!event.attendees.includes(req.socio._id)) {
      return res.status(400).json({ message: 'Você não está participando deste evento' });
    }
    
    // Remover sócio dos participantes
    event.attendees = event.attendees.filter(
      (attendee) => attendee.toString() !== req.socio._id.toString(),
    );
    await event.save();
    
    res.json({
      message: 'Participação cancelada com sucesso',
      event,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cancelar participação', error: error.message });
  }
});

// Listar eventos por espaço
router.get('/space/:spaceId', async (req, res) => {
  try {
    const events = await Event.find({ space: req.params.spaceId })
      .populate('space', 'name type location')
      .populate('createdBy', 'name email')
      .sort({ startTime: 1 });
    
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar eventos', error: error.message });
  }
});

// Listar eventos por período
router.get('/period/:start/:end', async (req, res) => {
  try {
    const { start, end } = req.params;
    
    const events = await Event.find({
      $or: [
        { startTime: { $gte: new Date(start), $lte: new Date(end) } },
        { endTime: { $gte: new Date(start), $lte: new Date(end) } },
        { $and: [{ startTime: { $lte: new Date(start) } }, { endTime: { $gte: new Date(end) } }] },
      ],
    })
      .populate('space', 'name type location')
      .populate('createdBy', 'name email')
      .sort({ startTime: 1 });
    
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar eventos', error: error.message });
  }
});

module.exports = router;