require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'http://localhost:5173', // Port 5173 is the standard for a Vue app.
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the backend server.' });
});

const db = require('./app/models/index.js');

db.sequelize.authenticate()
.then(() => {
    console.log("Connected to the database.");
})
.catch((err) => {
    console.log("Failed to connect to the database: " + err.message);
});

//Routes
require("./app/routes/user.routes.js")(app);
require("./app/routes/category.routes.js")(app);
require("./app/routes/item.routes.js")(app);
require("./app/routes/loan.routes.js")(app);
require("./app/routes/image.routes.js")(app);
require("./app/routes/pickup_day.routes.js")(app);
require("./app/routes/pickup_time.routes.js")(app);
require("./app/routes/item_pickup_day.routes.js")(app);
require("./app/routes/item_pickup_time.routes.js")(app);

//Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});