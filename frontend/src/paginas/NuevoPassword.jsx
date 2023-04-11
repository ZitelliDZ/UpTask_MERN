import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import clienteAxios from '../../config/clienteAxios'
import Alert from '../components/Alert'

const NuevoPassword = () => {

    const { token } = useParams()
    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordMod, setPasswordMod] = useState(false)



    useEffect(() => {

        const comprobarToken = async () => {
            try {
                const url = `/usuarios/reset-password/${token}`

                const { data } = await clienteAxios(url)

                setTokenValido(true)
            } catch (error) {
                setTokenValido(false)

                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        comprobarToken()

    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== passwordConfirm) {
            setAlerta({
                msg: 'Los password no coinciden.',
                error: true
            })
            return;
        }
        if (password.length < 6) {
            setAlerta({
                msg: 'Password es muy corto.',
                error: true
            })
            return;
        }

        try {
            const url = `/usuarios/reset-password/${token}`

            const { data } = await clienteAxios.post(url, { password })
            setAlerta({
                msg: data.msg,
                error: false
            })
            setPasswordMod(true)
        } catch (error) {
            setPasswordMod(false)
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const [] = useState()

    const { msg } = alerta

    return (
        <>

            <h1 className=' text-slate-800 font-black text-6xl font-bold capitalize'>
                Reestablece tu Password {' '}
            </h1>
            <div className='mt-5 md:mt-20'>
                {msg && <Alert alerta={alerta} />}

            </div>
            {tokenValido && (
                <>
                    <form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded-lg px-10 py-5'>

                        <div className='my-5'>
                            <label htmlFor="password" className=' uppercase text-gray-600 block text-xl font-bold'>Password</label>
                            <input type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder='Password de Registro' id='password' name="password"
                                className='w-full mt-3 p-3 border rounded-xl bg-gray-10 0'
                            />
                        </div>
                        <div className='my-5'>
                            <label htmlFor="password-confirm" className=' uppercase text-gray-600 block text-xl font-bold'>Repetir Password</label>
                            <input type="password" placeholder='Repetir Password' id='password-confirm' name="password-confirm" value={passwordConfirm}
                                onChange={e => setPasswordConfirm(e.target.value)}
                                className='w-full mt-3 p-3 border rounded-xl bg-gray-10 0'
                            />
                        </div>
                        {passwordMod ? '':(
                            <input type="submit" value="Cambiar Password" className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded-lg hover:cursor-pointer hover:bg-sky-900 transition-colors" />
                        )}
                        
                    </form>



                    {passwordMod ? (
                        <Link to="/login" className='block text-center my-5 text-slate-500 uppercase text-sm'>
                            Inicia Sesión
                        </Link>
                    ) : (<nav className='lg:flex lg:justify-between'>
                        <Link to="/login" className='block text-center my-5 text-slate-500 uppercase text-sm'>
                            Ya tienes una cuenta? Inicia Sesión
                        </Link>
                        <Link to="/registrar" className='block text-center my-5 text-slate-500 uppercase text-sm'>
                            Registrate
                        </Link>
                    </nav>)}
                </>

            )}



        </>
    )
}

export default NuevoPassword