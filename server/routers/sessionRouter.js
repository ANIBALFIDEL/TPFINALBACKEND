const express = require('express')
const { crearPaciente } = require('../dao/controllers/pacienteController')
const sessionRouter = express.Router()

sessionRouter.post('/', async (req, res)=>{

    const {nombres, apellidos, dni, password, edad, email} = req.body
    const newPaciente = await crearPaciente({nombres, apellidos, dni, password, edad, email})
    if(newPaciente){
        res.status(200).json({ok: true, content: 'Usuario creado con éxito'})
        console.log('se guardó')
    }else{
        console.log('no se guardó')
    }
})

module.exports = sessionRouter