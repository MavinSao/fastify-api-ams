const tutorials = require("../controllers/tutorial.controller");
const documentation = require("../models/tutorial.model")
const { verifyToken } = require("../controllers/authjwt.controller");

const tutorialRoutes = [
    {
        method: 'GET',
        url: '/api/tutorials',
        handler: tutorials.findAll,
        schema: {
            description: 'Get all tutorials. You can use queryString (?page=1&size=10) for pagination.',
            summary: 'Get all tutorials',
            tags: ['Tutorial'],
            response: {
                201: {
                    description: 'Successful Response',
                    type: 'object',
                    properties: {
                        payload: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                title: { type: 'string' },
                                description: { type: 'string' },
                                published: { type: 'boolean' },
                                video_url: { type: 'string' },
                            }
                        },
                        page: { type: 'string' },
                        limit: { type: 'string' },
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
    },
    {
        method: 'GET',
        url: '/api/tutorials/published',
        handler: tutorials.findAllPublished,
        schema: {
            description: 'Get all published tutorials. You can use queryString (?page=1&size=10) for pagination.',
            summary: 'Get all published tutorials',
            tags: ['Tutorial'],
            response: {
                201: {
                    description: 'Successful Response',
                    type: 'object',
                    properties: {
                        payload: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                title: { type: 'string' },
                                description: { type: 'string' },
                                published: { type: 'boolean' },
                                video_url: { type: 'string' },
                            }
                        },
                        page: { type: 'string' },
                        limit: { type: 'string' },
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
    },
    {
        method: 'GET',
        url: '/api/tutorials/:id',
        handler: tutorials.findOne,
        schema: {
            description: 'Get Tutorial By ID',
            summary: 'Get a tutorial By ID',
            tags: ['Tutorial'],
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
                    description: 'Successful Response',
                    type: 'object',
                    properties: {
                        payload: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                title: { type: 'string' },
                                description: { type: 'string' },
                                published: { type: 'boolean' },
                                video_url: { type: 'string' },
                            }
                        },
                        page: { type: 'string' },
                        limit: { type: 'string' },
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
    },
    {
        method: 'POST',
        url: '/api/tutorials',
        preHandler: [verifyToken],
        handler: tutorials.create,
        schema: {
            description: 'post tutorial',
            summary: 'Add new tutorial',
            tags: ['Tutorial'],
            body: {
                type: 'object',
                properties: {
                    title: { type: 'string' },
                    description: { type: 'string' },
                    published: { type: 'boolean' },
                    video_url: { type: 'string' },
                    teacher: {type: 'string'}
                },
            },
            response: {
                201: {
                    description: 'Successful Response',
                    type: 'object',
                    properties: {
                        payload: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                title: { type: 'string' },
                                description: { type: 'string' },
                                published: { type: 'boolean' },
                                video_url: { type: 'string' },
                            }
                        },
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
    },
    {
        method: 'PATCH',
        url: '/api/tutorials/:id',
        preHandler: [verifyToken],
        handler: tutorials.update,
        schema: {
            description: 'Update Tutorial By ID',
            summary: 'Update tutorial by ID',
            tags: ['Tutorial'],
            params: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'tutorial id'
                    }
                }
            },
            body: {
                type: 'object',
                properties: {
                    title: { type: 'string' },
                    description: { type: 'string' },
                    published: { type: 'boolean' },
                    video_url: { type: 'string' },
                    teacher: { type: 'string' }
                },
            },
            response: {
                201: {
                    description: 'Successful Response',
                    type: 'object',
                    properties: {
                        payload: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                title: { type: 'string' },
                                description: { type: 'string' },
                                published: { type: 'boolean' },
                                video_url: { type: 'string' },
                            }
                        },
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
    },
    {
        method: 'DELETE',
        url: '/api/tutorials/:id',
        preHandler: [verifyToken],
        handler: tutorials.delete,
        schema: {
            description: 'Delete Tutorial By ID',
            summary: 'Delete tutorial by ID',
            tags: ['Tutorial'],
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
                    description: 'Successful Response',
                    type: 'object',
                    properties: {
                        payload: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                title: { type: 'string' },
                                description: { type: 'string' },
                                published: { type: 'boolean' },
                                video_url: { type: 'string' },
                            }
                        },
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

module.exports = tutorialRoutes











