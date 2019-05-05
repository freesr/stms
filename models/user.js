var mongoose = require('mongoose');
//for email
//var email = require('mongoose-type-email');
 
var userSchema = new mongoose.Schema({
 
    id: {
 
        type: String,
    },
 
    name: {
        type: String,
    },
 
    email: {
        type: String,
    },
 
    busno: {
        type: String,
    },
 
    branch: {
        type: String,
    },
 
    stop: {
        type: String,
    },
    study_year:{
        type:Number,
        max:4
    },
    password:{
        type:String
    }
 
},{timestamps:true});

var user = mongoose.model("user", userSchema);
module.exports = user;

module.exports.createUser=function(newUser,cb){
    newUser.save(cb);
}
module.exports.findUserById=function(id){
    return user.findOne({id:id});
}
module.exports.BusUpdate=function(id,busno){
    return user.findOneAndUpdate({id:id},{busno:busno},{new:true})
}

module.exports.verify=function(id,pass){
    if(id==='cvt'  && pass==='secrect')
    {
        return true
    }
    else{
        return false
    }
}