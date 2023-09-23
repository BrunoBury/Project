const chai = require('chai');
const sinon = require('sinon');
const { productServices } = require('../../../src/services');
const productModels = require('../../../src/models/productModels');

const { expect } = chai;

describe('Product Services', function () {
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

  describe('newProductServ', function () {
    it('deve retornar null se a criação do produto falhar', async function () {
      const productName = 'Novo Produto';
     
      productModelsStub.newProductModels.withArgs(productName).resolves(null);

      const result = await productServices.newProductServ(productName);
       await expect(result).to.be.null;
    });
  });
  
  describe('updateProductServ', function () {
    it('deve atualizar um produto existente', async function () {
      const existingProduct = { id: 1, name: 'Produto Antigo' };
      const updatedProduct = { id: 1, name: 'Novo Nome do Produto' };
      const productId = 1;
     
      productModelsStub.getByIdModels.withArgs(productId).resolves(existingProduct);

      productModelsStub.updateProductModels.withArgs(productId, 'Novo Nome do Produto').resolves(updatedProduct);
      
      const result = await productServices.updateProductServ(productId, 'Novo Nome do Produto');
     
      expect(result).to.deep.equal(updatedProduct);
    });

    it('deve retornar null para um produto inexistente', async function () {
      const productId = 999; 

      productModelsStub.getByIdModels.withArgs(productId).resolves(null);

      const result = await productServices.updateProductServ(productId, 'Novo Nome do Produto');
     
      await expect(result).to.be.null;
    });
  });

  describe('deleteProductServ', function () {
    it('deve retornar null se a exclusão do produto falhar', async function () {
      const productId = 1;
  
      productModelsStub.deleteProductModels.withArgs(productId).resolves(null);
  
      const result = await productServices.deleteProductServ(productId);
      
      await expect(result).to.be.null;
    });
  });
});
