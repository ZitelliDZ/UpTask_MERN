import { Link, useNavigate } from "react-router-dom"
import useProyectos from "../../hooks/useProyectos"
import useAuth from "../../hooks/useAuth"
import Buscador from "./Buscador"


const Header = () => {

  const { handleBuscador,cerrarSessionProyectos } = useProyectos()
  const { cerrarSessionAuth } = useAuth()
  const navigate = useNavigate()

  const handleCerrarSession = ()=>{
    cerrarSessionAuth()
    cerrarSessionProyectos()
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-teal-700 font-black text-center mb-5 md:mb-0">UpTask</h2>



        <div className="flex flex-col md:flex-row items-center gap-4">
          <button type="button" onClick={handleBuscador} className="font-bolt uppercase">Buscar Proyectos</button>
          <Link to='/proyectos' className="font-bolt uppercase" >Proyectos</Link>
          <button onClick={handleCerrarSession} className="text-white text-sm bg-sky-600 p-3 rounded-lg uppercase font-bold" type="button">Cerrar Sesión</button>
        </div>
      </div>

      <Buscador  />

    </header>
  )
}

export default Header