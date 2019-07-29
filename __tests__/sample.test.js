const app = require('../src/app');
const request = require('supertest');

describe('App', () => {
    it('should run', async() => {
        const resp = await request(app).get('/');
        expect(resp.status).toBe(200);
    })
})