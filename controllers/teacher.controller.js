const db = require("../models");
const Teacher = db.teachers;

// Create and Save Teacher
exports.create = (req, res) => {
    console.log(req.body);
    //Validate Request
    if (!req.body.name) {
        res.status(400).send({ message: "name can not be empty!" })
        return
    }
    //Create a Teacher
    const teacher = new Teacher({
        name: req.body.name,
    });

    // Save Teacher in the database
    teacher
        .save(teacher)
        .then(data => {
            res.send({payload:data});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Teacher."
            });
        });

};

// Retrieve all Teacher from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    // var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Teacher.find().populate('tutorial')
        .then(data => {
            res.send({payload:data});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving teachers."
            });
        });
};

// Find a single Teacher with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Teacher.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Teacher with id " + id });
            else res.send({payload:data});
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Teacher with id=" + id });
        });
};

// Delete a Teacher by an id
exports.delete = (req, res) => {
    const id = req.params.id;

    Teacher.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Teacher with id=${id}. Maybe Teacher was not found!`
                });
            } else {
                res.send({
                    message: "Teacher has been deleted successfully"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Teacher with id=" + id
            });
        });
};