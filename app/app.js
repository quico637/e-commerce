const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const product = require('./routes/ProductRoutes')

// Configura el middleware de análisis del cuerpo de la solicitud
app.use(bodyParser.json());


// Configura el puerto y el servidor para escuchar las peticiones
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}.`);
});


app.use('/product', product)

app.get('/', (req, res) => {
    res.send('hello world')
})
