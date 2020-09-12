const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Concert = require('../../models/concert.model')

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /concerts/performer/:performer', () => {

  before(async () => {
    const testConcertOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '/img/uploads/1fsd324fsdg.jpg' });
    await testConcertOne.save();
  
    const testConcertTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', performer: 'Rebekah Parker', genre: 'R&B', price: 25, day: 1, image: '/img/uploads/2f342s4fsdg.jpg' });
    await testConcertTwo.save();
  });
  
  after(async () => {
    await Concert.deleteMany();
  });

  it('/:performer should return concert by :performer', async () => {
    const res = await request(server).get('/concerts/performer/John_Doe');
    console.log(res.body)
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  
});
