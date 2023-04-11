import useProyectos from "../../hooks/useProyectos"

const Colaborador = ({colaborador}) => {

    const {nombre,email} = colaborador
    const { handleModalEliminarColaborador} = useProyectos()

  return (
    <div className="flex flex-col sm:flex-row gap-5
    sm:gap-0 border-b p-5 justify-between items-center">
        {colaborador.nombre}
        <div>
            <p>{nombre}</p>
            <p className="text-sm text-gray-700">{email}</p>
        </div>
        <div>
            <button type="button" onClick={e=>handleModalEliminarColaborador(colaborador)} className=" bg-rose-600 text-white px-4 py-3 uppercase font-bolt text-sm rounded-lg " >Eliminar</button>
        </div>
    </div>
  )
}

export default Colaborador