const db = require("../models");
const Tutorial = db.tutorials;

// External Dependancies
const boom = require('boom')

// Create and Save a new Tutorial
exports.create = (req, res) => {
    console.log(req.body);

    //Validate Request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" })
        return
    }
    //Create a Tutorial
    if(!req.body.teacher || !req.body.teacher.match(/^[0-9a-fA-F]{24}$/)){
        req.body.teacher = null
    }
    const tutorial = new Tutorial(req.body);

    // Save Tutorial in the database
    tutorial
        .save(tutorial)
        .then(data => {
            res.send({ payload: data, message: "Data has been posted successfully" });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
            
        });

};



// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    var page = parseInt(req.query.page)
    var size = parseInt(req.query.size)
    var query = {}
    if (page < 0 || page === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.send(response)
    }
    query.skip = size * (page - 1)
    query.limit = size

    Tutorial.find(condition, {}, query).populate('teacher')
        .then(data => {
            res.status(200).send({ payload: data, message: "Data has been fetched successfully" });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
            
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Tutorial.findById(id).populate('teacher')
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Tutorial with id " + id });
            else res.status(200).send({ payload: data, message: "Data has been fetched successfully" });
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Tutorial with id=" + id });
            
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            } else res.status(200).send({ payload: data, message: "Tutorial has been updated successfully" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
            
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Tutorial.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            } else {
                res.status(200).send({
                    payload: data,
                    message: "Tutorial has been deleted successfully"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
            
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
        .then(data => {
            res.status(200).send({
                message: `${data.deletedCount} Tutorials were deleted successfully!`
            });
        })
        .catch(err => {
            
        });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

    var page = parseInt(req.query.page)
    var size = parseInt(req.query.size)
    var query = {}
    
    if (page < 0 || page === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.send(response)
    }
    query.skip = size * (page - 1)
    query.limit = size

    Tutorial.find({ published: true }, {}, query).populate('teacher')
        .then(data => {
            res.status(200).send({ payload: data, message: "Data has been fetched successfully" });
        })
        .catch(err => {
            res.status(501).send({ payload: data, message: "Error" });
        });
};