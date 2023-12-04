const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  paciente: { type: Number, required: false },
  disponible: { type: Boolean, required: true }
});

const Turno = mongoose.model('Turno', turnoSchema);

module.exports = Turno;