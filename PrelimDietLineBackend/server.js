const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 5990;
app.listen(port, console.log(`listening on port ${port}`));

app.get('/', (req, res) => {
    res.sendFile(__dirname+ '/public/tutorials.html');
})

const router = require('./router');
app.use('/router', router);

