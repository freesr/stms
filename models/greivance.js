const mongoose=require('mongoose');

const gSchema=new mongoose.Schema({
    id:{type:String},
    subject:{type:String},
    message:{type:String}
});

const Grive=mongoose.model('Grev',gSchema);
module.exports=Grive;


module.exports.getgreve=function(){
   return Grive.find({})
}

module.exports.saveGrive=function(grive
){
    grive.save(cb).then(d=>{
        console.log(d);
    })
    .catch(err=>{
        console.log(err);
    })
}