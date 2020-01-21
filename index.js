const hapi = require('@hapi/hapi')
const {routes} = require('./src/routes/routes')

const start = async () => {
    const server = hapi.server({
        port: process.env.PORT || 3333,
        host: '0.0.0.0'
    })

    server.route(routes);
    await server.start();
    console.log('Server running at:', server.info.uri);
};

start();