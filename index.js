const hapi = require('@hapi/hapi')
const {routes} = require('./src/routes/routes')

const start = async () => {
    const server = hapi.server({
        port: 3333,
        host: 'localhost'
    })

    server.route(routes);
    await server.start();
    console.log('Server running at:', server.info.uri);
};

start();