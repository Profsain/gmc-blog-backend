const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

// connect to database
mongoose.connect('mongodb://127.0.0.1:27017/myblogdb', { useNewUrlParser: true })
    .then(() => { 
        console.log('Connected to database');

        // create express app
        const app = express();

        // use cors
        app.use(cors());
    
        // use middleware
        app.use(express.json());

        // use routes
        app.use('/api', routes);

        // listen on port 4040
        app.listen(4040);
        console.log('Listening on port 4040');
    });
