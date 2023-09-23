const chai = require('chai');
const sinon = require('sinon');
const { salesController } = require('../../../src/controllers');
const salesServices = require('../../../src/services/salesService');

const { assert } = chai;

describe('Sales Controller', function () {
    describe('getAllControler', function () {
        it('deve retornar um array de vendas', async function () {
            const getAllServStub = sinon.stub(salesServices, 'getAllServ');
            const salesMock = [
                {
                    saleId: 1,
                    date: '2023-09-19T15:57:26.000Z',
                    productId: 1,
                    quantity: 5,
                },
            ];
            getAllServStub.returns(salesMock);

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await salesController.getAllControler(req, res);

            assert.isTrue(getAllServStub.calledOnce);
            assert.deepEqual(res.status.firstCall.args, [200]);
            assert.deepEqual(res.json.firstCall.args, [salesMock]);

            getAllServStub.restore();
        });
    });

    describe('getByIdControler', function () {
        it('deve retornar uma única venda por ID', async function () {
            const getByIdServStub = sinon.stub(salesServices, 'getByIdServ');
            const saleId = 1;
            const saleMock = [{
                date: '2023-09-19T15:57:26.000Z',
                productId: 1,
                quantity: 5,
            }];
            getByIdServStub.withArgs(saleId).returns(saleMock);

            const req = { params: { id: saleId } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await salesController.getByIdControler(req, res);

            assert.isTrue(getByIdServStub.calledOnceWith(saleId));
            assert.deepEqual(res.status.firstCall.args, [200]);
            assert.deepEqual(res.json.firstCall.args, [saleMock]);

            getByIdServStub.restore();
        });

        it('deve retornar 404 se a venda não for encontrada', async function () {
            const getByIdServStub = sinon.stub(salesServices, 'getByIdServ');
            getByIdServStub.returns(null);

            const req = { params: { id: '123' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            await salesController.getByIdControler(req, res);

            assert.isTrue(getByIdServStub.calledOnceWith('123'));
            assert.deepEqual(res.status.firstCall.args, [404]);
            assert.deepEqual(res.json.firstCall.args, [{ message: 'Sale not found' }]);

            getByIdServStub.restore();
        });
    });
});