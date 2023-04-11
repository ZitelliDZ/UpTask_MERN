import FormularioProyecto from "../components/FormularioProyecto"

const NuevoProyecto = () => {
  return (
    <>
      <h1 className='text-4xl font-black text-white'>NuevoProyecto</h1>
      <div className="mt-10 flex justify-center ">
        <FormularioProyecto />
      </div>
    </>
  )
}

export default NuevoProyecto