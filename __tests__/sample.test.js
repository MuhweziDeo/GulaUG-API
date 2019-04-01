const app = require('../src/index');
const request = require('supertest');

describe('App', () => {
    it('should run', async() => {
        const resp = await request(app).get('/');
        expect(resp.status).toBe(200);
    })
})