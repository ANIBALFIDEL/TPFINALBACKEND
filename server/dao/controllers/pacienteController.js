const Paciente = require('../models/pacienteModel')
const bcrypt = require('bcrypt')

const crearPaciente = async (paciente) =>{
    const hashedPassword = await bcrypt.hash(paciente.password, 10)
    paciente.password = hashedPassword
    const newPaciente = new Paciente(paciente)
    try{
        return await newPaciente.save()
    }catch(err){
        console.error(err)
    }
}

const getPacientes = async () =>{
    return await Paciente.find({})
}


module.exports = {crearPaciente, getPacientes}