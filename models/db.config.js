require('dotenv').config();
module.exports = {
    url: `mongodb+srv://${process.env.USERDB}:${process.env.PASS}@cluster0-i1vty.gcp.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`
};