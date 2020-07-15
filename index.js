// Require env
require('dotenv').config();
const express = require('express');
// Require mongoose
const mongoose = require('mongoose');
// Use bodyParser to get query params as object with key-value
const bodyParser = require('body-parser');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Import api product route (file routes/product.route.js)
const apiProductRoute = require('./routes/product.route');

const port = process.env.PORT || 3000;

const app = express();

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

// REST API PRODUCT ROUTE
app.use('/api/products', apiProductRoute);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));