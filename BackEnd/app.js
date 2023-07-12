const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./DataBase/Coneccion');
const userController = require('./Controllers/userController');



app.use(express.json());
// Habilita CORS para todas las rutas
app.use(cors());
// Ruta para crear un usuario
app.post('/users', userController.createUser);

// Ruta para obtener todos los usuarios
app.get('/users', userController.getUsers);

// Ruta para obtener un usuario por su ID
app.get('/users/:id', userController.getUserById);

// Ruta para actualizar un usuario
app.put('/users/:id', userController.updateUser);

// Ruta para eliminar un usuario
app.delete('/users/:id', userController.deleteUser);

// Ruta para iniciar sesión
app.post('/login', userController.login);

sequelize.sync()
    .then(() => {
        console.log('Modelos sincronizados correctamente con la base de datos.');
        app.listen(3000, () => {
            console.log('Servidor iniciado en el puerto 3000.');
        });
    })
    .catch((error) => {
        console.error('Error al sincronizar los modelos con la base de datos:', error);
    });