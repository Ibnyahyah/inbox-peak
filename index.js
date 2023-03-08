const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const connectDB = require('./config/db');
require('dotenv').config();


const app = express();


app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

connectDB();

const PORT = process.env.PORT || 5001;


app.get('/status', (req, res) => {
    try {
        res.status(200).send('Server up');
    } catch (error) {
        res.status(500).send('Unexpected error: ' + error.message);
    }
});

app.use("/user", require('./routes/user'));
app.use("/campaign", require('./routes/campaign'));


app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});