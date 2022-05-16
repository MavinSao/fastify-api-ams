const dbConfig = require("../models/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.teachers = require("./teacher.model.js")(mongoose);
db.images = require("./images.model.js")(mongoose);
db.category = require("./category.model")(mongoose);
db.article = require("./article.model")(mongoose);
db.author = require("./author.model")(mongoose);

module.exports = db;