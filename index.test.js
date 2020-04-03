const request = require("supertest");

describe('Test basic server properties.', () => {
    var server;
    beforeEach(() => {
        server = require('./index.js');
    })

    it('should test that the server reacts to post', async () => {
        const res = await request(server).post("/").send();

        setTimeout(() => {
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual("OK");
        }, 2000);        
    });

    afterEach((done) => {
        server.close(done);
    })
});