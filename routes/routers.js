
const express = require("express");
const { logger } = require("../utils/logger");
const router = express.Router();
//
// ------------------------------------------------------------------------------------------------//
//
router.get("/", async (req, res, next) => {
	//
	logger.info("Router");
	//
	res.status(200).json({
			"erro": false,
			"status": 200,
			"message": "Router"
	});
	//
});
//
// ------------------------------------------------------------------------------------------------//
//
module.exports = router;