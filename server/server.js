const express = require("express");
const cors = require('cors');
const fs = require("fs");
const bodyParser = require("body-parser");

const corsOpt = {
    origin: ["http://localhost:5173"],
}

const app = express();

app.use(cors(corsOpt));
app.use(bodyParser.json())

app.post("/create", (req, res) => {
    const link = req.body.link;
    const favourites = require("./favourites.json");
    var id= 0;
    if(favourites.length > 0){
        id = favourites[favourites.length -1].id + 1;
    }

    const newDatas = {
        'id': id,
        'link': link
    }
    favourites.push(newDatas)

    let code = 200
    fs.writeFile('./favourites.json', JSON.stringify(favourites), (err) => {
        if (err){
            code = 500
        }
    })

    res.status(code);
})

app.post("/delete", (req, res) => {
    const id = req.body.id;
    const favourites = require("./favourites.json");
    let newDatas = []
    for (const favIndex in favourites) {
        const fav = favourites[favIndex];
        if(fav.id !== parseInt(id)){
            newDatas.push(fav)
        }
    }

    let code = 200
    fs.writeFile('./favourites.json', JSON.stringify(newDatas), (err) => {
        if (err){
            code = 500;
        }
    })

    res.status(code);
})

app.get("/favourites", (req, res) => {
    const favourites = require("./favourites.json");
    res.json({favourites: favourites});
})

app.get("/favourites/:id", (req, res) => {
    const id = req.params.id;
    const favourites = require("./favourites.json");
    let toSend = "";
    let found = false;

    for (const favIndex in favourites){
        if(favIndex[favIndex].id === parseInt(id)){
            toSend = favourites[favIndex];
            found = true;
            break;
        }
    }

    if(!found){
        res.status(404)
    } else {
        res.json({favourites: toSend});
    }
})

app.listen(8080, () => {
    console.log("Listening on port 8080")
});