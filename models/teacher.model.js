module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
        },
        { timestamps: true }
    );


    const Teacher = mongoose.model("teacher", schema);
    return Teacher;
};