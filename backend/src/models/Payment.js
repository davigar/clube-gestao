const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    paymentType: {
      type: String,
      enum: ['mensalidade', 'evento', 'campeonato', 'multa', 'outro'],
      default: 'mensalidade',
    },
    paymentMethod: {
      type: String,
      enum: ['pix', 'cartão', 'dinheiro', 'transferência', 'outro'],
      default: 'pix',
    },
    status: {
      type: String,
      enum: ['pendente', 'pago', 'cancelado', 'atrasado'],
      default: 'pendente',
    },
    dueDate: {
      type: Date,
      required: true,
    },
    paymentDate: {
      type: Date,
    },
    pixCode: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    notificationSent: {
      type: Boolean,
      default: false,
    },
    notificationDate: {
      type: Date,
    },
    relatedEntity: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'relatedEntityModel',
    },
    relatedEntityModel: {
      type: String,
      enum: ['Event', 'Championship'],
    },
    receiptUrl: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Índices para consultas comuns
PaymentSchema.index({ user: 1, status: 1 });
PaymentSchema.index({ dueDate: 1, status: 1 });

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;