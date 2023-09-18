const chai = require('chai');
const sinon = require('sinon');
const { productModels } = require('../../../src/models');
const { productsMock, productById } = require('../mocks/mockProducts');

const { expect } = chai;

describe('Models', function () {
  let connectiondb;

  beforeEach(function () {
    connectiondb = {
      execute: sinon.stub(),
    };
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('getAllModels', function () {
    it('retorna todos produtos', async function () {
      connectiondb.execute.resolves([productsMock]);

      const result = await productModels.getAllModels(connectiondb);
      expect(result).to.deep.equal(productsMock);
    });
  });

  describe('getByIdModels', function () {
    it('retorna produto pelo id', async function () {
      connectiondb.execute.resolves([productById]);

      const id = 1;
      const result = await productModels.getByIdModels(id, connectiondb);
      expect(result).to.deep.equal(productById);
    });
  });
});
