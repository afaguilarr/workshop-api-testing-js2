// 'd0d5765f05f1a535e0f12d55c6a4e44a11833189'
const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');
const { expect } = require('chai');

const urlBase = 'https://api.github.com';
const githubUserName = 'afaguilarr';
const repository = 'workshop-api-testing-js';
// Sin la siguiente lista el travis CI de GitHub no deja que pase los test
process.env.ACCESS_TOKEN = '30a15301c6ac516bf67051dd314485b04bf946dd';

describe('Github Api Test', () => {
  describe('Authentication', () => {
    // console.log(process.env.ACCESS_TOKEN);
    it('Via OAuth2 Tokens by Header', () =>
      agent.get(`${urlBase}/repos/${githubUserName}/${repository}`)
        .auth('token', process.env.ACCESS_TOKEN)
        .then((response) => {
          expect(response.status).to.equal(statusCode.OK);
          expect(response.body.description).equal('This is a Workshop about Api Testing in JavaScript');
        }));
    it('Via OAuth2 Tokens by parameter', () =>
      agent.get(`${urlBase}/repos/${githubUserName}/${repository}`)
        .query(`access_token=${process.env.ACCESS_TOKEN}`)
        .then((response) => {
          expect(response.status).to.equal(statusCode.OK);
          expect(response.body.description).equal('This is a Workshop about Api Testing in JavaScript');
        }));
  });
});
