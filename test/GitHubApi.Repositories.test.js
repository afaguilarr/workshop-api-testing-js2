const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');
const chai = require('chai');

const expectation = chai.expect;
const expect = expectation;

describe('First Api Tests', () => {
  it('should have as name: Alejandro Perdomo, company: PSL and location: Colombia', () =>
    agent.get('https://api.github.com/users/aperdomob').then((response) => {
      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.name).to.equal('Alejandro Perdomo');
      expect(response.body.company).to.equal('PSL');
      expect(response.body.location).to.equal('Colombia');
    }));

  it('should have a repo called jasmine-awesome-report', () => {
    const query = {
      q: 'jasmine-awesome-report'
    };
    return agent.get('https://api.github.com/search/repositories')
      .query(query)
      .then((response) => {
        const found = (response.body.items).find(repo => repo.name === 'jasmine-awesome-report');
        expect(response.status).to.equal(statusCode.OK);
        expect(found.name).to.equal('jasmine-awesome-report');
        expect(found.private).to.equal(false);
        expect(found.description).to.equal('An awesome html report for Jasmine');
        console.log(found.html_url);
      });
  });

  it('should have a readme.md', () => {
    agent.get('api.github.com/repos/aperdomob/jasmine-awesome-report/contents/')
      .then((response) => {
        // console.log(response.body);
        const found = (response.body).find(file => file.name === 'README.md');
        console.log(found.sha);
        expect(response.status).to.equal(statusCode.OK);
        expect(found.name).to.equal('READMvjhvhvE.md');
        expect(found.path).to.equal('README.md');
        expect(found.sha).to.equal('9bcf2527fd5cd12ce18e457581319a349f9a56f3');
      });
  });
});
