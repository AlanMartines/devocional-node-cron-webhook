
const express = require("express");
const { logger } = require("../utils/logger");
const router = express.Router();
//
// ------------------------------------------------------------------------------------------------//
//
router.get("/tst", async (req, res, next) => {
	//
	logger.info("Router tst");
	//
	res.status(200).json({
			"erro": false,
			"status": 200,
			"message": "Server cron started tst"
	});
	//
});
//
// ------------------------------------------------------------------------------------------------//
//
module.exports = router;