import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import config from './config/config';
import bodyParser from 'body-parser';

const app = express();

//middleware setup
// allow-cors
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json()); //parse any json that comes.
app.use(bodyParser.urlencoded({ extended:true }));

//connect to DB
mongoose.connect(config.getDBConnectionString(), ()=>{
    console.log('connected to mongoDB');
});

app.use('/api', routes);
export default app;