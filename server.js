require('dotenv').config();
const multer = require('fastify-multer')
const fastifyStatic = require('fastify-static')
const path = require('path')
const db = require("./models");
const routes = require('./routes/root.routes');
const swaggerOp = require('./config/swaggerOption');


db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

//Swagger

// Require the framework and instantiate it
const Fastify = require('fastify');
const swagger = require('fastify-swagger')

function ajvPlugin(ajv, options) {
    ajv.addKeyword('isFileType', {
        compile: (schema, parent, it) => {
            // Change the schema type, as this is post validat`ion it doesn't appear to error.
            parent.type = 'file'
            delete parent.isFileType
            return () => true
        },
    })

    return ajv
}

const fastify = Fastify({ maxParamLength: 1000, logger: true, ajv: { plugins: [ajvPlugin] } })
fastify.register(multer.contentParser, { addToBody: true })
fastify.register(swagger, swaggerOp.options, { exposeRoute: true })

// first plugin
fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'uploads'),
    prefix: '/uploads/', // optional: default '/'
})

fastify.register(require('fastify-cors'), { origin: true })


routes.forEach((route, index) => {
    fastify.route(route)
})

//Run the server!
const start = async () => {
    try {
        await fastify.listen(process.env.PORT, '0.0.0.0', (err, address) => {
            if (err) {
                fastify.log.error(err)
                process.exit(1)
            }
        })

        fastify.log.info(`fastify listening on ${process.env.PORT}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()


