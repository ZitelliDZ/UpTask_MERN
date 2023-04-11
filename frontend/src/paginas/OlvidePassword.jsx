import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Alert from '../components/Alert'
import clienteAxios from '../../config/clienteAxios'

const OlvidePassword = () => {

    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (email === '' || email.length < 6) {
            setAlerta({
                msg: 'El email es obligatorio',
                error: true
            })
            return

        }

        try {
            const url = `/usuarios/reset-password`
            const {data} = await clienteAxios.post(url,{email})
            setAlerta({
                msg: data.msg,
                error: false
            })

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

            <h1 className=' text-slate-800 font-black text-6xl font-bold capitalize'>
                Recuperar Cuenta {' '}
            </h1>
            <div className='mt-5 md:mt-20'>
                {msg && <Alert alerta={alerta} />}

            </div>

            <form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded-lg px-10 py-5'>

                <div className='my-5'>
                    <label htmlFor="email" className=' uppercase text-gray-600 block text-xl font-bold'>Email</label>
                    <input type="email" placeholder='Email de Registro' id='email' name="email" value={email}
                        onChange={e => (setEmail(e.target.value))}
                        className='w-full mt-3 p-3 border rounded-xl bg-gray-10 0'
                    />
                </div>

                <input type="submit" value="enviar instrucciones" className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded-lg hover:cursor-pointer hover:bg-sky-900 transition-colors" />
            </form>

            <nav className='lg:flex lg:justify-between'>
                <Link to="/login" className='block text-center my-5 text-slate-500 uppercase text-sm'>
                    Ya tienes una cuenta? Inicia Sesión
                </Link>
                <Link to="/registrar" className='block text-center my-5 text-slate-500 uppercase text-sm'>
                    Registrate
                </Link>
            </nav>

        </>
    )
}

export default OlvidePassword