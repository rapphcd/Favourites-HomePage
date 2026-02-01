const fs = require("fs");

module.exports = function(app){

    app.post("/favourites/create", (req, res) => {
        let link = req.body.link;
        const name = req.body.name;

        fs.readFile('./favourites.json', 'utf8', (err, json) => {
            if (err) throw err;
            let favourites = JSON.parse(json);

            var id = 0;
            if (favourites.length > 0) {
                id = favourites[favourites.length - 1].id + 1;
            }

            if (!(link.startsWith("https://") || link.startsWith("http://"))) {
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
                if (err) {
                    code = 500
                }
            })

            res.status(code).json(newDatas);
        });
    });

    app.put('/favourites/update/:id', (req, res) => {
        const updated = req.body.updated;
        const id = req.params.id;

        fs.readFile('./favourites.json', 'utf8', (err, json) => {
            if (err) throw err;
            let favourites = JSON.parse(json);

            let newFavourites = [];
            let found = false;

            for (const favIndex in favourites) {
                if (favourites[favIndex].id !== parseInt(id)) {
                    newFavourites.push(favourites[favIndex])
                } else {
                    found = true
                }
            }

            if (!found) {
                res.status(404)
            } else {
                let code = 200;
                newFavourites.push(updated);
                fs.writeFile('./favourites.json', JSON.stringify(newFavourites), (err) => {
                    if (err) {
                        code = 500;
                    }
                })
                res.status(code);
            }

        });
    });

    app.delete("/favourites/delete/:id", (req, res) => {
        const id = req.params.id;

        fs.readFile('./favourites.json', 'utf8', (err, json) => {
            if (err) throw err;
            let favourites = JSON.parse(json);

            let newDatas = []
            for (const favIndex in favourites) {
                const fav = favourites[favIndex];
                if (fav.id !== parseInt(id)) {
                    newDatas.push(fav)
                }
            }

            let code = 200
            fs.writeFile('./favourites.json', JSON.stringify(newDatas), (err) => {
                if (err) {
                    code = 500;
                }
            })

            res.status(code);
        });
    });

    app.get("/favourites", (req, res) => {
        fs.readFile('./favourites.json', 'utf8', (err, json) => {
            if (err) throw err;
            let favourites = JSON.parse(json);
            res.json({favourites: favourites});
        });
    });

    app.get("/favourites/:id", (req, res) => {
        const id = req.params.id;

        fs.readFile('./favourites.json', 'utf8', (err, json) => {
            if (err) return res.status(500);
            const favourites = JSON.parse(json);

            let toSend = "";
            let found = false;

            for (const favIndex in favourites) {
                if (favourites[favIndex].id === parseInt(id)) {
                    toSend = favourites[favIndex];
                    found = true;
                    break;
                }
            }

            if (!found) {
                res.status(404)
            } else {
                res.json({favourites: toSend});
            }
        });
    });
}