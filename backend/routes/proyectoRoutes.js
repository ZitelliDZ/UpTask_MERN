import express from "express";
import {
    obtenerProyectos,
    obtenerProyecto,
    nuevoProyecto,
    editarProyecto,
    eliminarProyecto,
    buscarColaboradorProyecto,
    agregarColaboradorProyecto,
    eliminarColaboradorProyecto,
} from "../controllers/proyectoController.js";
import checkAuth from "../middleware/checkAuth.js";



const router = express.Router();

router.
    route('/').
    get(checkAuth,obtenerProyectos).
    post(checkAuth,nuevoProyecto)

router.
    route('/:id').
    get(checkAuth,obtenerProyecto).
    put(checkAuth,editarProyecto).
    delete(checkAuth,eliminarProyecto)
 
router.post('/colaboradores',checkAuth,buscarColaboradorProyecto)
router.post('/colaboradores/:id',checkAuth,agregarColaboradorProyecto  )
router.post('/eliminar-colaborador/:id',checkAuth,eliminarColaboradorProyecto)



export default router