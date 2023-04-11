import useProyectos from "../../hooks/useProyectos"
import { useState, useEffect } from "react"
import Alert from "./Alert"
import { useParams } from "react-router-dom"

const FormularioProyecto = () => {

    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    const { mostrarAlerta, alerta, submitProyecto, proyecto, setProyecto } = useProyectos()

    const params = useParams()

    
    
    useEffect(() => {
      
        if (params.id && proyecto.nombre) {
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega.split('T')[0])
            setCliente(proyecto.cliente)
        }else{

        }
        
    }, [params])
    

    const handleSubmit = async e => {
        e.preventDefault()
        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente })
        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
    }


    const { msg } = alerta

    return (

        <form onSubmit={handleSubmit} className={`bg-white ${msg ? 'pb-10' : 'py-10'} px-5 md:w-1/2 rounded-lg`}>
            {msg && <Alert alerta={alerta} />}

            <div className="mb-5">
                <label htmlFor="nombre" className='text-gray-700 uppercase font-bold text-sm' >Nombre</label>
                <input value={nombre} onChange={e => setNombre(e.target.value)} type="text" className='border-2 w-full p-2 mt-2 placeholder-gray-600 rounded-md' id='nombre' placeholder='Nombre del Proyecto.' />
            </div>
            <div className="mb-5">
                <label htmlFor="descripcion" className='text-gray-700 uppercase font-bold text-sm' >Descripción</label>
                <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} type="text" rows={5} className='border-2 w-full p-2 mt-2 placeholder-gray-600 rounded-md' id='descripcion' placeholder='Descripción del Proyecto.'></textarea>
            </div>
            <div className="mb-5">
                <label htmlFor="fecha-entrega" className='text-gray-700 uppercase font-bold text-sm' >Fecha de Entrega</label>

                <input value={fechaEntrega} onChange={e => setFechaEntrega(e.target.value)} type="date" className='border-2 block p-2 mt-2 placeholder-gray-600 rounded-md' id='fecha-entrega' placeholder='Fecha de entrega.' />
            </div>
            <div className="mb-5">
                <label htmlFor="cliente" className='text-gray-700 uppercase font-bold text-sm' >Cliente</label>
                <input value={cliente} onChange={e => setCliente(e.target.value)} type="text" className='border-2 w-full p-2 mt-2 placeholder-gray-600 rounded-md' id='cliente' placeholder='Nombre del Cliente.' />
            </div>


            <input type="submit" className="bg-sky-800 block p-3 uppercase font-bold text-white rounded-lg w-full cursor-pointer hover:bg-sky-600 transition-colors" value={id ? 'Actualizar Proyecto':'Crear Proyecto'} />

        </form>
    )
}

export default FormularioProyecto