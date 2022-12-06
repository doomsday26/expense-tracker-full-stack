const Expanse = require('../models/expanseModel');
exports.getExpanses=async(req,res,next)=>{
let expanses= await Expanse.findAll();
console.log(expanses);
res.json(expanses);
}
exports.addExpanse= async(req,res,next)=>{
    console.log(req.body);
    console.log("we are in ");
  await  Expanse.create({
        ammount:req.body.ammount,
        description: req.body.description,
        category:req.body.category
    }).then(result=>{console.log(result);res.json(result)}).catch(err=>{console.log(err);console.log("code wasnt executed");});
}
exports.getOneExpanse=async (req,res,next)=>{
    let id = req.params.expanseId;
 Expanse.findByPk(id).then(result=>{console.log(result);res.json(result)}).catch(err=>{console.log(err);})

}
exports.deleteExpanse= async (req,res,next)=>{
    const id = req.params.expanseId;
 Expanse.findByPk(id).then(expanse=>{ return expanse.destroy()}).then(result=>{console.log("objext deleted"); console.log(result);res.send(result)}).catch(err=>{console.log(err);})
}
exports.updateExpanse= async (req,res,next)=>{
    let id = req.params.expanseId;
await(Expanse.findByPk(id)).then(
expanse=>{
    expanse.ammount= req.body.ammount;
    expanse.description= req.body.description;
    expanse.category= req.body.category;
return expanse.save();
}).then(result=>{console.log("result updated:");console.log(result);res.json(result)}).catch(err=>{console.log(err);}) 
}