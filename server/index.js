require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})
 database.once('connected', () => {
    console.log('Database Connected');
})
 const app = express();
 app.use(cors(
    {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
 ));

 app.use(express.json());

 app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
 })

 const routes = require('./routes/routes');

 app.use('/api', routes)

// // const express = require('express');
// // const mongoose = require('mongoose');

// // const app = express();
// // app.use(express.json());

// // const mongoString = 'mongodb://localhost:3000/testDatabase';

// // mongoose.connect(mongoString, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // })
// //   .then(() => {
// //     console.log('Database Connected');

// //     app.listen(3000, () => {
// //       console.log('Server Started at 3000');
// //     });
// //   })
// //   .catch((error) => {
// //     console.error('Error connecting to MongoDB:', error);
// //   });

// // const database = mongoose.connection;
// // database.on('error', (error) => {
// //   console.log(error);
// // });


// // const routes = require('./routes/routes');
// // app.use('/api', routes)

// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();

// app.use(express.json());

