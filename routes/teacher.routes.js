const teachers = require("../controllers/teacher.controller");
const { verifyToken } = require("../controllers/authjwt.controller");
const teacherRoutes = [
    {
        method: 'GET',
        url: '/api/teachers',
        handler: teachers.findAll,
        schema: {
            description: 'Get all teachers',
            summary: 'Get all teachers',
            tags: ['Teacher'],
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
        url: '/api/teachers',
        preHandler: [verifyToken],
        handler: teachers.create,
        schema: {
            description: 'Add new teacher',
            summary: 'Add new teacher',
            tags: ['Teacher'],
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
        url: '/api/teachers/:id',
        handler: teachers.findOne,
        schema: {
            description: 'Get teacher by ID',
            summary: 'Get teacher by ID',
            tags: ['Teacher'],
            params: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'teacher id'
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
        method: 'DELETE',
        url: '/api/teachers/:id',
        preHandler: [verifyToken],
        handler: teachers.delete,
        schema: {
            description: 'Delete teacher by ID',
            summary: 'Delete teacher by ID',
            tags: ['Teacher'],
            params: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'teacher id'
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
module.exports = teacherRoutes