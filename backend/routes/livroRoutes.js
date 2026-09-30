const express = require("express");

const router = express.Router();

const {
    listarLivros,
    buscarLivro,
    cadastrarLivro
} = require("../controllers/livroController");


router.get(
    "/",
    listarLivros
);


router.get(
    "/:id",
    buscarLivro
);


router.post(
    "/",
    cadastrarLivro
);


module.exports = router;