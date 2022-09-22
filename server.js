const fs = require('fs-extra');
const cron = require("node-cron");
const express = require("express");
const cors = require("cors");
const axios = require('axios');
const moment = require('moment');
const { default: pQueue } = require('p-queue');
const { logger } = require("./utils/logger");
const { devocionais, listatransmissao } = require('./models');
moment()?.format('YYYY-MM-DD HH:mm:ss');
moment?.locale('pt-br');
const config = require('./config.global');
require('dotenv').config();
//
const app = express();
//
const queue = new pQueue({ concurrency: 1 });
//
cron.schedule("30 5 * * *", async () => {
	logger.info("Executando envio da lista do devocional");
	//
	const date_now = moment(new Date())?.format('YYYY-MM-DD');
	await devocionais.findOne({
		attributes: ['descricao', 'filepath', 'filename', 'filesize', 'filetype', 'exttype', 'data'],
		where: {
			data: date_now
		},
	}).then(async (rows) => {
		if (rows) {
			//
			const descricao = rows?.descricao;
			const filepath = rows?.filepath;
			const filename = rows?.filename;
			const filetype = rows?.filetype;
			//
			const [year, month, day] = date_now.split('-');
			const resultDate = [day, month, year].join('/');
			//
			const contentsBase64 = await fs.readFile(`${filepath}/${filename}`, { encoding: 'base64' });
			//
			//logger.info(findOne?.dataValues);
			await listatransmissao.findAll({
				attributes: ['numero', 'ativo'],
			}).then(async (rows) => {
				//
				if (rows) {
					//
					//logger.info(rows);
					rows.forEach(async (result) => {
						var numero = result.numero;
						var ativo = result.ativo;
						//
						if (ativo) {
							await queue.add(async () => {
								//
								const axiosConfig = {
									headers: {
										'Content-Type': 'application/json; charset=UTF-8',
										"Access-Control-Allow-Origin": "*",
									},
									maxContentLength: Infinity,
									maxBodyLength: Infinity
								};
								//
								const Status = {
									AuthorizationToken: config.TOKEN_API_WHATSAPP,
									SessionName: config.TOKEN_API_WHATSAPP
								};
								//
								await axios.post('http://127.0.0.1:9009/sistema/Status', axiosConfig, Status).then(async (response) => {
									logger.info("Devocional, whatsapp status");
									if (response.data.Status.status == 'isLogged' || response.data.Status.status == 'qrReadSuccess' || response.data.Status.status == 'chatsAvailable' || response.data.Status.status == 'inChat') {
										//
										const sendText = {
											AuthorizationToken: config.TOKEN_API_WHATSAPP,
											SessionName: config.TOKEN_API_WHATSAPP,
											phonefull: numero,
											msg: "*Devocional da Graça*\n*Data:* " + resultDate + "\n*Tema:* " + descricao
										};
										//
										await axios.post('http://127.0.0.1:9009/sistema/sendText', sendText, axiosConfig).then(async (response) => {
											logger.info("Devocional, enviando menssagem de texto");
											if (response.data.Status.status == 200) {
												//
												const sendVoiceBase64 = {
													AuthorizationToken: config.TOKEN_API_WHATSAPP,
													SessionName: config.TOKEN_API_WHATSAPP,
													phonefull: numero,
													base64: contentsBase64,
													mimetype: filetype,
													originalname: filename
												};
												//
												await axios.post('http://127.0.0.1:9009/sistema/sendVoiceFromBase64', sendVoiceBase64, axiosConfig).then(async (response) => {
													logger.info("Devocional, enviando menssagem de audio");
													if (response.data.Status.status == 200) {
														logger.info(response.data);
													}
												}).catch(async (error) => {
													logger.error("Devocional, enviando menssagem de audio");
													logger.error(error);
												});
												//
											}
										}).catch(async (error) => {
											logger.error("Devocional, enviando menssagem de texto");
											logger.error(error);
										});
										//
									}
								}).catch(async (error) => {
									logger.error("Devocional, whatsapp status");
									logger.error(error);
								});
							});
						}
					});
					//
				}
				//
			}).catch(async (err) => {
				logger.error(err.message);
				return false;
			});
			//
		}
	}).catch(async (err) => {
		logger.error(err.message);
	});
	//
	logger.info("Lista executada com sucesso");
	//
});
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
	logger.info("Executando envio da lista do devocional");
	//
	const date_now = moment(new Date())?.format('YYYY-MM-DD');
	await devocionais.findOne({
		attributes: ['descricao', 'filepath', 'filename', 'filesize', 'filetype', 'exttype', 'data'],
		where: {
			data: date_now
		},
	}).then(async (rows) => {
		if (rows) {
			//
			const descricao = rows?.descricao;
			const filepath = rows?.filepath;
			const filename = rows?.filename;
			const filetype = rows?.filetype;
			//
			const [year, month, day] = date_now.split('-');
			const resultDate = [day, month, year].join('/');
			//
			const contentsBase64 = await fs.readFile(`${filepath}/${filename}`, { encoding: 'base64' });
			//
			//logger.info(findOne?.dataValues);
			await listatransmissao.findAll({
				attributes: ['numero', 'ativo'],
				where: {
					numero: '5567996787854'
				},
			}).then(async (rows) => {
				//
				if (rows) {
					//
					//logger.info(rows);
					rows.forEach(async (result) => {
						var numero = result.numero;
						var ativo = result.ativo;
						//
						if (ativo) {
							await queue.add(async () => {
								//
								const axiosConfig = {
									responseType: 'json',
									maxContentLength: Infinity,
									maxBodyLength: Infinity
								};
								//
								const Status = {
									AuthorizationToken: config.TOKEN_API_WHATSAPP,
									SessionName: config.TOKEN_API_WHATSAPP
								};
								//
								await axios.post('http://127.0.0.1:9009/sistema/Status', axiosConfig, Status).then(async (response) => {
									logger.info("Devocional, whatsapp status");
									if (response.data.Status.status == 'isLogged' || response.data.Status.status == 'qrReadSuccess' || response.data.Status.status == 'chatsAvailable' || response.data.Status.status == 'inChat') {
										//
										const sendText = {
											AuthorizationToken: config.TOKEN_API_WHATSAPP,
											SessionName: config.TOKEN_API_WHATSAPP,
											phonefull: numero,
											msg: "*Devocional da Graça*\n*Data:* " + resultDate + "\n*Tema:* " + descricao
										};
										//
										await axios.post('http://127.0.0.1:9009/sistema/sendText', sendText, axiosConfig).then(async (response) => {
											logger.info("Devocional, enviando menssagem de texto");
											if (response.data.Status.status == 200) {
												//
												const sendVoiceBase64 = {
													AuthorizationToken: config.TOKEN_API_WHATSAPP,
													SessionName: config.TOKEN_API_WHATSAPP,
													phonefull: numero,
													base64: contentsBase64,
													mimetype: filetype,
													originalname: filename
												};
												//
												await axios.post('http://127.0.0.1:9009/sistema/sendVoiceFromBase64', sendVoiceBase64, axiosConfig).then(async (response) => {
													logger.info("Devocional, enviando menssagem de audio");
													if (response.data.Status.status == 200) {
														logger.info(response.data);
													}
												}).catch(async (error) => {
													logger.error("Devocional, enviando menssagem de audio");
													logger.error(error);
												});
												//
											}
										}).catch(async (error) => {
											logger.error("Devocional, enviando menssagem de texto");
											logger.error(error);
										});
										//
									}
								}).catch(async (error) => {
									logger.error("Devocional, whatsapp status");
									logger.error(error);
								});
							});
						}
					});
					//
				}else{
					logger.error('Nenhum numero para envio encontrado');
				}
				//
			}).catch(async (err) => {
				logger.error(err.message);
			});
			//
		}
	}).catch(async (err) => {
		logger.error(err.message);
	});
	//
	logger.info("Lista executada com sucesso");
	//
	res.json({ message: "Lista executada com sucesso" });
});
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
		console.log("- Cleanup");
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