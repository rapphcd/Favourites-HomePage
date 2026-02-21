const fs = require("fs");
const fileUpload = require("express-fileupload");
const path = require("path");

module.exports = function (app, dirpath) {

    app.post("/favourites/create", (req, res) => {
        let link = req.body.link;
        const name = req.body.name;

        fs.readFile('./favourites.json', 'utf8', (err, json) => {
            if (err) throw err;
            try {
                let favourites = JSON.parse(json);

                var id = 0;
                var pos = 0;
                if (favourites.length > 0) {
                    for (const fav of favourites) {
                        if (fav.id > id) {
                            id = fav.id
                        }
                        if (fav.position > pos) {
                            pos = fav.position
                        }
                    }
                }
                id += 1
                pos += 1

                if (!(link.startsWith("https://") || link.startsWith("http://"))) {
                    link = `https://${link}`
                }

                const newDatas = {
                    'id': id,
                    'link': link,
                    'name': name,
                    'position': pos
                }
                favourites.push(newDatas)

                let code = 200
                fs.writeFile('./favourites.json', JSON.stringify(favourites), (err) => {
                    if (err) {
                        code = 500
                    }
                })

                res.status(code).json(newDatas);
            } catch (e) {
                return res.status(500);
            }
        });
    });

    app.put('/favourites/update/', (req, res) => {
        const updated = req.body.updated;
        let code = 200
        fs.writeFile('./favourites.json', JSON.stringify(updated), (err) => {
            if (err) {
                code = 500;
            }
        })
        res.status(code);

    });

    app.delete("/favourites/delete/:id", (req, res) => {
        const id = req.params.id;

        fs.readFile('./favourites.json', 'utf8', (err, json) => {
            if (err) throw err;
            try {
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
            } catch (e) {
                return res.status(500);
            }
        });
    });

    app.get("/favourites", (req, res) => {
        fs.readFile('./favourites.json', 'utf8', (err, json) => {
            if (err) throw err;
            try {
                let favourites = JSON.parse(json);
                res.json({favourites: favourites});
            } catch (e){
                return res.status(500);
            }
        });
    });

    app.get("/favourites/export", (req, res) => {
        res.download(dirpath + "/favourites.json", (err) => {
            if (err) console.log(err);
        })
    });

    app.post("/favourites/import", fileUpload({createParentPath: true}), (req, res) => {
        if (!req.files) return res.status(500);
        const file = req.files.file
        const fpath = path.join(dirpath, "favourites.json")

        file.mv(fpath, (err) => {
            if (err) console.log(err)
            return res.status(500)
        })

        res.status(200);
    })

    app.get("/favourites/:id", (req, res) => {
        const id = req.params.id;

        fs.readFile('./favourites.json', 'utf8', (err, json) => {
            if (err) return res.status(500);
            try {
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
                    res.json({favourite: toSend});
                }
            } catch (e) {
                return res.status(500)
            }
        });
    });
}