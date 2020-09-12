const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Concert = require('../../models/concert.model')

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/concerts', () => {

  before(async () => {
    const testConcertOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '/img/uploads/1fsd324fsdg.jpg' });
    await testConcertOne.save();
  });
  
  after(async () => {
    await Concert.deleteMany();
  });

  it('/:id should update chosen document and return success', async () => {
    const res = await request(server).put('/api/concerts/5d9f1140f10a81216cfd4408').send({ performer: 'Updated!' });
    const newConcert = await Concert.findOne({ performer: 'Updated!' });
    expect(res.status).to.be.equal(200);
    expect(newConcert).to.not.be.null;
    expect(res.body).to.not.be.null;
  });

});