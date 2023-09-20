const chai = require('chai');
const sinon = require('sinon');
const validateProductName = require('../../../src/middlewares/validateProduct');

describe('validateProductName Middleware', function () {
    let req;
    let res;
    let next;
  
    beforeEach(function () {
      req = {
        body: {
          name: 'produto1',
        },
      };
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      next = sinon.stub();
    });
  
    afterEach(function () {
      sinon.restore();
    });
  
    it('deve chamar next() se o nome for válido', function () {
      validateProductName(req, res, next);
  
      chai.assert.isTrue(next.called);
    });
  
    it('deve retornar status 400 se o nome estiver ausente', function () {
      req.body.name = undefined;
      validateProductName(req, res, next);
     
      chai.assert.isTrue(res.status.calledWith(400));
    
      chai.assert.isTrue(res.json.calledWith({ message: '"name" is required' }));
      
      chai.assert.isTrue(next.notCalled);
    });
  
    it('deve retornar status 422 se o nome tiver menos de 5 caracteres', function () {
      req.body.name = 'name';
      validateProductName(req, res, next);
     
      chai.assert.isTrue(res.status.calledWith(422));
     
      chai.assert.isTrue(res.json.calledWith({ message: '"name" length must be at least 5 characters long' }));
      
      chai.assert.isTrue(next.notCalled);
    });
  });