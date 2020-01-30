'use strict'
const { signup, login } = require('../handlers/auth')
const { addProduct, getProduct, addCart, getCart } = require('../handlers/product')
const base_path = '/api/v1'
const Joi = require('@hapi/joi')

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            return h.response({message: 'Hello ladies'}).code(200)
        }
    }, {
        method: 'POST',
        path: `${base_path}/signup`,
        options: {
            handler: signup,
            description: 'Post Sign Up',
            notes: 'Returns a post sign up',
            tags: ['api', 'user'],
            validate: {
                payload: Joi.object({
                    email: Joi.string().required(),
                    password: Joi.string().required()
                })
            }
        }
    }, {
        method: 'POST',
        path: `${base_path}/login`,
        options: {
            handler: login,
            description: 'Post Log in',
            notes: 'Returns a post Login',
            tags: ['api', 'user'],
            validate: {
                payload: Joi.object({
                    email: Joi.string().required(),
                    password: Joi.string().required()
                })
            }
        }
    }, {
        method: 'POST',
        path: `${base_path}/addproduct`,
        handler: addProduct
    }, {
        method: 'GET',
        path: `${base_path}/getproduct`,
        options: {
            handler: getProduct,
            description: 'Get Product',
            notes: 'Returns a get product',
            tags: ['api', 'product'],
        }
    }, {
        method: 'PUT',
        path: `${base_path}/addcart/{email}`,
        options: {
            handler: addCart,
            description: 'Add to Cart',
            notes: 'Add a cart item by the email passed in the path',
            tags: ['api', 'cart'], // ADD THIS TAG
            validate: {
                params: Joi.object({
                    email: Joi.string()
                        .required()
                })
            }
        },
    }, {
        method: 'GET',
        path: `${base_path}/getcart/{email}`,
        options: {
            handler: getCart,
            description: 'Get Cart',
            notes: 'Returns a cart item by the email passed in the path',
            tags: ['api', 'cart'], // ADD THIS TAG
            validate: {
                params: Joi.object({
                    email: Joi.string()
                        .required()
                })
            }
        },
    }
]

module.exports = { routes }
