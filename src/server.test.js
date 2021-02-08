const app = require('./server')
const supertest = require('supertest');
const { ensureDir } = require('fs-extra');

const request = supertest(app)
const portTests = 3002;
const testServer = app.listen(portTests)

beforeAll(done => {
  done()
})

afterAll(done => {
  testServer.close()
  done()
})

// depends on in-memory results currently (TBD postgres, kv store).
let sortedResults = [
  'polyurethane',
  'lacquer nitrocellulose',
  'lacquer acrylic',
  'c neck',
  'c chunky neck',
  'd neck',
  'v neck',
  'u neck',
  'baseball bat neck',
  'mint',
  'excellent condition',
  'very good condition',
  'good condition',
  'fair condition',
  'poor condition'
];

describe('GET /typeahead', () => {
  it('Gets the test endpoint', async done => {
    const res = await request.get('/typeahead')
    done()
  })

  it('Returns an ok response', async done => {
    const response = await request.get('/typeahead')
    expect(response.status).toBe(200)
    done()
  })

  it('Returns expected data', async done => {
    const response = await request.get('/typeahead')
    expect(response.body).toEqual(sortedResults)
    done()
  })
})

describe('POST /add', () => {
  it('Gets the test endpoint', async done => {
    const res = await request.post('/add')
    done()
  })

  it('Returns an ok response', async done => {
    const response = await request.get('/typeahead')
    expect(response.status).toBe(200)
    done()
  })

  it('Returns expected data', async done => {
    const response = await request.get('/typeahead')
    expect(response.body).toEqual(sortedResults)
    done()
  })
})

/* Note Supertest w/o a framework, some more granular stuff
request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });
*/
