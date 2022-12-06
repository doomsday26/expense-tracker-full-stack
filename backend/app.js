const express= require('express');
const controllers= require('./controllers/controllers')
const bodyParser= require('body-parser')
const sequelize= require('./database');
const{urlencoded}= require('body-parser')
const app= express();
var cors= require('cors');
app.use(cors());
app.use(bodyParser.json(),urlencoded({extended:true}))

app.get('/',controllers.getExpanses);
app.post('/',controllers.addExpanse)
app.get('/:expanseId',controllers.getOneExpanse)
app.delete('/:expanseId',controllers.deleteExpanse)
app.put('/:expanseId',controllers.updateExpanse)











sequelize.sync().then(result=>{console.log(result);}).catch(err=>{console.log(err);})
app.listen(4000,()=>{console.log('port running on 4000');})