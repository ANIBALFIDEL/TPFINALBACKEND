const Paciente = require('../models/pacienteModel')
const Turno = require('../models/turnoModel')

const crearTurno = async (turno) =>{
    const newTurno = new Turno(turno)
    try{
        return await newTurno.save()
    }catch(err){
        console.error(err)
    }
}

const eliminarTurno = async (id) =>{
    try{
        await Turno.deleteOne({ _id: id });
    }catch(err){
        console.error(err)
    }
}

const getTurnos = async () =>{
    const data = await Turno.aggregate([{
        $lookup:{
            from: 'pacientes',
            localField: 'paciente',
            foreignField: 'dni',
            as: 'Paciente'
        }
    }])
    return data
}

const getTurnosDisponibles = async () =>{
    return await Turno.find({disponible: true})
}

const getTurnosDisponiblesByDni = async (dni) =>{
    return await Turno.find({paciente: dni})
}

const reservarTurno = async (turno) =>{
    return await Turno.updateOne({_id: turno.id}, {$set: {paciente: Number(turno.dni), disponible: false}})
}

const eliminarReservaTurno = async (idTurno) =>{
    return await Turno.updateOne({_id: idTurno}, {$set: {paciente: 0, disponible: true}})
}

module.exports = {crearTurno, getTurnos, eliminarTurno, getTurnosDisponibles, reservarTurno, getTurnosDisponiblesByDni, eliminarReservaTurno}