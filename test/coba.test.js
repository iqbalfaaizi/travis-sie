'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('./server_test');

describe('GET /', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const injectOptions = {
            method: 'get',
            url: '/'
        }
        const res = await server.inject(injectOptions);
        expect(res.statusCode).to.equal(200);
    });
});