const fs = require("fs");
const fileUpload = require("express-fileupload")
const path = require("path");

module.exports = function(app, dirpath){

    app.post("/background/upload", fileUpload({createParentPath: true}), (req, res) => {
        if (!req.files) return res.status(500);
        const file = req.files.file

        const fpath = path.join(dirpath, "uploaded", "background", file.name)

        file.mv(fpath, (err) => {
            if (err) return res.status(500)
        })

        let name = file.name.split(".")[0]
        let type = file.name.split(".")[1]

        const newBg = {
            name: name,
            mimetype: file.mimetype,
            type: type
        }

        fs.writeFile("./background.json", JSON.stringify(newBg), (err) => {
            if (err) return res.status(500)
        })

        res.status(200);
    })

    app.get("/background/get", (req, res) => {
        fs.readFile("./background.json", "utf8", (err, json) => {
            if (err) return res.status(500);
            const bg = JSON.parse(json);

            res.type(bg.mimetype)
            res.sendFile(dirpath + `/uploaded/background/${bg.name}.${bg.type}`);
        });
    })

}