const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex:  true,  useUnifiedTopology: true})

const connection = mongoose.connection;
connection.once('open', ()=>{
console.log("Connected with DB Successfully")
})
app.use(cors());
app.use(express.json());

const cartsRouter = require('./routes/carts');
const usersRouter = require('./routes/users');
const categorysRouter = require('./routes/categorys');
const productsRouter = require('./routes/products');

app.use('/carts', cartsRouter);
app.use('/users', usersRouter);
app.use('/categorys', categorysRouter);
app.use('/products', productsRouter);

app.listen(port, ()=>{
    console.log(`Server is running in port : ${port}`)
} )

module.exports = app