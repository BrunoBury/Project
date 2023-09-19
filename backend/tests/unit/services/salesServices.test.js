const chai = require('chai');
const sinon = require('sinon');
const { salesServices } = require('../../../src/services');
const salesModels = require('../../../src/models/salesModels');

const { expect } = chai;

describe('Sales Services', function () {
  describe('getAllServ', function () {
    it('deve retornar um array de vendas', async function () {
      const getAllModelsStub = sinon.stub(salesModels, 'getAllModels');
      const salesMock = [
        {
          saleId: 1,
          date: '2023-09-19T15:57:26.000Z',
          productId: 1,
          quantity: 5,
        },
      ];
      getAllModelsStub.returns(salesMock);

      const sales = await salesServices.getAllServ();

      chai.assert.isTrue(getAllModelsStub.calledOnce);

      expect(sales).to.deep.equal(salesMock);

      getAllModelsStub.restore();
    });
  });

  describe('getByIdServ', function () {
    it('deve retornar uma única venda por ID', async function () {
      const getByIdModelsStub = sinon.stub(salesModels, 'getByIdModels');
      const saleId = 1;
      const saleMock = {
        saleId,
        date: '2023-09-19T15:57:26.000Z',
        productId: 1,
        quantity: 5,
      };
      getByIdModelsStub.withArgs(saleId).returns(saleMock);

      const sale = await salesServices.getByIdServ(saleId);

      chai.assert.isTrue(getByIdModelsStub.calledOnceWith(1));
      expect(sale).to.deep.equal(saleMock);

      getByIdModelsStub.restore();
    });
  });
});
