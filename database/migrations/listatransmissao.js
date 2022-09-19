module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('listatransmissao', {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      numero: {
        allowNull: false,
				unique: true,
        type: DataTypes.CHAR(255),
      },
      ativo: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
				defaultValue: 0,
      },
      created: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      modified: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },
	//
  down: (queryInterface) => {
    return queryInterface.dropTable('listatransmissao');
  }
};