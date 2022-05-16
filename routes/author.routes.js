const authors = require("../controllers/author.controller");
const documentation = require("../models/author.model")

const authorRoutes = [
    {
        method: 'POST',
        url: '/api/login',
        handler: authors.login,
        schema: {
            description: 'Login as author',
            tags: ['Authentication'],
            body: {
                type: 'object',
                properties: {
                    username: { type: 'string' },   
                    password: { type: 'string' },
                },
            },
            response: {
                201: {
                    description: 'successfully logged in',
                    type: 'object',
                    properties: {
                        payload: {
                            type: 'object',
                            properties: {
                                username: { type: 'string' },
                                email: { type: 'string'},
                                token: {type: 'string'}
                            }
                        },
                        message: { type: 'string' },
                    }
                }
            }
        }
    },
    {
        method: 'POST',
        url: '/api/register',
        handler: authors.create,
        schema: {
            description: 'Register Author',
            tags: ['Authentication'],
            body: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    email: { type: 'string'},
                    password: { type: 'string' },
                },
            },
            response: {
                201: {
                    description: 'successfully registered',
                    type: 'object',
                    properties: {
                        payload: {
                            type: 'object',
                            properties: {
                                username: { type: 'string' },
                            }
                        },
                        message: { type: 'string' },

                    }
                }
            }
        }
    }
]

module.exports = authorRoutes











