const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
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
    medicalInfo: {
      medicalTreatment: {
        dental: { type: Boolean, default: false },
        physiotherapy: { type: Boolean, default: false },
        phytotherapy: { type: Boolean, default: false },
        speechTherapy: { type: Boolean, default: false },
        medication: { type: Boolean, default: false },
        psychological: { type: Boolean, default: false },
        other: { type: Boolean, default: false },
        otherDescription: { type: String, default: '' },
      },
      frequentInfections: {
        tonsils: { type: Boolean, default: false },
        skin: { type: Boolean, default: false },
        nose: { type: Boolean, default: false },
        mouth: { type: Boolean, default: false },
        ear: { type: Boolean, default: false },
        teeth: { type: Boolean, default: false },
        lung: { type: Boolean, default: false },
        hemorrhage: { type: Boolean, default: false },
        other: { type: Boolean, default: false },
        otherDescription: { type: String, default: '' },
      },
      epilepsyOrSeizure: {
        hasCondition: { type: Boolean, default: false },
        description: { type: String, default: '' },
      },
      allergicProblem: {
        hasCondition: { type: Boolean, default: false },
        description: { type: String, default: '' },
      },
      heartProblem: {
        hasCondition: { type: Boolean, default: false },
        description: { type: String, default: '' },
      },
      bloodProblem: {
        hasCondition: { type: Boolean, default: false },
        description: { type: String, default: '' },
      },
      diabetesProblem: {
        hasCondition: { type: Boolean, default: false },
        description: { type: String, default: '' },
      },
      boneProblem: {
        hasCondition: { type: Boolean, default: false },
        description: { type: String, default: '' },
      },
    },
  },
  {
    timestamps: true,
  },
);

// Hash da senha antes de salvar
UserSchema.pre('save', async function (next) {
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
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;