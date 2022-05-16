exports.options = {
    routePrefix: '/api/v1',
    exposeRoute: true,
    swagger: {
        info: {
            title: 'HRD API TEST',
            description: 'Building a blazing fast REST API with Node.js, MongoDB, Fastify and Swagger',
            version: '1.0.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        host: `${process.env.HOST}`,
        schemes: [
            'https',
            'http'
          ], 
        consumes: ['application/json'],
        produces: ['application/json'],
        securityDefinitions: {
            ApiToken: {
              description: 'Authorization header token, sample: "Bearer #TOKEN#"',
              type: 'apiKey',
              name: 'authorization',
              in: 'header'
            }
          }
    }
}
