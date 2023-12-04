const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  dni: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  edad: { type: Number, required: true },
  email: { type: String, required: true },
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;