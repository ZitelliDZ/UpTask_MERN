import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10 bg-gray-800">
      <p className="text-xl font-bold relative text-white"> Hola Juan</p>
      <Link to='/proyectos' className="mt-5 uppercase border-b-2 border-gray-500 text-white hover:border-white py-2 block text-center "> Proyectos</Link>
      <Link to='crear-proyecto' className="mt-5 uppercase border-b-2 border-gray-500 text-white hover:border-white  py-2 block text-center "> Nuevo Proyecto</Link>
    </aside>
  )
}

export default Sidebar