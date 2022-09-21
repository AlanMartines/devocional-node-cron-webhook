
const express = require("express");
const router = express.Router();
//
const { Lista } = require("../functions/listadetransmicao");
//
// ------------------------------------------------------------------------------------------------//
//
router.post('/lista', Lista.sendLista());
//
// ------------------------------------------------------------------------------------------------//
//
module.exports = router;