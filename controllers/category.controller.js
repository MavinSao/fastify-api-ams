const db = require("../models");
const { category } = require("../models");
const Category = db.category;

// Create and Save Category
exports.create = (req, res) => {
    console.log(req.body);
    //Validate Request
    if (!req.body.name) {
        res.status(400).send({ message: "name can not be empty!" })
        return
    }
    //Create a Category
    const category = new Category({
        name: req.body.name,
    });

    // Save Category in the database
    category
        .save(category)
        .then(data => {
            res.status(200).send({ payload: data, message: "Category has been posted successfully" });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Category."
            });
        });

};

// Update a category by the id in the request
exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    category.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update category with id=${id}. Maybe Article was not found!`
                });
            } else res.status(200).send({ payload: data, message: "Category has been updated successfully" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Category with id=" + id
            });
        });
};

// Retrieve all Category from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    // var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Category.find().populate('tutorial').sort({ _id: -1 })
        .then(data => {
            res.status(200).send({ payload: data, message: "Data has been fetched successfully" });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving category."
            });
        });
};

// Find a single Category with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Category with id " + id });
            else res.status(200).send({ payload: data, message: "Data has been fetched successfully" });
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Category with id=" + id });
        });
};

// Delete a Category by an id
exports.delete = (req, res) => {
    const id = req.params.id;

    Category.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
                });
            } else {
                res.status(200).send({
                    payload: data,
                    message: "Category has been deleted successfully"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Category with id=" + id
            });
        });
};