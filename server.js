if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express');
const path = require('path')
const mongoose = require('mongoose')
const expresslayouts = require('express-ejs-layouts');

const app = express();

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection
db.on('error', err=> console.error(err));
db.once('open', ()=> console.log(`Conected to Mongoose`))

const indexRouter = require('./routes/index');


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/layout');
app.use(expresslayouts)
app.use(express.static('public'))



app.use('/', indexRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> console.log(`Server is started on port ${PORT}`))

// console.log('Connection url => ', process.env.MONGO_URL);