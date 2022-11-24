const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo_app');
const db = mongoose.connection;
db.on('error',console.error.bind(console , 'connecting to db'));
db.once('open',function(){
    console.log('connected to database :: mongodb');
});
module.exports = db;