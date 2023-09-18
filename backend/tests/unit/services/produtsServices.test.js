const chai = require('chai');
const sinon = require('sinon');
const { productServices } = require('../../../src/services');
const productModels = require('../../../src/models/productModels');

const { expect } = chai;

describe('Services', function () {
  let productModelsStub;

  beforeEach(function () {
    productModelsStub = sinon.stub(productModels);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('getAllServ', function () {
    it('retorna todos produtos', async function () {
      const productsMock = [{ id: 1, name: 'Produto 1' }, { id: 2, name: 'Produto 2' }];
      productModelsStub.getAllModels.resolves(productsMock);

      const result = await productServices.getAllServ();
      expect(result).to.deep.equal(productsMock);
    });
  });

  describe('getByIdServ', function () {
    it('retorna produto pelo id', async function () {
      const productByIdMock = { id: 1, name: 'Produto 1' };
      const id = 1;
      productModelsStub.getByIdModels.resolves(productByIdMock);

      const result = await productServices.getByIdServ(id);
      expect(result).to.deep.equal(productByIdMock);
    });
  });
});
