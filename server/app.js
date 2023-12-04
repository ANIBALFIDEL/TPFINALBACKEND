const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const adminRouter = require('./routers/adminRouter')
const userRouter = require('./routers/userRouter')
const session = require('express-session')
const hbs = require('hbs')
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
const { crearPaciente } = require('./dao/controllers/pacienteController')
const {getTurnosDisponibles, getTurnosDisponiblesByDni} = require('./dao/controllers/turnoController')
const bcrypt = require('bcrypt')

dotenv.config()


const mongoose = require('./config/dbConfig')
const Paciente = require('./dao/models/pacienteModel')

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.static(path.join(__dirname + '/public')))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

const session_params = {
    secret : 'keySecret',
    resave: false,
    saveUnitialized: true,
    cookie: {secure: false}
}
app.use(session(session_params))
const ADMIN_USER = process.env.ADMIN_USER
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

app.get('/', async (req, res) =>{
    if(req.session.isAdmin){
        res.render('admin', {user: req.session.user})
    }
    else if(req.session.user){
        res.render('home', {user: req.session.user, data: await getTurnosDisponibles(), dataByDni: await getTurnosDisponiblesByDni(req.session.user.dni)})
    }else{
        res.render('Index')
    }
})

app.get('/login', (req, res) =>{
    res.render('login')
})

app.post('/login', async (req, res)=>{
    const {dni, password} = req.body
    if(dni == ADMIN_USER && password == ADMIN_PASSWORD){
        req.session.isAdmin = true
        req.session.user = {username: 'Administrador'}
        return res.redirect('/')
    }

    try {
        const usuarioExiste = await Paciente.findOne({dni: dni})
    } catch (error) {
        return res.render('login', {error: 'Credenciales inválidas.'})
    }
    
    const usuarioExiste = await Paciente.findOne({dni: dni})

    if(usuarioExiste && await bcrypt.compare(password, usuarioExiste.password)){
        req.session.isAdmin = false
        req.session.user = usuarioExiste
        res.redirect('/')
    }else{
        res.render('login', {error: 'Credenciales inválidas.'})
    }
})

app.get('/register', (req, res) =>{
    res.render('register')
})

app.post('/register', async (req, res) =>{
    const {nombres, apellidos, dni, password, edad, email} = req.body
    const usuarioExistente = await Paciente.findOne({dni: dni})
    console.log(usuarioExistente)
    if(usuarioExistente){
        res.render('register', {error: 'El usuario ya se encuentra registrado para este dni.'})/* Agregar mensaje error */
    }else{
        const newPaciente = await crearPaciente({nombres, apellidos, dni, password, edad, email})
        if(newPaciente){
            res.redirect('/login')
        }else{
            res.render('register', {error: 'No se puedo guardar - Reintentar.'})
        }
    }
    
})

app.get('/logout', (req, res)=>{
    req.session.destroy()
    res.redirect('/')
})

app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)


app.listen(PORT, ()=>{
    console.log(`El servidor se está escuchando en http://localhost:${PORT}/`)
})