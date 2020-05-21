const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
// );
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })
const db = config.get('Mongo_URI');
 
mongoose.connect(db, {useNewUrlParser: true ,useUnifiedTopology: true, useCreateIndex: true})
    .then(()=> console.log(`connected to mongodb...}`))
    .catch((err) => console.error('could not connect to mongodb '));

const streamRouter = require('./routes/streams');

require('./startup/prod')(app);
app.use('/streams', streamRouter);


 app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

