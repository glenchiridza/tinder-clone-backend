import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';

import Cards from './dbCards.js';

//ap config
const app = express();
const port = process.env.PORT || 3005
const conn_url = "mongodb+srv://USERNAME:YOURPASS@cluster0.uwfvp.mongodb.net/YOURDBNAME?retryWrites=true&w=majority";

//middleware

app.use(express.json())
app.use(Cors())


//db config
mongoose.connect(conn_url,{})

//api endpoints
app.get('/',(req,res) => res.status(200).send("hello glen"));

app.post('/tinder/cards',(req,res) => {
    const db_card = req.body;

    Cards.create(db_card,(err,data) =>{
        if(err){
            res.status(500).send(err);
        } else{
            res.status(201).send(data)
        }
    })

});

app.get('/tinder/cards',(req,res) =>{
    Cards.find((err,data) =>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data)
        }
    })
});



//listener

app.listen(port, () => console.log(` listening to localhost ${port}`))