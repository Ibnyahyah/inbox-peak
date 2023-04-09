const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const connectDB = require('./config/db');
require('dotenv').config();

// configuration
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5001;


app.get('/status', (req, res) => {
    try {
        res.status(200).send('Server up');
    } catch (error) {
        res.status(500).send('Unexpected error: ' + error.message);
    }
});
const campaignController = require('./controller/campaign_controller');

// campaignController();

app.use("/user", require('./routes/user'));
app.use("/campaign", require('./routes/campaign'));

// database 
connectDB();

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});
