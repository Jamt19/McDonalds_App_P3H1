const { Sequelize } = require('sequelize');
 const sequelize = new Sequelize('oqoierad', 'oqoierad', '6zNBOQ3f5VL31DFobkeT-fMhGs9BHtS1', {
  host: 'stampy.db.elephantsql.com',
  dialect: 'postgres',
  logging:false,
  define:{
    timestamps:false
  }
});
 module.exports = sequelize;