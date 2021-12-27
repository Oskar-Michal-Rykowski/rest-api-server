const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Concert = require('../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /concerts', () => {
  before(async () => {
    const testConcertOne = new Concert({
      _id: '5d9f1140f10a81216cfd4408',
      performer: 'John Doe',
      genre: 'Rock',
      price: 25,
      day: 1,
      image: '/img/uploads/1fsd324fsdg.jpg',
    });
    await testConcertOne.save();

    const testConcertTwo = new Concert({
      _id: '5d9f1140f10a81216cfd4409',
      performer: 'Rebekah Parker',
      genre: 'R&B',
      price: 25,
      day: 1,
      image: '/img/uploads/2f342s4fsdg.jpg',
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
        '/api/concerts/5d9f1140f10a81216cfd4408'
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
      const res = await request(server).get('/api/concerts/performer/John Doe');
      const res2 = await request(server).get('/api/concerts/performer/bobi');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.not.be.null;
      expect(res.body.length).to.be.equal(1);
      expect(res2.status).to.be.equal(404);
    } catch (e) {
      console.log(e);
    }
  });

  it('/genre/:genre', async () => {
    try {
      const res = await request(server).get('/api/concerts/genre/Rock');
      const res2 = await request(server).get('/api/concerts/genre/jazz');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(1);
      expect(res.body).to.not.be.null;
      expect(res2.status).to.be.equal(404);
    } catch (e) {
      console.log(e);
    }
  });

  it('/concerts/price/:price_min/:price_max', async () => {
    try {
      const res = await request(server).get('/api/concerts/price/20/30');
      const res2 = await request(server).get('/api/concerts/price/10/20');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(2);
      expect(res.body).to.not.be.null;
      expect(res2.status).to.be.equal(404);
    } catch (e) {
      console.log(e);
    }
  });

  it('/concerts/day/:day', async () => {
    try {
      const res = await request(server).get('/api/concerts/day/1');
      const res2 = await request(server).get('/api/concerts/day/2');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(2);
      expect(res.body).to.not.be.null;
      expect(res2.status).to.be.equal(404);
    } catch (e) {
      console.log(e);
    }
  });

  after(async () => {
    await Concert.deleteMany();
  });
});
