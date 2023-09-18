const chai = require('chai');
const sinon = require('sinon');
const { productController } = require('../../../src/controllers');
const productServices = require('../../../src/services/productService');

describe('Controllers', function () {
  let req; 
  let res;
  let productServicesStub;

  beforeEach(function () {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    productServicesStub = sinon.stub(productServices); 
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('getAllControler', function () {
    it('retorna todos produtos', async function () {
      const productsMock = [{ id: 1, name: 'Produto 1' }, { id: 2, name: 'Produto 2' }];
      productServicesStub.getAllServ.resolves(productsMock);

      await productController.getAllControler(req, res);

      const statusCalledWith200 = res.status.calledWith(200);
      const jsonCalledWithProductsMock = res.json.calledWith(productsMock);
  
      chai.assert.isTrue(statusCalledWith200);
      chai.assert.isTrue(jsonCalledWithProductsMock);
    });
  });

  describe('getByIdControler', function () {
    it('retorna produto pelo id', async function () {
      const productByIdMock = { id: 1, name: 'Produto 1' };
      const id = 1;
      productServicesStub.getByIdServ.resolves(productByIdMock);

      req.params = { id };

      await productController.getByIdControler(req, res);

      chai.assert.isTrue(res.status.calledWith(200));
      chai.assert.isTrue(res.json.calledWith(productByIdMock));
    });

    it('retorna erro 404 se o produto não for encontrado', async function () {
      const id = 1;
      productServicesStub.getByIdServ.resolves(null);

      req.params = { id };

      await productController.getByIdControler(req, res);

      chai.assert.isTrue(res.status.calledWith(404));
      chai.assert.isTrue(res.json.calledWith({ message: 'Product not found' }));
    });
  });
});
