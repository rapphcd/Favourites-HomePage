const express = require("express");
const fileUpload = require("express-fileupload")
const cors = require('cors');
const path = require('path');
const fs = require("fs");
const bodyParser = require("body-parser");

const corsOpt = {
    origin: ["http://localhost:5173"],
}

const app = express();

app.use(cors(corsOpt));
app.use(bodyParser.json())

app.post("/create", (req, res) => {
    let link = req.body.link;
    const name = req.body.name;

    fs.readFile('./favourites.json', 'utf8', (err, json) => {
        if (err) throw err;
        let favourites = JSON.parse(json);

        var id= 0;
        if(favourites.length > 0){
            id = favourites[favourites.length -1].id + 1;
        }

        if(!(link.startsWith("https://") || link.startsWith("http://"))){
            link = `https://${link}`
        }

        const newDatas = {
            'id': id,
            'link': link,
            'name': name
        }
        favourites.push(newDatas)

        let code = 200
        fs.writeFile('./favourites.json', JSON.stringify(favourites), (err) => {
            if (err){
                code = 500
            }
        })

        res.status(code).json(newDatas);
    });
})

app.put('/update/:id', (req,res) => {
    const updated = req.body.updated;
    const id = req.params.id;

    fs.readFile('./favourites.json', 'utf8', (err, json) => {
        if (err) throw err;
        let favourites = JSON.parse(json);

        let newFavourites = [];
        let found = false;

        for (const favIndex in favourites){
            if(favourites[favIndex].id !== parseInt(id)){
                newFavourites.push(favourites[favIndex])
            } else {
                found = true
            }
        }

        if(!found){
            res.status(404)
        } else {
            let code = 200;
            newFavourites.push(updated);
            fs.writeFile('./favourites.json', JSON.stringify(newFavourites), (err) => {
                if (err){
                    code = 500;
                }
            })
            res.status(code);
        }

    });
})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    fs.readFile('./favourites.json', 'utf8', (err, json) => {
        if (err) throw err;
        let favourites = JSON.parse(json);

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
    });
})

app.get("/favourites", (req, res) => {
    fs.readFile('./favourites.json', 'utf8', (err, json) => {
        if (err) throw err;
        favourites = JSON.parse(json);
        res.json({favourites: favourites});
    });
})

app.get("/favourites/:id", (req, res) => {
    const id = req.params.id;

    fs.readFile('./favourites.json', 'utf8', (err, json) => {
        if (err) return res.status(500);
        const favourites = JSON.parse(json);

        let toSend = "";
        let found = false;

        for (const favIndex in favourites){
            if(favourites[favIndex].id === parseInt(id)){
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
    });
})

app.post("/background/upload", fileUpload({ createParentPath: true }) , (req, res) => {
    if(!req.files) return res.status(500);
    const file = req.files.file

    const fpath = path.join(__dirname, 'uploaded', 'background', file.name)

    file.mv(fpath, (err) => {
        if(err) return res.status(500)
    })

    let name = file.name.split(".")[0]
    let type = file.name.split(".")[1]

    const newBg = {
        name: name,
        mimetype: file.mimetype,
        type: type
    }

    fs.writeFile('./background.json', JSON.stringify(newBg), (err) => {
        if (err) return res.status(500)
    })

    res.status(200);
})

app.get("/background/get", (req, res) => {
    fs.readFile('./background.json', 'utf8', (err, json) => {
        if (err) return res.status(500);
        const bg = JSON.parse(json);

        res.type(bg.mimetype)
        res.sendFile(__dirname+ `/uploaded/background/${bg.name}.${bg.type}`);
    });
})

app.listen(8080, () => {
    console.log("Listening on port 8080")
});