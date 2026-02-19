const express = require("express");
const cors = require('cors');
require('dotenv').config();
const bodyParser = require("body-parser");

const corsOpt = {
    origin: ["http://localhost:5173"],
}

const app = express();

app.use(cors(corsOpt));
app.use(bodyParser.json());

require("./routes/favourites.js")(app, __dirname)
require("./routes/background.js")(app, __dirname)
require("./routes/meteo")(app)

app.listen(8080, () => {
    console.log("Listening on port 8080")
});