module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            url: String,
        },
        { timestamps: true }
    );


    const Images = mongoose.model("images", schema);
    return Images;
};