module.exports = mongoose => {
    var tutorialSchema = mongoose.Schema(
        {
            title: String,
            description: String,
            published: {
                type: Boolean,
                require: false,
            },
            video_url: {
                type: String,
                require: false,
            },
            teacher: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'teacher',
                require: false
            }
        },
        { timestamps: true }
    );

    const Tutorial = mongoose.model("tutorial", tutorialSchema);
    return Tutorial;
};