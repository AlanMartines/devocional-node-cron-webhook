
const express = require("express");
const cors = require("cors");
const moment = require('moment');
const { logger } = require("./utils/logger");
moment()?.format('YYYY-MM-DD HH:mm:ss');
moment?.locale('pt-br');
const config = require('./config.global');
require('dotenv').config();
const webhook = require('./routes/webhook');
const routers = require('./routes/routers');
require('./functions/crons');
//
const app = express();
//
var corsOptions = {
	origin: "*"
};
//
app.use(cors(corsOptions));
//
// parse requests of content-type - application/json
app.use(express.json());
//
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//
// simple route
app.get("/", async (req, res, next) => {
	//
	logger.info("Server cron started");
	//
	res.status(200).json({
			"erro": false,
			"status": 200,
			"message": "Server cron started"
	});
	//
});
//
app.use('webhook', webhook);
app.use('routers', routers);
//
app.listen(config.PORT, async () => {
	logger.info(`Server cron started on port: ${config.PORT}`);
});
//
process.stdin.resume(); //so the program will not close instantly
//
async function exitHandler(options, exitCode) {
	//
	if (options.cleanup) {
		logger.info("Cleanup");
	}
	//
	if (exitCode || exitCode === 0) {
		console.log(exitCode);
	}
	//
	if (options.exit) {
		process.exit();
	}
} //exitHandler
//
// ------------------------------------------------------------------------------------------------//
//
//do something when sistema is closing
process.on('exit', exitHandler.bind(null, {
	cleanup: true
}));
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {
	exit: true
}));
// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {
	exit: true
}));
process.on('SIGUSR2', exitHandler.bind(null, {
	exit: true
}));
//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {
	exit: true
}));
//
// ------------------------------------------------------------------------------------------------//
//