const articles = require("../controllers/article.controller");
const { verifyToken } = require("../controllers/authjwt.controller");
const documentation = require("../models/article.model")

const articleRoutes = [
    {
        method: 'GET',
        url: '/api/articles',
        handler: articles.findAll,
        schema: {
            description: 'Get all articles. You can use queryString (?page=1&size=10) for pagination.',
            summary: 'Get all articles',
            tags: ['Article'],
            response: {
                201: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        payload: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                description: { type: 'string' },
                                published: { type: 'boolean' },
                                image: { type: 'string' },
                                category: {
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string' },
                                        name: { type: 'string' }
                                    }
                                }
                            }
                        },
                        page: { type: 'integer' },
                        limit: { type: 'integer' },
                        total_page: { type: 'integer' },
                        message: { type: 'string' },

                    }
                }
            },
             security: [
            {
                "ApiToken": []
            }
        ]
        },
    },
    {
        method: 'GET',
        url: '/api/articles/published',
        handler: articles.findAllPublished,
        schema: {
            description: 'Get all published articles. You can use queryString (?page=1&size=10) for pagination.',
            summary: 'Get all published articles',
            tags: ['Article'],
            response: {
                201: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        payload: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                description: { type: 'string' },
                                published: { type: 'boolean' },
                                image: { type: 'string' },
                                category: {
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string' },
                                        name: { type: 'string' }
                                    }
                                },
                                author: {
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string' },
                                        name: { type: 'string' },
                                        email: { type: 'string' }
                                    }
                                }
                            }
                        },
                        page: { type: 'integer' },
                        limit: { type: 'integer' },
                        total_page: { type: 'integer' },
                        message: { type: 'string' },

                    }
                }
            },
             security: [
            {
                "ApiToken": []
            }
        ]
        },
    },
    {
        method: 'GET',
        url: '/api/articles/:id',
        handler: articles.findOne,
        schema: {
            description: 'Get Article By ID.',
            summary: 'Get a Article By ID',
            tags: ['Article'],
            params: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'Article id'
                    }
                }
            },
            response: {
                201: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        payload: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                description: { type: 'string' },
                                published: { type: 'boolean' },
                                image: { type: 'string' },
                                category: {
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string' },
                                        name: { type: 'string' }
                                    }
                                }
                            }
                        },
                        page: { type: 'integer' },
                        limit: { type: 'integer' },
                        total_page: { type: 'integer' },
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
        url: '/api/articles',
        preHandler: [verifyToken],
        handler: articles.create,
        schema: {
            description: 'post Article',
            summary: 'Add new Article',
            tags: ['Article'],
            body: {
                type: 'object',
                properties: {
                    title: { type: 'string' },
                    description: { type: 'string' },
                    published: { type: 'boolean' },
                    image: { type: 'string' },
                    category: { type: 'string' }
                },
            },
            response: {
                201: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        payload: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                description: { type: 'string' },
                                published: { type: 'boolean' },
                                image: { type: 'string' },
                                category: {
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string' },
                                        name: { type: 'string' }
                                    }
                                }
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
        url: '/api/articles/:id',
        preHandler: [verifyToken],
        handler: articles.update,
        schema: {
            description: 'Update Article By ID',
            summary: 'Update Article by ID',
            tags: ['Article'],
            params: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'Article id'
                    }
                }
            },
            body: {
                type: 'object',
                properties: {
                    title: { type: 'string' },
                    description: { type: 'string' },
                    published: { type: 'boolean' },
                    image: { type: 'string' },
                },
            },
            response: {
                201: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        payload: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                description: { type: 'string' },
                                published: { type: 'boolean' },
                                image: { type: 'string' },
                                category: {
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string' },
                                        name: { type: 'string' }
                                    }
                                }
                            }
                        },
                        page: { type: 'integer' },
                        limit: { type: 'integer' },
                        total_page: { type: 'integer' },
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
        url: '/api/articles/:id',
        preHandler: [verifyToken],
        handler: articles.delete,
        schema: {
            description: 'Delete Article By ID',
            summary: 'Delete Article by ID',
            tags: ['Article'],
            params: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'Article id'
                    }
                }
            },
            response: {
                201: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        payload: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                description: { type: 'string' },
                                published: { type: 'boolean' },
                                image: { type: 'string' },
                                category: {
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string' },
                                        name: { type: 'string' }
                                    }
                                }
                            }
                        },
                        page: { type: 'integer' },
                        limit: { type: 'integer' },
                        total_page: { type: 'integer' },
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

module.exports = articleRoutes











