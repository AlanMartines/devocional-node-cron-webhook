module.exports = (sequelize, DataTypes) => {
	const devocionais = sequelize.define('devocionais', {
		descricao: DataTypes.CHAR(255),
		filePath: DataTypes.CHAR(255),
		fileName: DataTypes.CHAR(255),
		fileSize: DataTypes.CHAR(255),
		fileType: DataTypes.CHAR(255),
		extType: DataTypes.CHAR(255),
		data: DataTypes.DATE,
		created: 'TIMESTAMP',
		modified: 'TIMESTAMP',
	});
	return devocionais;
}