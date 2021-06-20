const { response } = require("express");
const Usuario = require('../models/usuario');

const bcrypt = require('bcryptjs');
const { generarJwt } = require("../helpers/generar-jwt");

const login = async(req, res = response) => {

  const { correo,contrasena } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({correo});
    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario / Contraseña no son correctos - correo'
      });
    }
    // Verificar si el usuario esta activo en la bd
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario / Contraseña no son correctos - estado - false'
      });
    }
    // Verificar la contraseña

    const validPassword = bcrypt.compareSync(contrasena, usuario.contrasena);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Contraseña no son correctos - password'
      });
    }

    // Generar jwt
    const token = await generarJwt(usuario.id);

    res.json({
      usuario,
      token
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Algo salio mal'
    })
  }

  
}

module.exports = {
  login
}