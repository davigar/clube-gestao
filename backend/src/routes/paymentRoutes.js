const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

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

// Listar todos os pagamentos (apenas admin e manager)
router.get('/', authMiddleware, adminManagerMiddleware, async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('user', 'name email')
      .sort({ dueDate: 1 });
    
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar pagamentos', error: error.message });
  }
});

// Obter pagamento por ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('user', 'name email');
    
    if (!payment) {
      return res.status(404).json({ message: 'Pagamento não encontrado' });
    }
    
    // Verificar se o usuário é o dono do pagamento ou admin/manager
    if (payment.user._id.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin' && 
        req.user.role !== 'manager') {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter pagamento', error: error.message });
  }
});

// Criar novo pagamento (apenas admin e manager)
router.post('/', authMiddleware, adminManagerMiddleware, async (req, res) => {
  try {
    const { 
      user, 
      amount, 
      description, 
      paymentType, 
      dueDate, 
      relatedEntity, 
      relatedEntityModel, 
    } = req.body;
    
    // Verificar se o usuário existe
    const userExists = await User.findById(user);
    if (!userExists) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    const payment = new Payment({
      user,
      amount,
      description,
      paymentType,
      dueDate,
      relatedEntity,
      relatedEntityModel,
    });
    
    await payment.save();
    
    res.status(201).json({
      message: 'Pagamento criado com sucesso',
      payment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar pagamento', error: error.message });
  }
});

// Atualizar pagamento (apenas admin e manager)
router.put('/:id', authMiddleware, adminManagerMiddleware, async (req, res) => {
  try {
    const { 
      amount, 
      description, 
      paymentType, 
      dueDate, 
      status, 
      paymentDate, 
      transactionId, 
      notes, 
    } = req.body;
    
    const payment = await Payment.findById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({ message: 'Pagamento não encontrado' });
    }
    
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      { 
        amount, 
        description, 
        paymentType, 
        dueDate, 
        status, 
        paymentDate, 
        transactionId, 
        notes, 
      },
      { new: true },
    ).populate('user', 'name email');
    
    res.json({
      message: 'Pagamento atualizado com sucesso',
      payment: updatedPayment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar pagamento', error: error.message });
  }
});

// Excluir pagamento (apenas admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem excluir pagamentos.' });
    }
    
    const payment = await Payment.findByIdAndDelete(req.params.id);
    
    if (!payment) {
      return res.status(404).json({ message: 'Pagamento não encontrado' });
    }
    
    res.json({ message: 'Pagamento excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir pagamento', error: error.message });
  }
});

// Gerar código PIX para pagamento
router.post('/:id/generate-pix', authMiddleware, adminManagerMiddleware, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({ message: 'Pagamento não encontrado' });
    }
    
    // Aqui você integraria com a API do seu banco para gerar o código PIX
    // Este é um exemplo simulado
    const pixCode = `PIX${Date.now()}${payment._id.toString().substring(0, 6)}`;
    
    payment.pixCode = pixCode;
    await payment.save();
    
    res.json({
      message: 'Código PIX gerado com sucesso',
      pixCode,
      payment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao gerar código PIX', error: error.message });
  }
});

// Enviar notificação de pagamento via WhatsApp
router.post('/:id/notify', authMiddleware, adminManagerMiddleware, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('user', 'name email phone');
    
    if (!payment) {
      return res.status(404).json({ message: 'Pagamento não encontrado' });
    }
    
    if (!payment.user.phone) {
      return res.status(400).json({ message: 'Usuário não possui número de telefone cadastrado' });
    }
    
    // Aqui você integraria com a API do WhatsApp Business
    // Este é um exemplo simulado
    
    payment.notificationSent = true;
    payment.notificationDate = new Date();
    await payment.save();
    
    res.json({
      message: 'Notificação enviada com sucesso',
      payment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao enviar notificação', error: error.message });
  }
});

// Registrar pagamento recebido
router.post('/:id/register-payment', authMiddleware, adminManagerMiddleware, async (req, res) => {
  try {
    const { transactionId, paymentMethod, notes } = req.body;
    
    const payment = await Payment.findById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({ message: 'Pagamento não encontrado' });
    }
    
    payment.status = 'pago';
    payment.paymentDate = new Date();
    payment.transactionId = transactionId;
    payment.paymentMethod = paymentMethod || 'pix';
    payment.notes = notes;
    
    await payment.save();
    
    // Atualizar data do último pagamento do usuário
    await User.findByIdAndUpdate(payment.user, { lastPayment: new Date() });
    
    res.json({
      message: 'Pagamento registrado com sucesso',
      payment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar pagamento', error: error.message });
  }
});

// Listar pagamentos do usuário logado
router.get('/my/payments', authMiddleware, async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .sort({ dueDate: -1 });
    
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar pagamentos', error: error.message });
  }
});

// Listar pagamentos pendentes
router.get('/status/pending', authMiddleware, adminManagerMiddleware, async (req, res) => {
  try {
    const payments = await Payment.find({ status: 'pendente' })
      .populate('user', 'name email')
      .sort({ dueDate: 1 });
    
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar pagamentos pendentes', error: error.message });
  }
});

// Listar pagamentos atrasados
router.get('/status/overdue', authMiddleware, adminManagerMiddleware, async (req, res) => {
  try {
    const today = new Date();
    
    const payments = await Payment.find({ 
      status: 'pendente',
      dueDate: { $lt: today },
    })
      .populate('user', 'name email')
      .sort({ dueDate: 1 });
    
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar pagamentos atrasados', error: error.message });
  }
});

module.exports = router;