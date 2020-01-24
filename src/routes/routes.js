'use strict'
const { signup, login } = require('../handlers/auth')
const { addProduct, getProduct } = require('../handlers/product')
const base_path = '/api/v1'

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
        handler: signup
    }, {
        method: 'POST',
        path: `${base_path}/login`,
        handler: login
    }, {
        method: 'POST',
        path: `${base_path}/addproduct`,
        handler: addProduct
    }, {
        method: 'GET',
        path: `${base_path}/getproduct`,
        handler: getProduct
    }
]

module.exports = { routes }
