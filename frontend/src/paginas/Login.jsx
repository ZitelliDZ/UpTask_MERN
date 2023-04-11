import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import clienteAxios from '../../config/clienteAxios'

import useAuth from '../../hooks/useAuth'

const Login = () => {




    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const { setAuth } = useAuth()

    const navigate = useNavigate()
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ([email,password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        setAlerta({})
        
        const { msg } = alerta
        try {
           const {data} = await clienteAxios.post(`/usuarios/login`,{
            email,password
           })
           setAlerta({
            msg: data.msg,
            error: false
        })
        localStorage.setItem('token',data.token)
        setAuth(data)
        navigate ('/proyectos')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta

    return (
        <>
            <h1 className=' text-sky-600 font-black text-6xl font-bold capitalize'>
                Inicia Sesion y Administra todos tus {' '}
                <span className=' text-slate-800'>proyectos</span>
            </h1>
            <div className='mt-5 md:mt-20'>
                {msg && <Alert alerta={alerta} />}

            </div>

            <form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded-lg px-10 py-5'>
                <div className='my-5'>
                    <label htmlFor="email" className=' uppercase text-gray-600 block text-xl font-bold'>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Email de Registro' id='email' name="email"
                        className='w-full mt-3 p-3 border rounded-xl bg-gray-100'
                    />
                </div>
                <div className='my-5'>
                    <label htmlFor="password" className=' uppercase text-gray-600 block text-xl font-bold'>Password</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder='Password de Registro' id='password' name="password"
                        className='w-full mt-3 p-3 border rounded-xl bg-gray-100'
                    />
                </div>

                <input type="submit" value="Iniciar Sesión" className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded-lg hover:cursor-pointer hover:bg-sky-900 transition-colors" />
            </form>

            <nav className='lg:flex lg:justify-between'>
                <Link to="/registrar" className='block text-center my-5 text-slate-500 uppercase text-sm'>
                    No tienes una cuenta? Registrate
                </Link>
                <Link to="/olvide-password" className='block text-center my-5 text-slate-500 uppercase text-sm'>
                    Olvide mi password
                </Link>
            </nav>

        </>
    )
}

export default Login