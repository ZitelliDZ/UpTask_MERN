import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import clienteAxios from '../../config/clienteAxios'

const Registrar = () => {

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e => {
        e.preventDefault()
        setAlerta({})
        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios.!',
                error: true
            })
            return;
        }

        if (password !== repetirPassword) {
            setAlerta({
                msg: 'Los passwords no son iguales.!',
                error: true
            })
            return;
        }
        if (password.length < 6) {
            setAlerta({
                msg: 'El password es muy corto.!',
                error: true
            })
            return;
        }

        try {
            const { data } = await clienteAxios.post(`/usuarios`, {
                nombre, email, password
            })

            setAlerta({
                msg: data.msg,
                error: false
            })

            setNombre('')
            setEmail('')
            setPassword('')
            setRepetirPassword('')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })

            return;
        }

    }

    const { msg } = alerta

    return (
        <>

            <h1 className=' text-slate-800 text-6xl font-bold capitalize'>
                Registrarse {' '}
            </h1>

            {msg && <Alert alerta={alerta} />}

            <form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded-lg px-10 py-5'>
                <div className='my-5'>
                    <label htmlFor="nombre" className=' uppercase text-gray-600 block text-xl font-bold'>Nombre</label>
                    <input type="text" placeholder='Tu Nombre' id='nombre' name="nombre"
                        className='w-full mt-3 p-3 border rounded-xl bg-gray-100'
                        value={nombre} onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className='my-5'>
                    <label htmlFor="email" className=' uppercase text-gray-600 block text-xl font-bold'>Email</label>
                    <input type="email" placeholder='Email de Registro' id='email' name="email"
                        className='w-full mt-3 p-3 border rounded-xl bg-gray-100'
                        value={email} onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='my-5'>
                    <label htmlFor="password" className=' uppercase text-gray-600 block text-xl font-bold'>Password</label>
                    <input type="password" placeholder='Password de Registro' id='password' name="password"
                        className='w-full mt-3 p-3 border rounded-xl bg-gray-100'
                        value={password} onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className='my-5'>
                    <label htmlFor="password-confirm" className=' uppercase text-gray-600 block text-xl font-bold'>Repetir Password</label>
                    <input type="password" placeholder='Repetir Password' id='password-confirm' name="password-confirm"
                        className='w-full mt-3 p-3 border rounded-xl bg-gray-100'
                        value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)}
                    />
                </div>

                <input type="submit" value="Crear Cuenta" className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded-lg hover:cursor-pointer hover:bg-sky-900 transition-colors" />
            </form>

            <nav className='lg:flex lg:justify-between'>
                <Link to="/login" className='block text-center my-5 text-slate-500 uppercase text-sm'>
                    Ya tienes una cuenta? Inicia Sesión
                </Link>
                <Link to="/olvide-password" className='block text-center my-5 text-slate-500 uppercase text-sm'>
                    Olvide mi password
                </Link>
            </nav>

        </>
    )
}

export default Registrar