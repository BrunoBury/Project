const chai = require('chai');
const sinon = require('sinon');
const { productController } = require('../../../src/controllers');
const productServices = require('../../../src/services/productService');

describe('Product Controllers', function () {
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

  describe('updateProductController', function () {
    it('atualiza um produto existente com sucesso', async function () {
      const id = 1;
      const name = 'Novo Nome do Produto';
      const updatedProductMock = { id, name };
      
      productServicesStub.updateProductServ.resolves(updatedProductMock);

      req.params = { id };
      req.body = { name };

      await productController.updateProductController(req, res);

      chai.assert.isTrue(res.status.calledWith(200));
      chai.assert.isTrue(res.json.calledWith(updatedProductMock));
    });

    // it('retorna erro 400 se o campo "id" estiver ausente', async function () {
    //   const name = 'Novo Nome do Produto';

    //   req.body = { name };

    //   await productController.updateProductController(req, res);

    //   chai.assert.isTrue(res.status.calledWith(400));
    //   chai.assert.isTrue(res.json.calledWith({ message: '"id" is required' }));
    // });

    // it('retorna erro 400 se o campo "name" estiver ausente', async function () {
    //   const id = 1;

    //   req.params = { id };

    //   await productController.updateProductController(req, res);

    //   chai.assert.isTrue(res.status.calledWith(400));
    //   chai.assert.isTrue(res.json.calledWith({ message: '"name" is required' }));
    // });

    it('retorna erro 422 se o campo "name" tiver menos de 5 caracteres', async function () {
      const id = 1;
      const name = '1234';

      req.params = { id };
      req.body = { name };

      await productController.updateProductController(req, res);

      chai.assert.isTrue(res.status.calledWith(422));
      chai.assert.isTrue(res.json.calledWith({ message: '"name" length must be at least 5 characters long' }));
    });

    it('retorna erro 404 se o produto não for encontrado', async function () {
      const id = 1;
      const name = 'Novo Nome do Produto';

      productServicesStub.updateProductServ.resolves(null);

      req.params = { id };
      req.body = { name };

      await productController.updateProductController(req, res);

      chai.assert.isTrue(res.status.calledWith(404));
      chai.assert.isTrue(res.json.calledWith({ message: 'Product not found' }));
    });
  });
  
  describe('deleteProductController', function () {
    it('deve excluir um produto existente com sucesso', async function () {
      const id = 1;
      const deletedProductMock = { id };
  
      productServicesStub.deleteProductServ.resolves(deletedProductMock);
  
      req.params = { id };
  
      await productController.deleteProductController(req, res);
  
      chai.assert.isTrue(res.status.calledWith(204));
      chai.assert.isTrue(res.json.calledWith(deletedProductMock));
    });
  
    it('retorna erro 404 se o produto não for encontrado para exclusão', async function () {
      const id = 1;
  
      productServicesStub.deleteProductServ.resolves(null);
  
      req.params = { id };
  
      await productController.deleteProductController(req, res);
  
      chai.assert.isTrue(res.status.calledWith(404));
      chai.assert.isTrue(res.json.calledWith({ message: 'Product not found' }));
    });
  });
});
