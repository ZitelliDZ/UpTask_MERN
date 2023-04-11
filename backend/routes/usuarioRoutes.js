import express from "express";
import { registrar, autenticar, confirmarEmail, resetPassword, comprobarToken, nuevoPassword, perfil  } from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";



const router = express.Router();

router.post('/', registrar);
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmarEmail);
router.post('/reset-password', resetPassword);
router.route('/reset-password/:token').get(comprobarToken).post(nuevoPassword)


router.get('/perfil',checkAuth, perfil)




export default router