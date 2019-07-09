const mongoose=require('mongoose');
const routesSchema=new mongoose.Schema({
    busno:{
        
        type:String
    },
    route:{
        type:String
    },
    drivername:{
        type:String
    },
    phone:{
        type:Number
    },
    time:{
        type:String
    },
    stops:{
        type:[String]
    },
    mapurl:{
        tupe:String
    }

},{timestamps:true});

const rout=mongoose.model('rout',routesSchema);
module.exports=rout;


module.exports.setBus=function(no){
return rout.findOne({busno:no});
}

