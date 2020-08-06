const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(morgan('dev'));


const PORT = 6800 || process.env.PORT ;

mongoose.connect('mongodb+srv://naywin:naywin23@cluster0-urly7.mongodb.net/relatednews?retryWrites=true&w=majority',{ useNewUrlParser: true , useUnifiedTopology: true})
.then(data=>{
    console.log("Connected")
})
.catch(err=>{
    console.log(err);
})

//access control
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');

    if(req.method === "OPTION"){
        res.header('Access-Control-Allow-Methods','GET,POST,DELETE,PUT,PATCH');
        return res.status(200).json({});
    }
    next();
})

const categoryRouter = require('./api/routes/categories');
const newsRouter = require('./api/routes/news');

//view engine
app.set('view engine','ejs');

//routes
app.use('/api/categories/',categoryRouter);
app.use('/api/news/',newsRouter);

//Handling error
app.use((req,res,next)=>{
    let error = new Error('Not Found');
    error.status = 404;
    next(error);
})
app.use((error,req,res,next)=>{
    res.status(error.status|| 500);
    res.json({
        error:error.message
    })
})


app.listen(PORT,()=>{
    console.log(`Your Server is runningat ${PORT}`);

})