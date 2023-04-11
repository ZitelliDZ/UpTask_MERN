import Usuario from "../models/Usuario.js"
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import {emailRegistro,emailOlvidePassword} from "../helpers/email.js";
 


const registrar = async (req, res) => {

    //Comprobar que no exista alguien registrado
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email: email })

    if (existeUsuario) {
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({ msg: error.message })
    }

    //registrar
    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId();
        const usuarioAlmacenado = await usuario.save()

        emailRegistro({
            email: usuarioAlmacenado.email,
            nombre: usuarioAlmacenado.nombre,
            token: usuarioAlmacenado.token
        })

        res.json({
            msg: 'Usuario almacenado correctamente, Revisa tu email para confirmar tu cuenta!.',
        })
    } catch (error) {
        console.log(error)
    }
}


const autenticar = async (req, res) => {

    //Comporbar si el usuario existe
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email: email })

    if (!usuario) {
        const error = new Error('Usuario no está registrado!')
        return res.status(404).json({ msg: error.message })
    }

    //Comprobar si confirmo email
    if (!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada!')
        return res.status(403).json({ msg: error.message })
    }

    //Comprobar su password
    if (await usuario.comprobarPassword(password)) {

        res.json({
            msg: 'Logueado con Exito!',
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        })

    } else {
        const error = new Error('El email o el password es incorrecto!')
        return res.status(403).json({ msg: error.message })
    }

}

//confirma su cuenta mediante el email
const confirmarEmail = async (req, res) => {

    const { token } = req.params;
    const usuarioConfirmar = await Usuario.findOne({ token: token })

    if (!usuarioConfirmar) {
        const error = new Error('Token no válido!')
        return res.status(403).json({ msg: error.message })
    }


    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = '';
        await usuarioConfirmar.save();
        res.json({
            msg: 'Usuario confirmado correctamente!.'
        })
    } catch (error) {
        console.log(error)
    }


}


//Reset Password - Generar Token
const resetPassword = async (req, res) => {

    const { email } = req.body;
    const usuario = await Usuario.findOne({ email: email })

    if (!usuario) {
        const error = new Error('Usuario no está registrado!')
        return res.status(403).json({ msg: error.message })
    }

    try {
        usuario.token = generarId()
        await usuario.save();

        emailOlvidePassword({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })
        res.json({
            msg: 'Se ha enviado un email para el cambio de contraseña!.'
        })
    } catch (error) {
        console.log(error);
    }

}

//Reset Password - Comprobar Token
const comprobarToken = async (req, res) => {

    const { token } = req.params;
    const tokenValido = await Usuario.findOne({ token: token })

    if (!tokenValido) {
        const error = new Error('El token no es válido!.')
        return res.status(403).json({ msg: error.message })
    }

    try {
        res.json({
            msg: 'Token válido y usuario existe!.'
        })
        return
    } catch (error) {
        console.log(error);
        
    }

}


//Cambio de Password 
const nuevoPassword = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    try {


        const usuario = await Usuario.findOne({ token: token })

        if (!usuario) {
            const error = new Error('El token no es válido!.')
            return res.status(403).json({ msg: error.message })
        } else {
            usuario.password = password;
            usuario.token = '';
            await usuario.save();
            res.json({
                msg: 'Password modificado con exito!.'
            })
        }

    } catch (error) {
        console.log(error)
    }


}


//Cambio de Password 
const perfil = async (req, res) => {
    const { usuario } = req

    return res.json(usuario)
}




export {
    registrar,
    autenticar,
    confirmarEmail,
    resetPassword,
    comprobarToken,
    nuevoPassword,
    perfil
}