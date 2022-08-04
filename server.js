if(process.env.NODE_ENV !== 'production') {
    require('dotenv').parse() ;
}

const express = require('express') ;
const app = express() ;
const indexLayouts = require('express-ejs-layouts') ;

const indexRouter = require('./routes/index') ;


app.set('view engine', 'ejs') ;
app.set('views', __dirname + '/views') ;
app.set('layout', 'layouts/layout') ;

app.use(indexLayouts) ;
app.use(express.static('public')) ;

const mongoose = require('mongoose') ;
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlparser: true }) ;
const db = mongoose.connection 
db.on('error', error => console.error(error)) ;
db.once('open', () => console.log('Connected To Mongoose')) ;


app.use('/', indexRouter) ;


app.listen(process.env.PORT || 3000)