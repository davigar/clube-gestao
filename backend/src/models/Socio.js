const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SocioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      trim: true,
    },
    phone2: {
      type: String,
      trim: true,
    },
    rg: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['masculino', 'feminino', 'outro', 'nao_informado'],
      default: 'nao_informado',
    },
    birthDate: {
      type: Date,
    },
    studyPeriod: {
      type: String,
      enum: ['nao', 'manha', 'tarde', 'noite', 'integral'],
      default: 'nao',
    },
    schoolName: {
      type: String,
      trim: true,
    },
    fatherName: {
      type: String,
      trim: true,
    },
    motherName: {
      type: String,
      trim: true,
    },
    hasMedicalInsurance: {
      type: Boolean,
      default: false,
    },
    medicalInsuranceName: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'member', 'instructor'],
      default: 'member',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending'],
      default: 'active',
    },
    membershipType: {
      type: String,
      enum: ['standard', 'premium', 'family', 'temporary'],
      default: 'standard',
    },
    memberSince: {
      type: Date,
      default: Date.now,
    },
    lastPayment: {
      type: Date,
    },
    profileImage: {
      type: String,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
  },
  {
    timestamps: true,
  },
);

// Hash da senha antes de salvar
SocioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para verificar senha
SocioSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Socio = mongoose.model('Socio', SocioSchema);

module.exports = Socio;