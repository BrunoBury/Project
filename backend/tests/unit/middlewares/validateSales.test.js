const chai = require('chai');
const sinon = require('sinon');
const {
    validateProductId,
    validateProductQuantity,
    validateQuantityGreaterThanZero,
    validateProductExist,
} = require('../../../src/middlewares/validateSales');
const { productModels } = require('../../../src/models');

describe('validateSales Middleware', function () {
    let req;
    let res;
    let next;
    let productModelsStub;

    beforeEach(function () {
        req = {
            body: [
                { productId: 1, quantity: 5 },
                { productId: 2, quantity: 10 },
            ],
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        next = sinon.stub();

        productModelsStub = sinon.stub();
        productModelsStub.withArgs(1).resolves({ id: 1, name: 'Produto 1' });
        productModelsStub.withArgs(2).resolves({ id: 2, name: 'Produto 2' });

        sinon.stub(productModels, 'getAllModels').resolves([
            { id: 1, name: 'Produto 1' },
            { id: 2, name: 'Produto 2' },
        ]);

        sinon.stub(productModels, 'getByIdModels').callsFake(productModelsStub);
    });

    afterEach(function () {
        sinon.restore();
    });

    it('deve chamar next() se todas as validações passarem', async function () {
        await validateProductId(req, res, next);
        await validateProductQuantity(req, res, next);
        await validateQuantityGreaterThanZero(req, res, next);
        await validateProductExist(req, res, next);

        chai.assert.isTrue(next.called);
    });

    it('deve retornar status 400 se "productId" estiver ausente em algum produto', async function () {
        delete req.body[0].productId;

        await validateProductId(req, res, next);

        chai.assert.isTrue(res.status.calledWith(400));
        chai.assert.isTrue(res.json.calledWith({ message: '"productId" is required' }));
        chai.assert.isTrue(next.notCalled);
    });

    it('deve retornar status 400 se "quantity" estiver ausente em algum produto', async function () {
        delete req.body[0].quantity;

        await validateProductQuantity(req, res, next);

        chai.assert.isTrue(res.status.calledWith(400));
        chai.assert.isTrue(res.json.calledWith({ message: '"quantity" is required' }));
        chai.assert.isTrue(next.notCalled);
    });

    it('deve retornar status 422 se "quantity" for menor ou igual a zero', async function () {
        req.body[0].quantity = 0;

        await validateQuantityGreaterThanZero(req, res, next);

        chai.assert.isTrue(res.status.calledWith(422));
        chai.assert.isTrue(res.json.calledWith({ message: '"quantity" must be greater than or equal to 1' }));
        chai.assert.isTrue(next.notCalled);
    });

    it('deve retornar status 404 se "productId" não existir no banco de dados', async function () {
        req.body[0].productId = 999;

        await validateProductExist(req, res, next);

        chai.assert.isTrue(res.status.calledWith(404));
        chai.assert.isTrue(res.json.calledWith({ message: 'Product not found' }));
        chai.assert.isTrue(next.notCalled);
    });
});
