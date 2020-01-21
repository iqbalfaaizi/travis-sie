const hapi = require('@hapi/hapi')
const {routes} = require('./src/routes/routes')

exports.start = async () => {
    const server = hapi.server({
        port: 6161,
        host: 'localhost'
    })

    server.route(routes);
    await server.start();
    console.log('Server running at:', server.info.uri);
};

// start();