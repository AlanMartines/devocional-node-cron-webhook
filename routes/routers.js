const express = require("express");
const fs = require('fs-extra');
const axios = require('axios');
const moment = require('moment');
const { default: pQueue } = require('p-queue');
const { logger } = require("../utils/logger");
const { devocionais, listatransmissao } = require('../models');
moment()?.format('YYYY-MM-DD HH:mm:ss');
moment?.locale('pt-br');
const config = require('../config.global');
require('dotenv').config();
//
const router = express.Router();
//
// ------------------------------------------------------------------------------------------------//
//
const queue = new pQueue({ concurrency: 1 });
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
router.get("/listadetransmicao", async (req, res, next) => {
	//
	logger.info("Executando envio da lista do devocional");
	//
	const date_now = moment(new Date())?.format('YYYY-MM-DD');
	await devocionais.findOne({
		attributes: ['descricao', 'filepath', 'filename', 'filesize', 'filetype', 'exttype', 'data'],
		where: {
			data: date_now
		},
		//
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
			await listatransmissao.findAll({
				attributes: ['numero', 'ativo'],
			}).then(async (rows) => {
				//
				if (rows) {
					//
					//logger.info(rows);
					rows.forEach(async (result) => {
						const numero = result.numero;
						const ativo = result.ativo;
						//
						if (ativo) {
							//
							(async () => {
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
									await axios.post(`${config.URL_API_WHATSAPP}/sistema/Status`, Status, axiosConfig).then(async (response) => {
										logger.info("Whatsapp status");
										if (response?.data?.Status?.status == 'isLogged' || response?.data?.Status?.status == 'qrReadSuccess' || response?.data?.Status?.status == 'chatsAvailable' || response?.data?.Status?.status == 'inChat') {
											logger.info(`Status ${response?.data?.Status?.status}`);
											//
											logger.info(`Enviando para ${numero}`);
											const sendText = {
												AuthorizationToken: config.TOKEN_API_WHATSAPP,
												SessionName: config.TOKEN_API_WHATSAPP,
												phonefull: numero,
												msg: "*Devocional da Graça*\n*Data:* " + resultDate + "\n*Tema:* " + descricao
											};
											//
											await axios.post(`${config.URL_API_WHATSAPP}/sistema/sendText`, sendText, axiosConfig).then(async (response) => {
												logger.info("Enviando menssagem de texto");
												if (response?.data?.Status?.status == 200) {
													logger.info("Menssagem de texto enviada com sucesso");
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
													await axios.post(`${config.URL_API_WHATSAPP}/sistema/sendVoiceFromBase64`, sendVoiceBase64, axiosConfig).then(async (response) => {
														logger.info("Enviando menssagem de audio");
														if (response?.data?.Status?.status == 200) {
															logger.info("Menssagem de audio enviada com sucesso");
														}
													}).catch(async (error) => {
														logger.error("Erro ao enviar menssagem de audio");
														logger.error(error);
													});
													//
												}
											}).catch(async (error) => {
												logger.error("Erro enviar menssagem de texto");
												logger.error(error);
											});
											//
										}else{
											logger.info(`Status ${response?.data?.Status?.status}`);
										}
									}).catch(async (error) => {
										logger.error("Erro ao obter status");
										logger.error(error);
									});
									//
								});
							})();
							//
						}
						//
					});
					//
				} else {
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