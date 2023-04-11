import mongoose from "mongoose";
import bcrypt from "bcrypt"

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token: {
        type: String,
    },
    confirmado: {
        type: Boolean,
        default: false,
        trim: true
    },
},
    {
        timestamps: true,
    }
);


//Antes de realizar el guardado
usuarioSchema.pre('save', async function (next) {
    
    //Comprueba que no se quiere modificar el password
    if (!this.isModified('password')) {
        next();
    }
    //Hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

})

//Comprobar Password
usuarioSchema.methods.comprobarPassword = async function (passwordForm) {
    
    return await bcrypt.compare(passwordForm,this.password);
}


const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
