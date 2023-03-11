const assert = require('assert');
const sinon = require('sinon');
const Calculator = require('../public/javascripts/Calculator');

describe('Calculator', function () {
  let calculator;

  beforeEach(function () {
    calculator = new Calculator();
  });

  describe('#init()', function () {
    it('Initialization - fetched successfully', async function () {
      // Stub the fetchExchangeRate method to return a fixed value
      const fetchStub = sinon.stub(calculator, 'fetchExchangeRate').resolves(4.5);

      await calculator.init('GBP');

      assert.strictEqual(calculator.getExchangeRate(), 4.5);

      fetchStub.restore();
    });

    it('Initialization - fetched unsuccessfully', async function () {
      // Stub the fetchExchangeRate method to throw an error
      const fetchStub = sinon.stub(calculator, 'fetchExchangeRate').rejects(new Error('Failed to fetch exchange rate'));

      await assert.rejects(calculator.init('USD'), {
        message: 'Failed to fetch exchange rate'
      });

      fetchStub.restore();
    });
  });

  describe('#calculateFrom()', function () {
    it('Calculate from - correct (positive) input', function () {
      // Set the exchange rate manually
      calculator.setExchangeRate(4.5);

      const result = calculator.calculateFrom(10);

      assert.strictEqual(result, 45);
    });

    it('Calculate from - correct (zero) input', function () {
      // Set the exchange rate manually
      calculator.setExchangeRate(4.5);

      const result = calculator.calculateFrom(0);

      assert.strictEqual(result, 0);
    });

    it('Calculate from - incorrect (negative) input', function () {
      calculator.setExchangeRate(4.5);

      assert.throws(() => calculator.calculateFrom(-10), {
        message: 'You cannot calculate exchange values for negative numbers!'
      });
    });
  });

  describe('#calculateTo()', function () {
    it('Calculate to - correct (positive) input', function () {
      calculator.setExchangeRate(4.5);

      const result = calculator.calculateTo(45);

      assert.strictEqual(result, 10);
    });

    it('Calculate to - correct (zero) input', function () {
      calculator.setExchangeRate(4.5);

      const result = calculator.calculateTo(0);

      assert.strictEqual(result, 0);
    });

    it('Calculate to - correct (negative) input', function () {
      calculator.setExchangeRate(4.5);

      assert.throws(() => calculator.calculateTo(-45), {
        message: 'You cannot calculate exchange values for negative numbers!'
      });
    });
  });

  describe('#setExchangeRate()', function () {
    it('Set echange rate - numeric value', function () {
      calculator.setExchangeRate(4.5);

      assert.strictEqual(calculator.getExchangeRate(), 4.5);
    });

    it('Set exchange rate - error (not a number)', function () {
      assert.throws(() => calculator.setExchangeRate('abc'), {
        message: 'Invalid exchange rate expression (NaN)!'
      });
    });
  });
});
