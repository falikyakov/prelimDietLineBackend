const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let port = process.env.PORT;
if (port == null || port == "") {
    port = 5990;
}
app.listen(port, console.log(`listening on port ${port}`));
 

app.get('/', (req, res) => {
    res.sendFile(__dirname+ '/public/tutorials.html');
})

const router = require('./router');
app.use('/router', router);

