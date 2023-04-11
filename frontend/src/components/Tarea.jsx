import { formatearFecha } from "../helpers/formatearFecha"
import useProyectos from "../../hooks/useProyectos"
import useAdmin from "../../hooks/useAdmin"

const Tarea = ({ tarea }) => {

    const { handleModalEditarTarea, handleModalEliminarTarea,completarTarea } = useProyectos()

    const { descripcion, nombre, fechaEntrega, prioridad, estado, _id } = tarea


    const admin = useAdmin()

    return (
        <div className="border-gray-900 border-b-2 p-5 flex justify-between items-center">
            <div className="flex flex-col items-start ">
                <p className="text-xl mb-2">{nombre}</p>
                <p className="text-sm text-gray-500 uppercase mb-2 font-bold">{descripcion}</p>
                <p className="text-xl mb-2">{formatearFecha(fechaEntrega)}</p>
                <p className="text-sm text-gray-500 uppercase mb-2 font-bold">{prioridad}</p>
                {estado && <p className="text-xs bg-green-500 uppercase p-1 rounded-lg text-white">Completada por: {tarea.completado.nombre}</p> }
            </div>
            <div className="flex gap-2 flex-col lg:flex-row">
                {admin && (<button onClick={() => handleModalEditarTarea(tarea)} className="bg-indigo-500 px-4 py-3 text-white uppercase font-bold rounded-lg text-sm">
                    Editar
                </button>)}
                {estado ? (
                    <button onClick={()=>completarTarea(_id)}  className="bg-sky-500 px-4 py-3 text-white uppercase font-bold rounded-lg text-sm">
                        Completa
                    </button>
                ) : (
                    <button onClick={()=>completarTarea(_id)} className="bg-gray-500 px-4 py-3 text-white uppercase font-bold rounded-lg text-sm">
                        Incompleta
                    </button>
                )}
                {admin && (<button onClick={() => handleModalEliminarTarea(tarea)} className="bg-rose-500 px-4 py-3 text-white uppercase font-bold rounded-lg text-sm">
                    eliminar
                </button>)}
            </div>
        </div>
    )
}

export default Tarea