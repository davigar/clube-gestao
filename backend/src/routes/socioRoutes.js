const express = require('express');
const router = express.Router();
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

// Middleware de autorização para admin
const adminMiddleware = (req, res, next) => {
  if (req.socio.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
  }
  next();
};

// Registro de sócio
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, role, address, medicalInfo } = req.body;
    
    // Verificar se o sócio já existe
    const existingSocio = await Socio.findOne({ email });
    if (existingSocio) {
      return res.status(400).json({ message: 'Sócio já existe' });
    }
    
    // Criar novo sócio
    const socio = new Socio({
      name,
      email,
      password,
      phone,
      role: role || 'member',
      address,
      medicalInfo,
    });
    
    await socio.save();
    
    // Gerar token
    const token = jwt.sign({ id: socio._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    
    res.status(201).json({
      message: 'Sócio registrado com sucesso',
      token,
      socio: {
        id: socio._id,
        name: socio.name,
        email: socio.email,
        role: socio.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar sócio', error: error.message });
  }
});

// Login de sócio
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Verificar se o sócio existe
    const socio = await Socio.findOne({ email });
    if (!socio) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }
    
    // Verificar senha
    const isMatch = await socio.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }
    
    // Gerar token
    const token = jwt.sign({ id: socio._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    
    res.json({
      message: 'Login realizado com sucesso',
      token,
      socio: {
        id: socio._id,
        name: socio.name,
        email: socio.email,
        role: socio.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
});

// Obter perfil do sócio
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const socio = await Socio.findById(req.socio._id).select('-password');
    res.json(socio);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter perfil', error: error.message });
  }
});

// Atualizar perfil do sócio
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, email, phone, address, medicalInfo } = req.body;
    
    const updateData = { name, email, phone };
    
    if (address) {
      updateData.address = address;
    }
    
    if (medicalInfo) {
      updateData.medicalInfo = medicalInfo;
    }
    
    // Atualizar sócio
    const updatedSocio = await Socio.findByIdAndUpdate(
      req.socio._id,
      updateData,
      { new: true },
    ).select('-password');
    
    res.json({
      message: 'Perfil atualizado com sucesso',
      socio: updatedSocio,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar perfil', error: error.message });
  }
});

// Listar todos os sócios (apenas admin)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const socios = await Socio.find().select('-password');
    res.json(socios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar sócios', error: error.message });
  }
});

// Obter sócio por ID (apenas admin)
router.get('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const socio = await Socio.findById(req.params.id).select('-password');
    
    if (!socio) {
      return res.status(404).json({ message: 'Sócio não encontrado' });
    }
    
    res.json(socio);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter sócio', error: error.message });
  }
});

// Atualizar sócio por ID (apenas admin)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, email, phone, role, status, membershipType, address, medicalInfo } = req.body;
    
    const updateData = { name, email, phone, role, status, membershipType };
    
    if (address) {
      updateData.address = address;
    }
    
    if (medicalInfo) {
      updateData.medicalInfo = medicalInfo;
    }
    
    const updatedSocio = await Socio.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    ).select('-password');
    
    if (!updatedSocio) {
      return res.status(404).json({ message: 'Sócio não encontrado' });
    }
    
    res.json({
      message: 'Sócio atualizado com sucesso',
      socio: updatedSocio,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar sócio', error: error.message });
  }
});

// Excluir sócio (apenas admin)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const socio = await Socio.findByIdAndDelete(req.params.id);
    
    if (!socio) {
      return res.status(404).json({ message: 'Sócio não encontrado' });
    }
    
    res.json({ message: 'Sócio excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir sócio', error: error.message });
  }
});

module.exports = router;