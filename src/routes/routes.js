'use strict'

const routes = [
{
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
        return h.response('Hello ladies').code(200)
    }
}]

module.exports = { routes }
