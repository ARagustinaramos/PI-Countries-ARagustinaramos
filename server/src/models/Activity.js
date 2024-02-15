const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
  sequelize.define('Activity',{
     name:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey:true
     },
     difficulty:{
        type: DataTypes.INTEGER,
        allowNull: false,
     },
     duration: {
        type: DataTypes.INTEGER //horas
     },
     season: {
        type: DataTypes.STRING // estaciones del año
     }
  })}
