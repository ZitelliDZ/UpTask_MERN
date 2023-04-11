import Proyecto from "../models/Proyecto.js";

import mongoose from "mongoose";
import Usuario from "../models/Usuario.js";

const obtenerProyectos = async (req, res) => {
  
    
    try {
        const proyectos = await Proyecto.find({
            $or : [
                {colaboradores : {$in : req.usuario}},
                {creador : {$in : req.usuario}},
                
            ]
        })
        .select('-tareas')
        res.json(proyectos);
    } catch (error) {
        

        console.log(error)
    }
}
const obtenerProyecto = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('Acción no válida!.')
        return res.status(401).json({ msg: error.message })
    }


    const proyecto = await Proyecto.findById(id)
    .populate({
        path: 'tareas', populate: {path:'completado',select:'nombre'}
    })
    .populate('colaboradores','nombre email');
    if (!proyecto) {
        const error = new Error('Proyecto no encontrado!.')
        return res.status(404).json({ msg: error.message })
    }

    if ((proyecto.creador.toString() !== req.usuario._id.toString() && !proyecto.colaboradores.some(colaborador => colaborador._id.toString() === req.usuario._id.toString()))) {
        const error = new Error('Acción no válida!.')
        return res.status(401).json({ msg: error.message })
    }

    res.json(proyecto);

    
}


const nuevoProyecto = async (req, res) => {

    try {
        const proyecto = new Proyecto(req.body)
        proyecto.creador = req.usuario._id
        const proyectoAlmacenado = await proyecto.save()
        res.json(
            proyectoAlmacenado
        );
    } catch (error) {
        console.log(error)
    }
}
const editarProyecto = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('Acción no válida!.')
        return res.status(401).json({ msg: error.message })
    }


    const proyecto = await Proyecto.findById(id);
    if (!proyecto) {
        const error = new Error('Proyecto no encontrado!.')
        return res.status(404).json({ msg: error.message })
    }

    if ((proyecto.creador.toString() !== req.usuario._id.toString())) {
        const error = new Error('Acción no válida!.')
        return res.status(401).json({ msg: error.message })
    }

    proyecto.nombre = req.body.nombre || proyecto.nombre;
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
    proyecto.cliente = req.body.cliente || proyecto.cliente;

    try {
        const proyectoActualizado = await proyecto.save();
        res.json(proyectoActualizado );
    } catch (error) {
        console.log(error.message)
    }
}
const eliminarProyecto = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('Acción no válida!.')
        return res.status(401).json({ msg: error.message })
    }


    const proyecto = await Proyecto.findById(id);
     
    if (!proyecto) {
        const error = new Error('Proyecto no encontrado!.')
        return res.status(404).json({ msg: error.message })
    }

    if ((proyecto.creador.toString() !== req.usuario._id.toString())) {
        const error = new Error('Acción no válida!.')
        return res.status(401).json({ msg: error.message })
    }

    
    try {
        await proyecto.deleteOne()
        res.json({msg: 'Proyecto Eliminado'});
    } catch (error) {
        console.log(error.message)
    }
}
const buscarColaboradorProyecto = async (req, res) => {
    const {email} = req.body

    
    const usuario = await Usuario.findOne({email}).select('-createdAt -confirmado -updatedAt -password -token -__v ');

    if (!usuario) {
        const error = new Error('Usuario no encontrado!.')
        return res.status(404).json({ msg: error.message })
    }
    
    res.json(usuario);

}
const agregarColaboradorProyecto = async (req, res) => {
   
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        const error = new Error('Acción no válida!.')
        return res.status(401).json({ msg: error.message })
    }    
    
    const proyecto = await Proyecto.findById(req.params.id)

    if (!proyecto) {
        const error = new Error('Proyecto no encontrado!.')
        return res.status(404).json({ msg: error.message })
    }

    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción no válida!.')
        return res.status(401).json({ msg: error.message })
    }


    const {email} = req.body

    
    const usuario = await Usuario.findOne({email}).select('-createdAt -confirmado -updatedAt -password -token -__v ');

    if (!usuario) {
        const error = new Error('Usuario no encontrado!.')
        return res.status(404).json({ msg: error.message })
    }
    
    if (proyecto.creador.toString() === usuario._id.toString()) {
        const error = new Error('El Creador del Proyecto no puede ser Colaborador!.')
        return res.status(401).json({ msg: error.message })
    }

    if (proyecto.colaboradores.includes(usuario._id)) {
        const error = new Error('El usuario ya pertenece al proyecto!.')
        return res.status(401).json({ msg: error.message })
    }

    proyecto.colaboradores.push(usuario._id)
    await proyecto.save()
    
    res.json({ msg: 'Colaborador agregado con éxito.!' });

}
const eliminarColaboradorProyecto = async (req, res) => {
  
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        const error = new Error('Acción no válida!.')
        return res.status(401).json({ msg: error.message })
    }    
    
    const proyecto = await Proyecto.findById(req.params.id)

    if (!proyecto) {
        const error = new Error('Proyecto no encontrado!.')
        return res.status(404).json({ msg: error.message })
    }

    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción no válida!.')
        return res.status(401).json({ msg: error.message })
    }

    
    
    proyecto.colaboradores.pull(req.body.id)
    
    await proyecto.save()
    
    res.json({ msg: 'Colaborador eliminado con éxito.!' });

}


export {
    obtenerProyectos,
    obtenerProyecto,
    nuevoProyecto,
    editarProyecto,
    eliminarProyecto,
    buscarColaboradorProyecto,
    agregarColaboradorProyecto,
    eliminarColaboradorProyecto,
    
}