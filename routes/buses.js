const express = require('express');
const mongoose=require('mongoose');
const router = express.Router();
//const Path = require('path');
const user=require('../models/user');
var passport = require('passport');
const Fines=require('../models/fines');
const Mail=require('./mail');
const rout=require('../models/routes');
const Grive=require('../models/greivance');


router.route('/')
    .get((req, res) => {
        res.redirect('/home');
    })

router.route('/home')
    .get((req, res) => {
        res.render('home', {

        })
    })
    router.route('/buslist')
    .get((req, res) => {
        res.render('buslist', {

        })
    })
    router.route('/greve')
    .post((req,res)=>{
        const roll=req.body.id;
        const subject=req.body.subject;
        const message=req.body.message;
        const g=new Grev({
            roll:roll,
            subject:subject,
            message:message
        });
Grive.saveGrive(g);


    });

router.route('/login')
    .get((req, res) => {
        res.render('login', {})
    })
    .post(
        passport.authenticate('local', {
        failureRedirect: '/'
      }),
       function (req, res) {
          console.log('hii');
        res.redirect('/profile');
      });

      router.route('/adminlogin')
      .get((req,res)=>{
          if(verify(req.body.id,req.body.password))
          {
            res.redirect('/admin');
          }
          else{
            res.render('login',{});
          }
      })

 router.route('/profile')
      .get(ensureAuthenticated,function(req,res){
    
  
    Fines.UserFines(req.user.id)
    .then(findoc=>{
       console.log(findoc);
    
      
       //console.log(doc);
        res.render('user',{doc:req.user,doc1:findoc})
    })
    
    


.catch(err=>{

    console.log(err);

})
      })
          

  router.route('/profile?busno')
  .put(ensureAuthenticated,function(req,res){
      console.log(req.body);
      BusUpdate(req.body.id,req.query.busno)
      .then(doc=>{
          console.log('updated'+doc);
      })
      .catch(err=>{
          console.log(err);
      })

  })   
  router.route('/buses') 
  .get((req,res)=>{
      var b=req.query.bus;
      //console.log(typeof(b));
      rout.setBus(b)
      .then((result)=>{
        console.log(result);
        res.render('view',{result:result});
      })
      .catch(err=>{
          console.log('hii'+err);
      })
     
  })   
  
   router.route('/admin')
   .get((req,res)=>{
       res.render('admin',{})
   })
   .post((req,res)=>{
     //  const flag=req.body.flag;
    //   const modifiedbuses=req.body.modifiedbuses;
   // const flag=true;
    //const modifiedbuses=[25,50];
    console.log(req.body);
    let sender=[];
   //    if(flag)
       {
           mailfilter(modifiedbuses);
     
          // for(let i=0;i<modifiedbuses.length;i++)
         //  {
        //   modifiedbuses.forEach(function(e){
        //     user.find({busno:e})
        //     .then(doc=>{
        //        // console.log('1'+doc);
        //        doc.forEach(function(ele){
        //            sender.push(doc.email);

        //        });

        //   })
            
              
                // for(let j=0;j<doc.length;j++)
                // {
                //     sender.push(doc.email);
                //     if(j==doc.length-1)
                //     {
                //         console.log(sender);
                //     }
                // }
              
            
        //     .catch(err=>{
        //         console.log(err);
        //     })
        //    })
         
         //  Mail(senders,'bus cancelled','your bus has been cancelled');

       }
     //  console.log(sender);


   })
    
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }
async function mailfilter(modifybuses){
    try{
        
        // modifybuses.forEach(function(ele){
        //    const  l= await user.find({busno:busno})
        //     .select('email').exec();
        //   //  console.log(l);
        // })
        let ll='';
        for(let busno in modifybuses)
        {
            console.log(modifybuses[busno]);
            const l=await user.find({busno:modifybuses[busno]}).select('email').exec();
            console.log(l);
            if(l.length>0)
            {
for(let i in l)
{
    ll=ll+l[i].email+',';
}
            }
        }
        console.log(ll);
        Mail(ll,'bus cancelled','your bus has been cancelled');
        
        
    }
    catch(err){
        console.log(err);

    }
}

router.route('/admin/grievance')
.get((req,res)=>{
    Grive.getgreve()
    .then(g=>{
        res.render('',{g:g});
    })
})

module.exports = router;