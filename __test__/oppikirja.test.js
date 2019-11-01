const request = require('supertest');
const app = require('../app');

it('Testaa GET-toimintoa api/topicsista', (done) => {
    request(app)
    .get('/api/topics')
    .expect(200, 'kaikki sujuu toistaiseksi')
    .end((err) => {
        if(err) throw done(err);
        done();
    });
});