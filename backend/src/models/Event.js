const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    space: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Space',
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    description: {
      type: String,
      trim: true,
    },
    eventType: {
      type: String,
      enum: ['aula', 'treino', 'competição', 'evento_social', 'manutenção', 'outro'],
      default: 'treino',
    },
    status: {
      type: String,
      enum: ['scheduled', 'in_progress', 'completed', 'cancelled'],
      default: 'scheduled',
    },
    recurrence: {
      type: String,
      enum: ['none', 'daily', 'weekly', 'monthly'],
      default: 'none',
    },
    recurrenceEndDate: {
      type: Date,
    },
    price: {
      type: Number,
      default: 0,
    },
    maxAttendees: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

// Índice para pesquisa eficiente de eventos
EventSchema.index({ space: 1, startTime: 1, endTime: 1 });

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;