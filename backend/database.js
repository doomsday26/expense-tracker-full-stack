const Sequelize = require('sequelize');
const sequelize= new  Sequelize('expansetracker','root','harsh226748',{dialect:'mysql',host:'localhost'

})
module.exports= sequelize;