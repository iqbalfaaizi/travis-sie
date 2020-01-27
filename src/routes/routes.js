'use strict'
const { signup, login } = require('../handlers/auth')
const { addProduct, getProduct, addCart, getCart } = require('../handlers/product')
const base_path = '/api/v1'

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            return h.response('Hello ladies').code(200)
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
    }, {
        method: 'PUT',
        path: `${base_path}/addcart/{email}`,
        handler: addCart
    }, {
        method: 'GET',
        path: `${base_path}/getcart/{email}`,
        handler: getCart
    }
]

module.exports = { routes }
