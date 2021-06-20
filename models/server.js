const express = require("express");
const cors = require('cors');
const routesUsuarios = require('../routes/usuarios');
const routesAuth = require('../routes/auth');
const { dbConnection } = require("../database/config");

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Conectar a la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // Cors
        this.app.use(cors())
        // Parseo y lectura del body
        this.app.use(express.json());
        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, routesAuth);
        this.app.use(this.usuariosPath, routesUsuarios);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('El servidor corriendo en el puerto localhost', this.port)
        })
    }
}

module.exports = Server;
