const mongoose = require('mongoose');

const SpaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['campo', 'quadra', 'salão', 'piscina', 'academia', 'outro'],
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    capacity: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      trim: true,
    },
    images: [
      {
        type: String,
      },
    ],
    amenities: [
      {
        type: String,
      },
    ],
    openingHours: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
    maintenanceDays: [
      {
        date: Date,
        reason: String,
      },
    ],
    status: {
      type: String,
      enum: ['available', 'maintenance', 'reserved', 'closed'],
      default: 'available',
    },
    pricePerHour: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Space = mongoose.model('Space', SpaceSchema);

module.exports = Space;