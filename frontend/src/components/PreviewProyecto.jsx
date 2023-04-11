import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const PreviewProyecto = ({ proyecto }) => {

    const { auth } = useAuth()
    const { nombre, _id, cliente, creador } = proyecto

    return (
        <div className=" justify-between border-gray-900 border-b-2 hover:bg-white p-5 flex flex-col md:flex-row">
            <div className="flex items-center gap-3">

                <p className="flex-1">
                    {nombre}
                    <span className="text-sm text-gray-500 uppercase">{''} {cliente} </span>
                </p>
                {auth._id !== creador && (
                    <p className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">Colaborador</p>
                )}
            </div>
            <Link to={`${_id}`}
                className=" text-gray-600 hover:text-gray-800 uppercase text-sm font-bold "
            >
                Ver Proyecto
            </Link>

        </div>
    )
}

export default PreviewProyecto