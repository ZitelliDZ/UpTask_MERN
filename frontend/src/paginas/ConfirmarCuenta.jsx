import { useEffect, useState } from "react"
import { useParams, Link } from 'react-router-dom'
import clienteAxios from "../../config/clienteAxios"
import Alert from "../components/Alert"

const ConfirmarCuenta = () => {

    const { id } = useParams()
    const [alerta, setAlerta] = useState({})
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

    useEffect(() => {

        const confirmarCuenta = async () => {

            try {
                const url = `/usuarios/confirmar/${id}`
                const { data } = await clienteAxios.get(url)

                setAlerta({
                    msg: data.msg,
                    error: false
                })
                setCuentaConfirmada(true)

            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })

            }
        }
        confirmarCuenta()
    }, [])

    const { msg } = alerta

    return (
        <>

            <h1 className=' text-slate-800 font-black text-6xl font-bold capitalize'>
                Confirma tu Email {' '}
            </h1>

            <div className="mt-5 md:mt-20 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <Alert alerta={alerta} />}
                {cuentaConfirmada && (
                    <Link to="/login" className='block text-center my-5 text-slate-500 uppercase text-sm'>
                            Inicia Sesión
                    </Link>
                )}
            </div>
            

        </>
    )
}

export default ConfirmarCuenta