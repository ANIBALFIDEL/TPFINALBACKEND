const express = require('express')
const { getTurnos, crearTurno, eliminarTurno} = require('../dao/controllers/turnoController')
const adminRouter = express.Router()


adminRouter.get('/', async (req, res)=>{
    res.render('admin_cargarTurnos')
})

adminRouter.post('/', async (req, res)=>{
    
    let {fecha, disponible} = req.body
    if(disponible){
        disponible = true
    }else{
        disponible = false
    }
    await crearTurno({fecha, disponible, paciente: 0})
    res.render('admin_cargarTurnos', {message: 'Turno cargado'})
})


adminRouter.delete('/:tid', async (req, res)=>{
    const {tid} = req.params
    await eliminarTurno(tid)
    res.render('admin_cargarTurnos', {message: 'Turno eliminado'})
})

adminRouter.get('/listar', async (req, res)=>{
    res.render('admin_listarTurnos', {data: await getTurnos()})
})


module.exports = adminRouter