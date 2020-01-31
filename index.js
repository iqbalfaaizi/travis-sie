'use srict'
const Hapi = require('@hapi/hapi')
const { routes } = require('./src/routes/routes')
const Path = require('path')
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package.json');
const Qs =  require('qs');

const start = async () => {
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

    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: Pack.version,
        },
        grouping: 'tags'
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    server.route(routes);
    await server.register(plugins);
    await server.start();
    console.log('Server running at:', server.info.uri);
};

start();