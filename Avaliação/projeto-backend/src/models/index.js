const Sequelize = require('sequelize');

const sequelize = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    storage: './database.sqlite',
    define: {
        timestamps: true,
        freezeTableName: true,
    }
});

/*******
 * TODO: Definição dos modelos.
 * Defina aqui os modelos a serem mapeados para entidades do banco de dados.
 *******/
const Usuario = sequelize.define('usuario', {
    id: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true,
    },
    nome: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    senha: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    nascimento: Sequelize.DATEONLY,
    email: {
        type: Sequelize.STRING(200),
        unique: true,
    }
    
});

const Tarefa = sequelize.define('tarefa', {
    id: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true,
    },
    nome: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    marcarTarefa: Sequelize.BOOLEAN
})

/*******
 * TODO: Definição das relações.
 * Defina aqui os relacionamentos entre os modelos.
 *******/

Usuario.hasMany(Tarefa, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
})

Tarefa.belongsTo(Usuario, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
})

module.exports = {
    sequelize,
    Usuario,
    Tarefa,
};
