const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('../models/users');

// passport is used to check which user signed in
passport.use(new localStrategy({
    usernameField : 'email'
},
function(email ,password ,done){
        User.findOne({email : email} , function(err , user){
            if(err){
                console.log('error in finding user ---> passport');
                return done(err);
            }
            if(!user || user.password != password ){
                console.log('invalid username / password');
                return done(null , false);
            }
            return done(null , user);
        });
    }
));

// serialized and deserialized user is used for saving cookis in browser and user for further authentication .
passport.serializeUser(function(user , done){
    done(null , user.id)
});

passport.deserializeUser(function(id , done){
    User.findById(id ,function(err , user){
        if(err){return done(err);}
        return done(null , user);
    })
});

// a middle ware checkAuthenticaton is created by us to check that user is authenticated or not .
// we will use it in routers 
passport.checkAuthentication = function(req , res , next){
    // isAuthenticated is function by passport
    if(req.isAuthenticated()){
        // if user is authenticated then use next function
        return next()
    }
    return res.redirect('/');
}

passport.setAuthenticatedUser = function(req , res , next){
    if(req.isAuthenticated()){
        // once the user is authenticated then we are storing the data of user in the res locals for sending the data to html 
        res.locals.user = req.user ;
        // console.log(res.locals.user);
    }
    next();
}
module.exports = passport;