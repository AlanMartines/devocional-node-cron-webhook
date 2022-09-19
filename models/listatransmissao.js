module.exports = (sequelize, DataTypes) => {
	const listatransmissao = sequelize.define('listatransmissao', {
		numero: DataTypes.CHAR(255),
		ativo: DataTypes.BOOLEAN,
		created: 'TIMESTAMP',
		modified: 'TIMESTAMP',
	}, 
	{
		freezeTableName: true,
		tableName: 'listatransmissao'
	}
	);
	return listatransmissao;
}