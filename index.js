'use srict'
const Hapi = require('@hapi/hapi')
const { routes } = require('./src/routes/routes')
const Path = require('path')
const Qs = require('qs')
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Swagger = require('./src/plugins/swagger');


const init = async() => {
    const server = Hapi.server({
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
    });
    const plugins = [Inert, Vision, Swagger];
    
    await server.route(routes);
    await server.register(plugins);
    await server.start();
    console.log('Server running at:', server.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

/* const start = async () => {
    const plugins = [Inert, Vision, Swagger];
    const server = Hapi.server({
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
    await server.register(plugins);
    await server.start();
    console.log('Server running at:', server.info.uri);
};

start(); */