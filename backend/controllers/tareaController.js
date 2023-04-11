import Tarea from "../models/Tarea.js";
import Proyecto from "../models/Proyecto.js";
import mongoose from "mongoose";



const agregarTarea = async (req, res) => {


    const { proyecto } = req.body;


    if (!mongoose.Types.ObjectId.isValid(proyecto)) {
        const error = new Error('Acción no válida!.')
        return res.status(401).json({ msg: error.message })
    }


    const existeProyecto = await Proyecto.findById(proyecto)

    if (!existeProyecto) {
        const error = new Error('El proyecto no existe!.')
        return res.status(404).json({ msg: error.message })
    }

    if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('No tienes permisos!.')
        return res.status(404).json({ msg: error.message })
    }

    try {

        const tareaAlmacenada = await Tarea.create(req.body)
        
        existeProyecto.tareas.push(tareaAlmacenada._id)
        await existeProyecto.save()
        res.json(tareaAlmacenada);
    } catch (error) {
        console.log(error)
    }


}
const obtenerTarea = async (req, res) => {

    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('Acción no válida!.')
        return res.status(401).json({ msg: error.message })
    }

    
    const existeTarea = await Tarea.findById(id).populate('proyecto');

    if (!existeTarea) {
        const error = new Error('La Tarea no existe!.')
        return res.status(404).json({ msg: error.message })
    }


    if (existeTarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('No tienes permisos!.')
        return res.status(403).json({ msg: error.message })
    }

    res.json(existeTarea);

}
const actualizarTarea = async (req, res) => {

    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('Acción no válida!.')
        return res.status(401).json({ msg: error.message })
    }

    
    const existeTarea = await Tarea.findById(id).populate('proyecto');

    if (!existeTarea) {
        const error = new Error('La Tarea no existe!.')
        return res.status(404).json({ msg: error.message })
    }


    if (existeTarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('No tienes permisos!.')
        return res.status(403).json({ msg: error.message })
    }

    existeTarea.nombre = req.body.nombre || existeTarea.nombre;
    existeTarea.descripcion = req.body.descripcion || existeTarea.descripcion;
    existeTarea.prioridad = req.body.prioridad || existeTarea.prioridad;
    existeTarea.fechaEntrega = req.body.fechaEntrega || existeTarea.fechaEntrega;
    
    try {
        const tareaAlmacenada = await existeTarea.save()
        res.json(tareaAlmacenada);
    } catch (error) {
        console.log(error)

    }

}
const eliminarTarea = async (req, res) => {
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('Acción no válida!.')
        return res.status(401).json({ msg: error.message })
    }

    
    const existeTarea = await Tarea.findById(id).populate('proyecto');

    if (!existeTarea) {
        const error = new Error('La Tarea no existe!.')
        return res.status(404).json({ msg: error.message })
    }


    if (existeTarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('No tienes permisos!.')
        return res.status(403).json({ msg: error.message })
    }

    
    
    try {
        const proyecto = await Proyecto.findById(existeTarea.proyecto)
        proyecto.tareas.pull(existeTarea._id)
        

        await Promise.allSettled([await proyecto.save(), await existeTarea.deleteOne()])
        
        res.json({msg:"Tarea Eliminada"});
    } catch (error) {
        console.log(error)

    }
}
const cambiarEstadoTarea = async (req, res) => {

    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('Acción no válida!.')
        return res.status(401).json({ msg: error.message })
    }

    
    const existeTarea = await Tarea.findById(id).populate('proyecto').populate('completado');

    if (!existeTarea) {
        const error = new Error('La Tarea no existe!.')
        return res.status(404).json({ msg: error.message })
    }
    
    if (existeTarea.proyecto.creador.toString() !== req.usuario._id.toString() && !existeTarea.proyecto.colaboradores.some(colaborador => colaborador._id.toString() === req.usuario._id.toString()) ) {
        const error = new Error('No tienes permisos!.')
        return res.status(403).json({ msg: error.message })
    }

    
    existeTarea.estado = !existeTarea.estado;
    existeTarea.completado = req.usuario._id;
    await existeTarea.save()
    
    const tarea = await Tarea.findById(id).populate('proyecto').populate('completado');
    
    res.json(tarea);

}

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstadoTarea
}