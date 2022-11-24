const User = require('../models/users');
const passport = require('passport');
const localStrategy = require('passport-local');

// home page
module.exports.home = function(req , res){
  if(req.isAuthenticated()){
    return res.redirect('/todo_page')
  }
    return res.render('home');
}

//signUp page
module.exports.signUp = function(req , res){
  if(req.isAuthenticated()){
    return res.redirect('/todo_page')
  }
    return res.render('user_sign_up');
}

//todo page 
module.exports.todoPage = function(req , res){
  return res.render('todo_page');
}

// creating new users 
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
      return req.redirect('back');
    }
    User.findOne({email : req.body.email} , function(err , user){
      if(err){console.log('error in finding user in signing up'); return }
      if(!user){
         // crating user in database

         User.create(req.body , function(err , user){

            if(err){console.log('error in creating user '); return }
            // returning back to home page 
            return res.redirect('/')
         })
      }
      else{
         return res.redirect('/')
      }

    })

   
}

module.exports.createSession = function(req , res){
  return res.redirect('/todo_page');
}

module.exports.logOut = function(req , res,next){
  req.logout(function(err){if(err){console.log(err)} return next()});
  return res.redirect('/')
}




