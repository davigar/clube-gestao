const express = require('express');
const router = express.Router();
const Space = require('../models/Space');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware de autenticação
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Autenticação necessária' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

// Middleware de autorização para admin e manager
const adminManagerMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Acesso negado. Apenas administradores e gerentes podem realizar esta ação.' });
  }
  next();
};

// Listar todos os espaços
router.get('/', async (req, res) => {
  try {
    const spaces = await Space.find();
    res.json(spaces);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar espaços', error: error.message });
  }
});

// Obter espaço por ID
router.get('/:id', async (req, res) => {
  try {
    const space = await Space.findById(req.params.id);
    
    if (!space) {
      return res.status(404).json({ message: 'Espaço não encontrado' });
    }
    
    res.json(space);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter espaço', error: error.message });
  }
});

// Criar novo espaço (apenas admin e manager)
router.post('/', authMiddleware, adminManagerMiddleware, async (req, res) => {
  try {
    const { name, type, description, capacity, location, pricePerHour, openingHours } = req.body;
    
    const space = new Space({
      name,
      type,
      description,
      capacity,
      location,
      pricePerHour,
      openingHours,
    });
    
    await space.save();
    
    res.status(201).json({
      message: 'Espaço criado com sucesso',
      space,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar espaço', error: error.message });
  }
});

// Atualizar espaço (apenas admin e manager)
router.put('/:id', authMiddleware, adminManagerMiddleware, async (req, res) => {
  try {
    const { name, type, description, capacity, location, pricePerHour, openingHours, status } = req.body;
    
    const updatedSpace = await Space.findByIdAndUpdate(
      req.params.id,
      { name, type, description, capacity, location, pricePerHour, openingHours, status },
      { new: true },
    );
    
    if (!updatedSpace) {
      return res.status(404).json({ message: 'Espaço não encontrado' });
    }
    
    res.json({
      message: 'Espaço atualizado com sucesso',
      space: updatedSpace,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar espaço', error: error.message });
  }
});

// Excluir espaço (apenas admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem excluir espaços.' });
    }
    
    const space = await Space.findByIdAndDelete(req.params.id);
    
    if (!space) {
      return res.status(404).json({ message: 'Espaço não encontrado' });
    }
    
    res.json({ message: 'Espaço excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir espaço', error: error.message });
  }
});

// Adicionar dia de manutenção (apenas admin e manager)
router.post('/:id/maintenance', authMiddleware, adminManagerMiddleware, async (req, res) => {
  try {
    const { date, reason } = req.body;
    
    const space = await Space.findById(req.params.id);
    
    if (!space) {
      return res.status(404).json({ message: 'Espaço não encontrado' });
    }
    
    space.maintenanceDays.push({ date, reason });
    await space.save();
    
    res.json({
      message: 'Dia de manutenção adicionado com sucesso',
      space,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar dia de manutenção', error: error.message });
  }
});

// Filtrar espaços por tipo
router.get('/filter/type/:type', async (req, res) => {
  try {
    const spaces = await Space.find({ type: req.params.type });
    res.json(spaces);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao filtrar espaços', error: error.message });
  }
});

module.exports = router;