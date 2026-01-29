const express = require('express');
const app = express();

app.set('view engine', 'ejs'); // Para renderizar HTML dinámico
app.use(express.static('public')); // Para tu CSS e imágenes

app.get('/', (req, res) => {
    res.send('E-commerce Home Page');
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
