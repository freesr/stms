const mongoose=require('mongoose');
const fineSchema=new mongoose.Schema({
    id:{
        type:String
    },
    date:{
        type:String
    },
    reason:{
        type:String,
        default:'no bus card'
    },
    amount:{
        type:Number,
        default:200

    }

});

const fine=mongoose.model("fine",fineSchema);
module.exports=fine;

module.exports.UserFines=function(id){
    return fine.find({id:id})
}