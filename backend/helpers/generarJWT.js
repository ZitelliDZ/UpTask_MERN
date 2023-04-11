import jwt from "jsonwebtoken"

//Generar jesonWebToken
const generarJWT = (id) => {

    return jwt.sign({ id: id }
        , process.env.JWT_SECRET, {
        expiresIn: "1d"
    }
    );
}

export { generarJWT }

export default generarJWT;