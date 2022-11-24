const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const db = require('./config/mongoose');
const MongoStore = require('connect-mongo')

// express session 
const session = require('express-session')
const passport = require('passport');
const localStrategy = require('./config/passport-local-strategy');

const app = express();

// scss or sass
const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}))

app.use(express.urlencoded())

//ejs view engine
app.set('view engine','ejs');
app.set('views','./views');

// creating session and age of the session 
app.use(session({
    name :'todo_app',
    secret : 'shubham9554',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store : MongoStore.create({
        mongoUrl : 'mongodb://localhost/todo_app',
        autoRemove :'disabled'
    }) 
}));
app.use(function(req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
  });



// initialize the passport 
app.use(passport.initialize());
// passport is alsoused for creating session 
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));

//assets
app.use(express.static('assets'));






app.listen(port , function(err){
    if(err){
        // console.log('Error in staring the Server',err);
        console.log(`Error in running server:${err}`);
    }
    console.log(`Server is Running :${port}`);
})