const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const { loginCheck } = require('./auth/passport')
loginCheck(passport)
const bodyparser = require('body-parser')
const app = express()
const flash = require('connect-flash')

dotenv.config({path:'config.env'})
const connectDB = require('./server/database/connection')
connectDB()

app.use(morgan('tiny')) //log requests
const PORT = process.env.PORT || 4000; 




//parse request to body-parser
app.use(bodyparser.urlencoded({extended:false}))

app.use(session({
    secret:"oneboy",
    saveUninitialized:false,
    resave:false
}))



//set view engine
app.set('view engine','ejs') // this will work if there is any of other folder inside view folder


//loading assets - css,img and js
app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
app.use('/img',express.static(path.resolve(__dirname,'assets/img')))
app.use('/js',express.static(path.resolve(__dirname,'assets/js')))
console.log(path.resolve(__dirname,'asstes/css'))

//passport
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    res.locals.message = req.flash('successMessage');
    res.locals.message = req.flash('errorMessage');
    res.locals.user = req.user;
    next();
  });



app.use('/',require('./server/routes/router'))


app.listen(PORT,()=>{
    console.log(`server is running on port http://localhost:${PORT}/login`)
})