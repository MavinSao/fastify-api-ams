module.exports = mongoose => {
    var articleSchema = mongoose.Schema(
        {
            title: {
                type: String,
                require: true,
            },
            description: {
                type: String,
                require: true,
            },
            published:  {
                type: Boolean,
                require: false,
            },
            image: {
                type: String,
                require: false,
            },
            author: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'author',
                required: false,
            },
            category: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'category',
                required: false,
            },
        },
        { timestamps: true }
    );

    const Article = mongoose.model("article", articleSchema);
    return Article;
};