const db = require("../models");
const Article = db.article;

// External Dependancies
const boom = require('boom');
const { category } = require("../models");

// Create and Save a new Article
exports.create = (req, res) => {

    //Validate Request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" })
        return
    }
    //Create a Article
    
    if (req.authorId.match(/^[0-9a-fA-F]{24}$/)){
        req.body.author = req.authorId;
    }

    if(!req.body.category || !req.body.category.match(/^[0-9a-fA-F]{24}$/)){
        req.body.category = null
    }

    if(!req.body.image || !req.body.image.includes("http")){
        req.body.image = null
    }


    const article = new Article(req.body);

    // Save Article in the database
    article
        .save(article)
        .then(data => {
            res.status(200).send({ payload: data, message: "Data has been posted successfully" });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Article."
            });
        });

};

// Retrieve all Article from the database.
exports.findAll = (req, res) => {

    console.log(req.headers.authorization);

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

    var totalPage = 0
    Article.count().then((count) => {
        totalPage = Math.ceil(count / size);
    });


    Article.find(condition, {}, query).populate('category').populate('author',{username: 1, email: 1}).sort({ _id: -1 })
        .then(data => {
            res.status(200).send({ payload: data, page: page, limit: query.limit, total_page: totalPage, message: "Data has been fetched successfully" });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving articles."
            });
        });
};

// Find a single Article with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Article.findById(id).populate('category')
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Article with id " + id });
            else res.send({ payload: data, message: "Data has been fetched successfully" });
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Article with id=" + id });
        });
};

// Update a Article by the id in the request
exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Data can not be empty!"
        });
    }

    const id = req.params.id;

    Article.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Article with id=${id}. Maybe Article was not found!`
                });
            } else res.send({ payload: data, message: "Article has been updated successfully" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Article with id=" + id
            });
        });
};

// Delete a Article with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    console.log(id);

    Article.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Article with id=${id}. Maybe Article was not found!`
                });
            } else {
                res.status(200).send({
                    payload: data,
                    message: "Article has been deleted successfully"
                });
            }
        })
        .catch(err => {
            res.status(404).send({
                message: "Could not delete Article with id=" + id
            });
        });
};

// Delete all Articles from the database.
exports.deleteAll = (req, res) => {
    Article.deleteMany({})
        .then(data => {
            res.status(200).send({
                message: `${data.deletedCount} Articles were deleted successfully!`
            });
        })
        .catch(err => {
        });
};

// Find all published Articles
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

    Article.find({ published: true }, {}, query).populate('category')
        .then(data => {
            res.status(200).send({ payload: data, message: "Article has been fetched successfully" });
        })
        .catch(err => {
        });
};