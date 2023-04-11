import useProyectos from "../../hooks/useProyectos"
import PreviewProyecto from "../components/PreviewProyecto"
import Alert from "../components/Alert"


const Proyectos = () => {

  const { proyectos,alerta } = useProyectos()



 const {msg} = alerta


  
  return (
    <>
      <h1 className='text-4xl font-black text-white'>Proyectos</h1>
      
      {msg && <Alert alerta={alerta} />}
      <div className=" bg-gray-200  shadow rounded-lg mt-10">

        {proyectos.length ?
          (
            proyectos.map(proyecto => (
              <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
            ))

          )
          :

          <p className="mt-5 bg-gray-200 rounded-lg text-center text-gray-600 uppercase py-10">No hay Proyectos aún.</p>
        }
      </div>

    </>
  )
}

export default Proyectos