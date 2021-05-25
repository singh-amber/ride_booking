const express = require('express');
const app = express();
const cors = require('cors');
const mysql_connection = require('./mysql_connection');
const bodyParser = require('body-parser');
app.use(cors()); // cors acts as middleware
app.use(express.json()) // for parsing the sent and received json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // used to return static files from sever(eg..HTML)

const port = process.env.PORT || 5000

const passenger_auth = require('./routes/passenger_auth_routes').router;
const ride = require('./routes/ride_routes');

app.use('/auth', passenger_auth)
app.use('/ride', ride)


app.listen(port, () => {
    console.log("Server is running on port number", port)
});