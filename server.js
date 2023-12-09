const express = require('express');
const app = express();
const fruits = require('./models/fruits.js');
const Vegtables = require('./models/Vegtables.js')
const jsxViewEngine = require('jsx-view-engine');

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
app.get('/fruits/', (req, res) => {
    // res.send(fruits);
    // res.render('Vegtables/Index', {Vegtables: Vegtables});
    res.render('fruits/Index', {fruits: fruits});
});

//Index for vegtables
app.get('/Vegtables/', (req, res) => {
    res.render('Vegtables/Index', {Vegtables: Vegtables});
})

// N - NEW - allows a user to input a new fruit
app.get('/fruits/new', (req, res) => {
    res.render('fruits/New');
});
//N - NEW - allows a user to input a new Vegtable
app.get('/Vegtables/new', (req, res) => {
    res.render('Vegtables/New');
});


// C - CREATE - update our data store for fruits
app.post('/fruits', (req, res) => {
    if(req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else {  //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    fruits.push(req.body);
      res.redirect('/fruits'); // send user back to /fruits
})

// C - CREATE - update our data store for vegtables
app.post('/Vegtables', (req, res) => {
    if(req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else {  //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    Vegtables.push(req.body);
    
    //console.log(Vegtables)
    // console.log(req.body)
    // res.send('data received');
    res.redirect('/Vegtables'); // send user back to /Vegetables
})

// S - SHOW - show route displays details of an individual fruit
app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    // res.send(fruits[req.params.indexOfFruitsArray]);
    res.render('fruits/Show', {// second parameter must be an object
        fruit: fruits[req.params.indexOfFruitsArray]
    });
})

// S - SHOW - show route displays details of an individual fruit
app.get('/Vegtables/:indexOfVegtablesArray', (req, res) => {
    // res.send(fruits[req.params.indexOfFruitsArray]);
    res.render('Vegtables/Show', {// second parameter must be an object
        Vegtable: Vegtables[req.params.indexOfVegtablesArray]
    });
})


app.listen(3000, () => {
    console.log('listening');
});