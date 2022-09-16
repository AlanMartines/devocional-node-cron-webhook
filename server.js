const cron = require("node-cron");
const express = require("express");
const moment = require('moment');
moment()?.format('YYYY-MM-DD HH:mm:ss');
moment?.locale('pt-br');
const { logger } = require("./utils/logger");
const config = require('./config.global');
const { devocionais } = require('./models');
require('dotenv').config();
//
app = express();
//
// CRON JOB EXECUTANDO DE UM EM UM MINUTO
cron.schedule("* * * * *", async () => { 
	logger.info("Executando a tarefa a cada 1 minuto");
});
//
cron.schedule("0 */1 * * *", async () => {
    // VERIFICAR SE O SITE ESTÁ ONLINE
    // CASO NÃO ESTEJA, PODEMOS ENVIAR UM E-MAIL INFORMANDO
    logger.info("Só será executado em uma hora e repetirá (de 1 em 1 hora) até ser desativado...");
});
//
app.listen(process.env.PORT, () => {
  logger.info(`Server cron started on port: ${process.env.PORT}`);
});
//
process.stdin.resume(); //so the program will not close instantly
//
async function exitHandler(options, exitCode) {

	if (options.cleanup) {
		console.log("- Cleanup");
	}

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