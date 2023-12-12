
// require dotenv so that I can use the .env fil
require('dotenv').config();
const express = require('express');
// require mongoose so that I can connect to my db
const mongoose = require('mongoose');
const app = express();
// we want to import the fruit model
const Fruit = require('./models/fruit');
// const fruits = require('./models/fruits.js');
// we want to import the fruit model
const Vegtable = require('./models/vegtable');
// const Vegtables = require('./models/vegtables.js')
const jsxViewEngine = require('jsx-view-engine');


// Global configuration
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
})


app.set('view engine', 'jsx');
app.set('views','./views');
app.engine('jsx', jsxViewEngine());


// ================ Middleware ================
//
app.use((req, res, next) => {
    console.log('Middleware: I run for all routes');
    next();
})

//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));

// These are my routes
// We are going to create the 7 RESTful routes
// There is an order for them to listed in the code
// I - N - D - U - C - E - S
//  Action      HTTP Verb   CRUD 
// I - Index    GET         READ - display a list of elements
// N - New      GET         CREATE * - but this allows user input
// D - Delete   DELETE      DELETE
// U - Update   PUT         UPDATE * - this updates our database
// C - Create   POST        CREATE * - this adds to our database
// E - Edit     GET         UPDATE * - but this allows user input
// S - Show     GET         READ - display a specific element

app.get('/', (req, res) => {
    res.send('this is my fruits and veg root route');
});


// I - INDEX - dsiplays a list of all fruits
app.get('/fruits/', async (req, res) => {
    // res.send(fruits);
    try {
        const foundFruits = await Fruit.find({});
        res.status(200).render('fruits/Index', {fruits: foundFruits});
    } catch (err) {
        res.status(400).send(err);
    }
    
});

//Index for vegtables

app.get('/vegtables/', async (req, res) => {
    // res.send(fruits);
    try {
        const foundVegtables = await Vegtable.find({});
        res.status(200).render('vegtables/Index', {vegtables: foundVegtables});
    } catch (err) {
        res.status(400).send(err);
    }
    
});

// N - NEW - allows a user to input a new fruit
app.get('/fruits/new', (req, res) => {
    res.render('fruits/New');
});
//N - NEW - allows a user to input a new Vegtable
app.get('/vegtables/new', (req, res) => {
    res.render('vegtables/New');
});

// C - CREATE - update our data store
app.post('/fruits', async (req, res) => {
    if(req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else {  //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }

    try {
        const createdFruit = await Fruit.create(req.body);
        res.status(200).redirect('/fruits');
    } catch (err) {
        res.status(400).send(err);
    }
})

// C - CREATE - update our data store for vegtables
app.post('/vegtables', async(req, res) => {
    if(req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else {  //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    try {
        const createdVegtable = await Vegtable.create(req.body);
        res.status(200).redirect('/vegtables');
    } catch (err) {
        res.status(400).send(err);
    }
})

// S - SHOW - show route displays details of an individual fruit
app.get('/fruits/:id', async (req, res) => {
    // res.send(fruits[req.params.indexOfFruitsArray]);
    try {
        const foundFruit = await Fruit.findById(req.params.id);
        res.render('fruits/Show', {fruit: foundFruit});
    } catch (err) {
        res.status(400).send(err);
    }

})


// S - SHOW - show route displays details of an individual fruit
app.get('/vegtables/:id', async(req, res) => {
    // res.send(fruits[req.params.indexOfFruitsArray]);
    try{
        const foundVegtable = await Vegtable.findById(req.params.id);
        res.render('vegtables/Show', {vegtable: foundVegtable});
    }catch(err){
         res.status(400).send(err);
    }
    });


app.listen(3001, () => {
    console.log('listening');
});