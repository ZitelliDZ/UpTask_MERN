import nodemailer from "nodemailer";

const emailRegistro = async datos => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const info = await transport.sendMail({
    from: '"Proyecto Tareas - Administrador" <cuentas@Task.com>',
    to: email,
    subject: "UpTask - Comprueba tu cuenta",
    text: "Comprueba tu cuenta en UpTask",
    html: `<p>Hola ${nombre} Comprueba tu cuenta en UpTask</p>
      <p>Tu cuenta esta casi lista, solo debes comprobarla en el siguiente enlace:
      
      <a href="${process.env.FRONTEND_URL}/confirmar-email/${token}">Comprobar cuenta</a>
      </p>

      <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
      
      
      `
  })
}

const emailOlvidePassword = async datos => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const info = await transport.sendMail({
    from: '"Proyecto Tareas - Administrador" <cuentas@Task.com>',
    to: email,
    subject: "UpTask - Has Olvidado tu Password",
    text: "Restablece tu Password",
    html: `<p>Hola ${nombre} has olvidado tu password en UpTask</p>
      <p>Presiona el siguiente link para restablecer tu password:
      
      <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer Password</a>
      </p>

      <p>Si tu no has realizado el pedido de restablecimiento, puedes ignorar el mensaje</p>
      
      
      `
  })
}


export {
  emailRegistro,
  emailOlvidePassword
}

export default emailRegistro;