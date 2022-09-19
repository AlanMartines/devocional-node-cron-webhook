module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('devocionais', {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      descricao: {
        allowNull: false,
        type: DataTypes.CHAR(255),
      },
      filepath: {
        allowNull: false,
        type: DataTypes.CHAR(255),
      },
      filename: {
        allowNull: false,
        type: DataTypes.CHAR(255),
      },
      filesize: {
        allowNull: false,
        type: DataTypes.CHAR(255),
      },
      filetype: {
        allowNull: false,
        type: DataTypes.CHAR(255),
      },
      exttype: {
        allowNull: false,
        type: DataTypes.CHAR(255),
      },
      data: {
        allowNull: false,
        type: DataTypes.DATE,
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

  down: (queryInterface) => {
    return queryInterface.dropTable('devocionais');
  }
};