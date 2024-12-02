// Dotenv
require('dotenv').config()
// Cors
const cors = require('cors');
// Bring in Express
const express = require('express');
// mongoose
const mongoose = require('mongoose');
// set a variable of app to run the express method
const app = express();
// set a port - listen changes on the port
const port = 4000;

// allow Cross Origin
app.use(cors());

// import routes
// -------- routes go here -------- //
const projectRoutes = require('./routes/projects')
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comments')

// Serve static files: // image upload under here

// -------- mongo user name & password goes here -------- //
const mongoUsername = process.env.MONGODB_USERNAME
const mongoPassword = process.env.MONGODB_PASSWORD

// -------- mongo URI goes here -------- //
const mongoURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.idmn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// use json with express
app.use(express.json());

// log out the path and method of each request:
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Attach the routes to the app
// -------- app routes go here -------- //
app.use('/api/projects/', projectRoutes);
app.use('/api/user', userRoutes);
app.use('/api/comments', commentRoutes);
// Multer static files - from public/uploads
app.use('/public/uploads', express.static('public/uploads'));

// Home route for the backend (url address)
app.get('/', (req, res) => {
    // What happens at that route
    res.send("Hello, this is your express server!")
})

// Listen to changes
app.listen(port, () => {
    console.log(`Express server is running on http://localhost:${port}`);
});

mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB Atlas:');
    });