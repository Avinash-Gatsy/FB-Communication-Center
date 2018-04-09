import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import config from './config/config';
import bodyParser from 'body-parser';

const app = express();

//middleware setup

mongoose.connect(config.getDBConnectionString(), ()=>{
    console.log('connected to mongoDB');
}); //connect to DB

app.use(bodyParser.json()); //parse any json that comes.
app.use('/api', routes);
export default app;