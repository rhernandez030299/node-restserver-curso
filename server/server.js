require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

app.use(require('./routes/index'));

//Habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos online');
});

app.listen(process.env.PORT, () => {
    console.log(`Run server in localhost:${process.env.PORT}`);
});