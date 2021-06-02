const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    //   const usuarios = await Usuario.find(query)
    //     .skip(+desde)
    //     .limit(+limite);

    //   const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(+desde)
            .limit(+limite),
    ]);

    res.status(200).json({
        total,
        usuarios,
    });
};

const usuariosPut = async (req, res = response) => {
    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra base de datos
    if (password) {
        const salt = bcrypt.genSaltSync();
        resto.contrasena = bcrypt.hashSync(contrasena, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(400).json({
        ok: true,
        msg: "put Api - controlador",
        usuario,
    });
};

const usuariosPost = async (req, res = response) => {
    const { nombre, correo, contrasena, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, contrasena, rol });

    // Encriptar la contrasena
    const salt = bcrypt.genSaltSync();
    usuario.contrasena = bcrypt.hashSync(contrasena, salt);
    // Guardar usuario en bd
    await usuario.save();

    res.json({
        msg: "post api",
        usuario,
    });
};

const usuariosDelete = async (req, res = response) => {

     // Fisicamente lo borramos de la bd
     const { id } = req.params;
    //  const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    res.status(200).json({
        usuario
    });
};

const usuariosPatch = async (req, res = response) => {

   
    res.status(403).json({
        ok: true,
        msg: "patch Api - controlador",
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
};
