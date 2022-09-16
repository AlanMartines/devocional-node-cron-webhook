const config = require('../config.global');
//https://stackoverflow.com/questions/61257195/sequelize-associations-between-two-tables
module.exports = {
	dialect: config.MYSQL_DIALECT,
	host: config.MYSQL_HOST,
	port: config.MYSQL_PORT,
	username: config.MYSQL_USER,
	password: config.MYSQL_PASSWORD,
	database: config.MYSQL_DATABASE,
	logging: false,
	define: {
		timestamps: false,
		underscored: true,
		underscoredAll: true,
		freezeTableName: false,
		syncOnAssociation: true,
		charset: 'utf8',
		collate: 'utf8_general_ci'
	},
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
}