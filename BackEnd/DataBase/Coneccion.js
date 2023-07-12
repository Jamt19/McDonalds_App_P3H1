const { Sequelize } = require('sequelize');
 const sequelize = new Sequelize('DB_Practica_JS', 'postgres', 'Javier19', {
  host: 'localhost',
  dialect: 'postgres',
  logging:false,
  define:{
    timestamps:false
  }
});
 module.exports = sequelize;