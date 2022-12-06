const Sequelize= require('sequelize');
const sequelize= require('../database');

// const Expanse= sequelize.define('expanse',{
//     id:{type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//     primaryKey:true},
//     expanseamt:Sequelize.INTEGER,
// description:Sequelize.STRING,
// category:Sequelize.STRING
// })


// module.exports=Expanse;



const Expanse= sequelize.define('expanse',{
    id:{type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
    },
    ammount:{type:Sequelize.DOUBLE,
    allowNull:false
    },
category:Sequelize.STRING,
description:Sequelize.STRING
    
    })
    
    module.exports=Expanse;