import { useParams, Link } from "react-router-dom"
import { useEffect } from "react"
import useAdmin from "../../hooks/useAdmin"
import useProyectos from "../../hooks/useProyectos"
import ModalFormularioTarea from "../components/ModalFormularioTarea"
import ModalEliminarColaborador from "../components/ModalEliminarColaborador"
import ModalEliminarTarea from "../components/ModalEliminarTarea"
import Tarea from "../components/Tarea"
import Alert from "../components/Alert"
import Colaborador from "../components/Colaborador"

import io from 'socket.io-client'
let socket

const Proyecto = () => {

  const params = useParams()
  const { id } = params

  const { submitTareasProyecto, obtenerProyecto, proyecto, cargando, handleModalTarea,eliminarTareaProyecto,cambiarEstadoTareaProyecto,actualizarTareaProyecto, handleModalEliminarTarea, alerta } = useProyectos()
  const { nombre } = proyecto

  const admin = useAdmin()




  useEffect(() => {
    obtenerProyecto(id)
  }, [])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('abrir proyecto', id)
  }, [])

  useEffect(() => {
    socket.on('tarea agregada', (tareaNueva) => {
      if (tareaNueva.proyecto === proyecto._id) {
        submitTareasProyecto(tareaNueva)
      }
    })

    
    socket.on('tarea eliminada', (tareaEliminada) => {
      if (tareaEliminada.proyecto === proyecto._id) {
        eliminarTareaProyecto(tareaEliminada)
      }
    })
    socket.on('tarea actualizada', (tareaActualizada) => {
      if (tareaActualizada.proyecto._id === proyecto._id) {
        actualizarTareaProyecto(tareaActualizada)
      }
    })
    socket.on('nuevo estado tarea', (nuevoEstadoTarea) => {
      if (nuevoEstadoTarea.proyecto._id === proyecto._id) {
        cambiarEstadoTareaProyecto(nuevoEstadoTarea)
      }
    })
  })


  if (cargando) {
    return (<div>
      <h1 className="font-black text-4xl text-white">Cargando...</h1>
    </div>)
  }

  const { msg } = alerta


  return (

    msg && alerta.error ? <Alert alerta={alerta} /> : (
      <>
        <div className="flex justify-between">
          <h1 className="font-black text-4xl text-white">{nombre}</h1>
          {admin && (
            <div className="flex items-center gap-2 text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              <Link className="font-bold uppercase" to={`/proyectos/editar/${id}`}>Editar</Link>
            </div>
          )}
        </div>

        <div>
          {admin && (
            <button type="button" onClick={handleModalTarea} className="p-5 py-3 w-full text-sm md:w-auto rounded-lg uppercase font-bold bg-sky-800 text-white text-center mt-10 flex gap-2 items-center justify-center "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>Nueva Tarea</button>
          )}
          <p className="font-bold text-xl my-10 text-white">Tareas del Proyecto: </p>
          {msg && <Alert alerta={alerta} />}

          <div className="bg-white shadow mt-10 rounded-xl">
            {proyecto.tareas?.length ?
              (proyecto.tareas?.map(tarea => (<Tarea key={tarea._id} tarea={tarea} />))) :
              <p className="text-center my-5 p-10">No hay tareas en este proyecto</p>}
          </div>
        </div>
        {admin && (
          <>
            <div className="flex items-center justify-between mt-10">
              <p className="font-bold text-white text-xl mt-10" >Colaboradores</p>
              <Link className="text-gray-500 font-bold hover:text-white uppercase"
                to={`/proyectos/nuevo-colaborador/${proyecto._id}`}>
                Añadir
              </Link>
            </div>


            <div className="bg-white shadow mt-10 rounded-xl">
              {proyecto.colaboradores?.length ?
                (proyecto.colaboradores?.map(colaborador => (<Colaborador key={colaborador._id} colaborador={colaborador} />))) :
                <p className="text-center my-5 p-10">No hay tareas en este proyecto</p>}
            </div>
          </>
        )}
        <ModalFormularioTarea />
        <ModalEliminarTarea />
        <ModalEliminarColaborador />

      </>
    )
  )
}

export default Proyecto