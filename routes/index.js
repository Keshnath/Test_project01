const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const passport = require('passport');
const localStrategy = require('passport-local');




// home page 
router.get('/',homeController.home);

//signUp page 
router.get('/sign-up',homeController.signUp);

// after signin an creating session move to todo page
router.get('/todo_page',passport.checkAuthentication,homeController.todoPage);

// creating user
router.post('/create',homeController.create);

//creating login session 
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/'}
),homeController.createSession);

router.get('/logOut',homeController.logOut)

module.exports = router;