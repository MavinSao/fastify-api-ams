const db = require("../models");
const Author = db.author;
// External Dependancies
const boom = require('boom');
const { hash,compare } = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    //
    if (!req.body.username) {
        res.send({ message: "Username can not be empty" })
        return
    }
    if (!req.body.password) {
        res.send({ message: "Password can not be empty" })
        return
    }

    let {username,password} = req.body

    Author.findOne({ username }).then((author)=>{
        if(!author){
            res.status(200).send({ message: "User doesn't exist" })
        }
        compare(password, author.password, (err, result)=>{
            if(result){
                // sign a token
                try{
                    jwt.sign(
                        { id: author._id },
                        'my_jwt_secret',
                        { expiresIn: 3 * 86400 },
                        (err, token) => {
                        if (err) throw err;
                        res.status(200).send({ payload: {username: author.username, email: author.email, token: token}, message: "Successfully Logged In" });
                        }
                    )
                    }catch(err){
                        res.status(502).send("Some error occurred while login.")
                    }
            }else{
                res.status(200).send({message: "Incorrect Password" });
            }
        })
    })
}


// Create Author Account
exports.create = (req, res) => {
    //Validate Request
    if (!req.body.username) {
        res.send({ message: "Username Can not be empty" })
        return
    }
    //Validate Request
    if (!req.body.email) {
        res.send({ message: "Email Can not be empty" })
        return
    }

     //Validate Request
     if (!req.body.password) {
        res.send({ message: "Password Can not be empty" })
        return
    }

    //Create a Article

    //Encrypt Password
    hash(req.body.password, 12).then(hashpwd => {
        authAuthor = req.body
        authAuthor.password = hashpwd
        //Save to database
        const author = new Author(authAuthor);

        author
        .save(author)
        .then(data => {
                res.status(200).send({ payload: {_id: data._id,username: data.username, email: data.email}, message: "Successfully Registered" });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while registered."
                });
            });

    });
};

