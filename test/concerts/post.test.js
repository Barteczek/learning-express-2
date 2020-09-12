const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Concert = require('../../models/concert.model')

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /api/concerts', () => {

  after(async () => {
    await Concert.deleteMany();
  });

  it('/ should insert new document to db and return success', async () => {
    const res = await request(server).post('/api/concerts').send({ performer: 'Test Performer', genre: 'Pop', price: 20, day: 2, image: 'image' });
    const newConcert = await Concert.findOne({ performer: 'Test Performer' });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(newConcert).to.not.be.null;
  });

});