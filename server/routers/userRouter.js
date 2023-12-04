const express = require('express')
const { getTurnos, crearTurno, eliminarTurno, reservarTurno, eliminarReservaTurno} = require('../dao/controllers/turnoController')
const userRouter = express.Router()

userRouter.put('/:id/:dni', async (req, res)=>{
    const {id, dni} = req.params
    await reservarTurno({id, dni})
})

userRouter.put('/:idTurno', async (req, res)=>{
    const {idTurno} = req.params
    await eliminarReservaTurno(idTurno)
})


module.exports = userRouter