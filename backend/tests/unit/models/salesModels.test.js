// const chai = require('chai');
// const sinon = require('sinon');
// const { salesModels } = require('../../../src/models');
// const { salesMock, saleById } = require('../mocks/mockSales');

// const { expect } = chai;

// describe('Sales Models', function () {
//   describe('getAllModels', function () {
//     it('deve retornar um array de vendas', async function () {
//       const getAllModelsStub = sinon.stub(salesModels, 'getAllModels');
//       getAllModelsStub.returns(salesMock);

//       const sales = await salesModels.getAllModels();

//       chai.assert.isTrue(getAllModelsStub.calledOnce);

//       expect(sales).to.deep.equal(salesMock);

//       getAllModelsStub.restore();
//     });
//   });

//   describe('getByIdModels', function () {
//     it('deve retornar uma única venda por ID', async function () {
//       const getByIdModelsStub = sinon.stub(salesModels, 'getByIdModels');
//       getByIdModelsStub.withArgs(1).returns(saleById);

//       const sale = await salesModels.getByIdModels(1);

//       chai.assert.isTrue(getByIdModelsStub.calledOnceWith(1));

//       expect(sale).to.deep.equal(saleById);

//       getByIdModelsStub.restore();
//     });
//   });
// });
