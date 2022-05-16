const category = require("../controllers/category.controller");
const { verifyToken } = require("../controllers/authjwt.controller");
const categoryRoutes = [
    {
        method: 'GET',
        url: '/api/category',
        handler: category.findAll,
        schema: {
            description: 'Get all category',
            summary: 'Get all category',
            tags: ['Category'],
            response: {
                201: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
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
        url: '/api/category',
        preHandler: [verifyToken],
        handler: category.create,
        schema: {
            description: 'Add new Category',
            summary: 'Add new Category',
            tags: ['Category'],
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                },
            },
            response: {
                201: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
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
        method: 'GET',
        url: '/api/category/:id',
        handler: category.findOne,
        schema: {
            description: 'Get Category by ID',
            summary: 'Get Category by ID',
            tags: ['Category'],
            params: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'tutorial id'
                    }
                }
            },
            response: {
                201: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
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
        method: 'PUT',
        url: '/api/category/:id',
        preHandler: [verifyToken],
        handler: category.update,
        schema: {
            description: 'Update Category by ID',
            summary: 'Update Category by ID',
            tags: ['Category'],
            params: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'Category id'
                    }
                }
            },
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                },
            },
            response: {
                201: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
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
        method: 'DELETE',
        url: '/api/category/:id',
        preHandler: [verifyToken],
        handler: category.delete,
        schema: {
            description: 'Delete Category by ID',
            summary: 'Delete Category by ID',
            tags: ['Category'],
            params: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'tutorial id'
                    }
                }
            },
            response: {
                201: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    }
                }
            },
            security: [
                {
                        "ApiToken": []
                }
            ]
        }
    }

]
module.exports = categoryRoutes
