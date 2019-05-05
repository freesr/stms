const passport=require('passport');
const session     = require('express-session');
const LocalStrategy=require('passport-local');
const User          = require('./models/user');

const SESSION_SECRET='99599';

module.exports=(app)=>{
    console.log(SESSION_SECRET);
    app.use(session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());


    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });
    passport.deserializeUser((id,done)=>{
        User.findUserById(id)
        .then(doc=>{
            const user=doc;
            done(null,user)
        })
        .catch(err=>{
            console.log(err);
            done(err);
        });
    });
    passport.use(new LocalStrategy({
        usernameField:'id',
        passwordField:'password'
    },
    function(username,password,done){
        console.log('username', username, 'password: ', password);
        User.findUserById(username)
        .then(doc=>{
            console.log(doc);
            if(!doc)
            {
                console.log('hii');
                return done(null,false);
            }
            else if(password===doc.password)
            {
                return done(null,doc);
            }
            else{
                console.log('hii2');
                return done(null,false);
            }
        })
        .catch(err=>{
            console.log('hii3');
            return done(err);
        });
    }));
}