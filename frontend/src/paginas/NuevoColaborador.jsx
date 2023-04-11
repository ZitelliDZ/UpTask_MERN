import FormularioColaborador from "../components/FormularioColaborador"
import { useEffect } from "react"
import useProyectos from "../../hooks/useProyectos"
import { useParams } from "react-router-dom"
import Alert from "../components/Alert"

const NuevoColaborador = () => {


  const { obtenerProyecto,proyecto, cargarndo ,colaborador ,alerta, agregarColaborador} = useProyectos()
  const params = useParams()

  useEffect(() => {
    

    obtenerProyecto(params.id)
    
  }, [colaborador])
  
  
  if (!proyecto?._id) return <Alert alerta={alerta} />
  
  
  return (
    <>
        <h1 className=" text-white text-4xl font-black">Añadir Colaborador(a) al Proyecto:  {proyecto.nombre}</h1>
        <div className="mt-10 flex  justify-center">
            <FormularioColaborador />

        </div>

        {cargarndo ? '<p className="text-center text-white">Cargando...</p>' : colaborador?._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-xl  shadow-xl w-full">
              <h2 className=" text-center mb-10 textt-2xl font-bold ">Resultado: </h2>

              <div className="flex justify-between items-center">
                <p>{colaborador.nombre}</p>
                <button onClick={e=>agregarColaborador({email:colaborador.email})} type="button" className=" bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm" >
                Agregar al Proyecto
              </button>
              </div>
              
            </div>
          </div>
        )}
    </>
  )
}

export default NuevoColaborador