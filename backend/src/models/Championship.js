const mongoose = require('mongoose');

const ChampionshipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    organizer: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ['interno', 'externo'],
      default: 'externo',
    },
    sport: {
      type: String,
      required: true,
      trim: true,
    },
    categories: [
      {
        name: String,
        ageMin: Number,
        ageMax: Number,
        gender: {
          type: String,
          enum: ['masculino', 'feminino', 'misto'],
        },
        weight: String,
      },
    ],
    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Socio',
        },
        category: String,
        status: {
          type: String,
          enum: ['convocado', 'confirmado', 'recusado', 'pendente'],
          default: 'pendente',
        },
        performance: {
          position: Number,
          notes: String,
        },
      },
    ],
    registrationDeadline: {
      type: Date,
    },
    registrationFee: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['upcoming', 'in_progress', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    results: {
      type: String,
    },
    documents: [
      {
        name: String,
        url: String,
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Championship = mongoose.model('Championship', ChampionshipSchema);

module.exports = Championship;