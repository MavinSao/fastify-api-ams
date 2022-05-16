module.exports = mongoose => {
    var categorySchema = mongoose.Schema(
        {
            name: String,
        },
        { timestamps: true }
    );


    const Category = mongoose.model("category", categorySchema);
    return Category;
};