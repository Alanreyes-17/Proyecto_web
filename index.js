const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Asegúrate de que esta carpeta contenga index.ejs y recetas.ejs

// Ruta para la página principal
app.get('/', (req, res) => {
    res.render('index'); // Renderiza index.ejs
});

// Ruta para recetas
app.get('/recetas', (req, res) => {
    res.render('recetas'); // Renderiza recetas.ejs
});

app.get('/principiantes', (req, res) => {
    res.render('principiantes'); // Renderiza el archivo principiantes.ejs
});

app.get('/intermedio', (req, res) => {
    res.render('intermedio'); // Renderiza el archivo principiantes.ejs
});

app.get('/avanzado', (req, res) => {
    res.render('avanzado'); // Renderiza el archivo principiantes.ejs
});

// Ruta para el mapa
app.get('/mapa', (req, res) => {
    res.render('mapa'); // Asegúrate de que 'mapa.ejs' existe
});


app.get('/', (req, res) => {
    res.redirect('/usuarios');  // Redirige a la lista de usuarios
});


app.set('view engine', 'ejs'); // Usar EJS como motor de plantillas
app.set('views', path.join(__dirname, 'views')); // Ubicación de las vistas

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para poder leer los datos de formularios

// Rutas para manejar los usuarios
// Mostrar todos los usuarios
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (error, results) => {
        if (error) {
            console.error('Error ejecutando la consulta:', error);
            res.status(500).send('Error en el servidor');
        } else {
            res.render('usuarios', { usuarios: results }); // Renderizar la vista 'usuarios.ejs'
        }
    });
});

// Añadir usuario
app.post('/usuarios', (req, res) => {
    const { nombre, apellido, edad, peso, altura} = req.body;
    const query = 'INSERT INTO usuarios (nombre, apellido, edad, peso, altura) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nombre, apellido, edad, peso, altura], (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta: ', error);
            res.status(500).send('Error en el servidor');
        } else {
            res.redirect('/usuarios');
        }
    });
});

// Actualizar usuario
app.post('/usuarios/:id/editar', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, edad, peso, altura} = req.body;
    const query = 'UPDATE usuarios SET nombre = ?, apellido = ?, edad = ?, peso = ?, altura = ? WHERE id = ?';
    db.query(query, [nombre, apellido, edad, peso, altura, id], (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).send('Error en el servidor');
        } else {
            res.redirect('/usuarios');
        }
    });
});

// Eliminar usuario
app.post('/usuarios/:id/eliminar', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM usuarios WHERE id = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error ejecutando la consulta:', error);
            res.status(500).send('Error en el servidor');
        } else {
            res.redirect('/usuarios');
        }
    });
});

const ubicaciones = [
    { id: 1, nombre: 'Parque Central', latitud: 19.4326, longitud: -99.1332 },
    { id: 2, nombre: 'Museo de Arte', latitud: 19.4100, longitud: -99.1600 },
    { id: 3, nombre: 'Plaza de la Constitución', latitud: 19.4326, longitud: -99.1332 },
];

// Ruta para obtener todas las ubicaciones
app.get('/api/ubicaciones', (req, res) => {
    res.json(ubicaciones);
});

// Ruta para obtener una ubicación específica por ID
app.get('/api/ubicaciones/:id', (req, res) => {
    const ubicacion = ubicaciones.find(u => u.id === parseInt(req.params.id));
    if (!ubicacion) return res.status(404).send('Ubicación no encontrada.');
    res.json(ubicacion);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
