const {response, request} = require('express');

const usuariosGet = (req = request, res = response) => {

    const {q,nombre = 'no name',apikey} = req.query;

    

    res.status(403).json(
        {
            ok: true,
            msg: "get Api - controlador",
            q,
            nombre,
            apikey
        });
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id;
    res.status(400).json(
        {
            ok: true,
            msg: "put Api - controlador",
            id
        });
}

const usuariosPost = (req, res = response) => {
    const {nombre, edad} = req.body;

    res.status(201).json(
        {
            ok: true,
            msg: "post Api - controlador",
            nombre,
            edad
        });
}

const usuariosDelete = (req, res = response) => {
    res.status(200).json(
        {
            msg: 'Delete api - controlador'
        }
    )
}

const usuariosPatch = (req, res = response) => {
    res.status(403).json(
        {
            ok: true,
            msg: "patch Api - controlador"
        });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}