/*const express = require('express');

const app = express()

app.listen(4000, () =>{
    console.log('Server port:4000');
})*/

import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import conectarDB from "./config/db.js";
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';

const app = express();
app.use(express.json())

dotenv.config();
conectarDB();

//configurar cors
const whiteList = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            //puede consultar la api
            callback(null, true)
        } else {
            //no esta permitido
            callback(new Error('Error de Cors'))
        }
    }
}

app.use(cors(corsOptions))

//Routing
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/tareas', tareaRoutes);




const PORT = process.env.PORT || 4000;
const servidor = app.listen(PORT, () => {
    console.log(`Server port:${PORT}`);
})


//socket.Io

import { Server } from 'socket.io'
const io = new Server(servidor, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL,
    },
});


io.on('connection', (socket) => {

    //Definir eventos de socket.Io
    socket.on('abrir proyecto', (proyecto) => {
        socket.join(proyecto);
    })

    socket.on('nueva tarea', (tarea) => {
        const proyecto = tarea.proyecto
        socket.to(proyecto).emit('tarea agregada', tarea)
    })
    
    socket.on('eliminar tarea', (tarea) => {
        const proyecto = tarea.proyecto
        socket.to(proyecto).emit('tarea eliminada', tarea)
    })
    socket.on('actualizar tarea', (tarea) => {
        const proyecto = tarea.proyecto._id
        socket.to(proyecto).emit('tarea actualizada', tarea)
    })
    socket.on('cambiar estadoTarea', (tarea) => {
        const proyecto = tarea.proyecto._id
        socket.to(proyecto).emit('nuevo estado tarea', tarea)
    })

});