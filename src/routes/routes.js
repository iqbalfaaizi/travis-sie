'use strict'
const { signup, login, setpin } = require('../handlers/auth')
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
    }
]

module.exports = { routes }
