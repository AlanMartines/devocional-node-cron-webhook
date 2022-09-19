module.exports = (sequelize, DataTypes) => {
	const devocionais = sequelize.define('devocionais', {
		descricao: DataTypes.CHAR(255),
		filepath: DataTypes.CHAR(255),
		filename: DataTypes.CHAR(255),
		filesize: DataTypes.CHAR(255),
		filetype: DataTypes.CHAR(255),
		exttype: DataTypes.CHAR(255),
		data: DataTypes.CHAR(50),
		created: 'TIMESTAMP',
		modified: 'TIMESTAMP',
	}, 
	{
		freezeTableName: true,
		tableName: 'devocionais'
	}
	);
	return devocionais;
}
//