
const express = require("express");
const { logger } = require("../utils/logger");
const router = express.Router();
//
// ------------------------------------------------------------------------------------------------//
//
router.get("/listatransmicao", async (req, res, next) => {
	//
	logger.info("Executando lista de transmição");
	//
	res.status(200).json({
			"erro": false,
			"status": 200,
			"message": "Lista executada com sucesso."
	});
	//
});
//
// ------------------------------------------------------------------------------------------------//
//
module.exports = router;