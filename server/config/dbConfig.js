/* Conexion a mongo */
const mongoose = require('mongoose')

const CONNECTION_STRING = process.env.CONNECTION_STRING



mongoose.connect(CONNECTION_STRING + 'TPFinal', {
    useNewUrlParser: true,
})
.then(()=>{
    console.log('conexion exitosa')
})
.catch((err) => {
    console.error(err)
})


module.exports = mongoose