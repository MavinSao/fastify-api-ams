const images = require("../controllers/images.controller");

const multer = require('fastify-multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    //Reject filter
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }

}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1025 * 4
    },
    fileFilter: fileFilter,

})

const imageRoutes = [
    {
        method: 'GET',
        url: '/api/images',
        handler: images.findAll,
        schema: {
            description: 'Get all Image',
            summary: 'Get all images',
            tags: ['Upload Image'],
            response: {
                201: {
                    description: 'Successful Response',
                    type: 'object',
                    properties: {
                        image: { type: 'string' },
                    }
                }
            },
            security: [
                {
                        "ApiToken": []
                }
            ]
        }
    },
    {
        method: 'POST',
        url: '/api/images',
        preHandler: upload.single('image'),
        handler: images.create,
        tags: ['Upload Image'],
        schema: {
            tags: ['Upload Image'],
            summary: 'upload image to server',
            consumes: ['multipart/form-data'],
            body: { properties: { image: { isFileType: true } } },
            security: [
                {
                        "ApiToken": []
                }
            ]
        }


    }
]

module.exports = imageRoutes
