const hapi = require('@hapi/hapi')
const { routes } = require('./src/routes/routes')
const Path = require('path')
const Qs = require('qs')

const start = async () => {
    const server = hapi.server({
        port: process.env.PORT || 3333,
        host: '0.0.0.0',
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'src/img')
            }
        },
        query: {
            parser: (query) => Qs.parse(query)
        }
    })

    server.route(routes);
    await server.start();
    console.log('Server running at:', server.info.uri);
};

start();