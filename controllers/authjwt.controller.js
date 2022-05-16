// create this function in an auth folder in controllers and export it

const jwt = require("jsonwebtoken");


exports.verifyToken = async (req, res, done) => {
    
    const { authorization } = req.headers;

    if(!authorization){
      done(new Error('unauthorized'));
    }else{
      let token = (authorization.split(' ')[1])

      jwt.verify(token, 'my_jwt_secret', (err, decoded) => {
        if (err) {
          done(new Error('unauthorized'));
          res.status(501).send("unauthorized")
        }
        req.authorId = decoded.id
      });
    }
  };