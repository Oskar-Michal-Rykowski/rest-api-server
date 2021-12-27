const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /concerts', () => {
  before(async () => {
    const testConcertOne = new Concert({
      _id: '61c99cfa759e349d58b7a88z',
      performer: 'Jan Kowalski',
      genre: 'Rock',
      price: 20,
      day: 1,
      image: '/img/uploads/1234',
    });
    await testConcertOne.save();

    const testConcertTwo = new Concert({
      _id: '61c99cfa759e349d58b7a69z',
      performer: 'Anna Kowalska',
      genre: 'Metal',
      price: 25,
      day: 1,
      image: '/img/uploads/4321',
    });
    await testConcertTwo.save();
  });

  it('/ should return all concerts', async () => {
    try {
      const res = await request(server).get('/api/concerts');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(2);
    } catch (e) {
      console.log(e);
    }
  });

  it('/:id should return concert by id', async () => {
    try {
      const res = await request(server).get(
        '/api/concerts/61c99cfa759e349d58b7a88z'
      );
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.not.be.null;
    } catch (e) {
      console.log(e);
    }
  });

  it('/performer/:performer', async () => {
    try {
      const resOne = await request(server).get(
        '/api/concerts/performer/Jan%20Kowalski'
      );
      const resTwo = await request(server).get('/api/concerts/performer/zzzz');
      expect(resOne.status).to.be.equal(200);
      expect(One.body).to.be.an('array');
      expect(One.body).to.not.be.null;
      expect(One.body.length).to.be.equal(1);
      expect(resTwo.status).to.be.equal(404);
    } catch (e) {
      console.log(e);
    }
  });

  it('/genre/:genre', async () => {
    try {
      const resOne = await request(server).get('/api/concerts/genre/metal');
      const resTwo = await request(server).get('/api/concerts/genre/hiphop');
      expect(resOne.status).to.be.equal(200);
      expect(resOne.body).to.be.an('array');
      expect(resOne.body.length).to.be.equal(1);
      expect(resOne.body).to.not.be.null;
      expect(resTwo.status).to.be.equal(404);
    } catch (e) {
      console.log(e);
    }
  });

  it('/concerts/price/:price_min/:price_max', async () => {
    try {
      const resOne = await request(server).get('/api/concerts/price/15/30');
      const resTwo = await request(server).get('/api/concerts/price/40/50');
      expect(resOne.status).to.be.equal(200);
      expect(resOne.body).to.be.an('array');
      expect(resOne.body.length).to.be.equal(2);
      expect(resOne.body).to.not.be.null;
      expect(resTwo.status).to.be.equal(404);
    } catch (e) {
      console.log(e);
    }
  });

  it('/concerts/day/:day', async () => {
    try {
      const resOne = await request(server).get('/api/concerts/day/1');
      const resTwo = await request(server).get('/api/concerts/day/2');
      expect(resOne.status).to.be.equal(200);
      expect(resOne.body).to.be.an('array');
      expect(resOne.body.length).to.be.equal(2);
      expect(resOne.body).to.not.be.null;
      expect(resTwo.status).to.be.equal(404);
    } catch (e) {
      console.log(e);
    }
  });

  after(async () => {
    await Concert.deleteMany();
  });
});
