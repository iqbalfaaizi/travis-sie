const HapiSwagger = require('hapi-swagger');
const Package = require('../../package.json');

const swaggerOptions = HapiSwagger.RegisterOptions = {
  info: {
    title: 'Some title',
    version: Package.version
  }
};

module.exports = {plugin: HapiSwagger, options: swaggerOptions}