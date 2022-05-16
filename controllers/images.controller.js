const db = require("../models");
const Image = db.images;
const url = require('url')

// Create and Save Image
exports.create = (req, res) => {

    //Validate Request
    if (!req.file) {
        res.status(400).send({ message: "image error!" })
        return
    }

    //Create a Image
    const image = new Image({
        url: 'https' + "://" + req.hostname + "/" + req.file.path,
    });

    //Save Image in the database

    image
        .save(image)
        .then(data => {
            res.status(200).send({payload:data});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while upload the imgae."
            });
        });

};

// Retrieve all image from the database.
exports.findAll = (req, res) => {
    Image.find()
        .then(data => {
            res.status(200).send({payload:data});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving images."
            });
        });
};

//http:localhost:3000/uploads/2020-06-11T11:56:00.547ZScreen Shot 2020-06-04 at 9.04.33 PM.png
//http:localhost:3000/uploads/2020-06-11T11:56:26.521ZScreen Shot 2020-06-04 at 9.04.33 PM.png