
const express = require("express");
const router = express.Router();
//
const listadetransmicao = require("../functions/listadetransmicao");
//
// ------------------------------------------------------------------------------------------------//
//
router.get('/lista', listadetransmicao.sendLista );
//
// ------------------------------------------------------------------------------------------------//
//
module.exports = router;