module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            username: {
                type: String,
                require: true
            },
            email: String,
            password: String
        },
        { timestamps: true }
    );


    const Author = mongoose.model("author", schema);
    return Author;
};