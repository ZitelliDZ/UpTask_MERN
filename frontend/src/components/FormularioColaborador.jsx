import Alert from "./Alert"
import useProyectos from "../../hooks/useProyectos"
import { useState } from "react"

const FormularioColaborador = () => {


    const [email,setEmail] = useState('')
    const {alerta,mostrarAlerta,submitColaborador } = useProyectos()

    const handleSubmit = e =>{
        e.preventDefault() 
        if ([email].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        submitColaborador(email)
    }
    const {msg} = alerta
    return (
        <form
        onSubmit={handleSubmit}
        className={`bg-white ${msg ? 'pb-10' : 'py-10'} px-5 w-full md:w-1/2 shadow-lg rounded-xl`}>
            {msg && <Alert alerta={alerta} />}

            <div className="mb-5">
                <label htmlFor="email" className='text-gray-700 uppercase font-bold text-sm' >Email Colaborador</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="text" className='border-2 w-full p-2 mt-2 placeholder-gray-600 rounded-md' id='email' placeholder='Email del Usuario.' />
            </div>
            
            <input type="submit" className="bg-sky-800 block p-3 uppercase font-bold text-white rounded-lg w-full cursor-pointer hover:bg-sky-600 transition-colors" value={'Buscar Colaborador'} />

        </form>
    )
}

export default FormularioColaborador