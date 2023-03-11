/**
 * A class representing a calculator that calculates amounts based on fetched exchange rates.
 */
class Calculator {
    /**
     * Creates a new instance of the Calculator class with an initial exchange rate of null.
     */
    constructor() {
        this.exchangeRate = null;
    }

    /**
     * Initializes the calculator by fetching the exchange rate for the initial currency.
     * 
     * @param { string } currency - Abbreviation of the initial currency to be fetched.
     * @throws { Error } - If the exchange rate cannot be fetched.
     */
    async init(currency) {
        this.exchangeRate = await this.fetchExchangeRate(currency);
    }

    /**
     * Calculates the amount in the target currency based on the amount in the source currency and the current exchange rate.
     * 
     * @param { number } amountFrom - The amount to be converted.
     * @returns { number } - The calculated amount in the target currency.
     * @throws { Error } - If the amountFrom is a negative number.
     */
    calculateFrom(amountFrom) {
        if (amountFrom < 0) {
            throw new Error("You cannot calculate exchange values for negative numbers!");
        }
        return amountFrom * this.exchangeRate;
    }

    /**
     * Calculates the amount in the source currency based on the amount in the target currency and the current exchange rate.
     * 
     * @param { number } amountTo - The amount to be converted. 
     * @returns { number } - The calculated amount in the source currency.
     * @throws { Error } - If the amountTo is a negative number.
     */
    calculateTo(amountTo) {
        if (amountTo < 0) {
            throw new Error("You cannot calculate exchange values for negative numbers!");
        }
        return amountTo * (1 / this.exchangeRate);
    }

    /**
     * Fetches the exchange rate for the specified currency from an external API.
     * 
     * @param { string } currency - The currency code for which to fetch the exchange rate. 
     * @returns { number } - The exchange rate for the specified currency.
     * @throws { Error } - If the exchange rate cannot be fetched.
     */
    async fetchExchangeRate(currency) {
        const apiUrl = `http://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`;
        let exchangeRate;

        await new Promise((resolve, reject) => {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    exchangeRate = data.rates[0].mid
                    resolve();
                }).catch(error => {
                    reject(error);
                });
        });

        return exchangeRate;
    }

    /**
     * Sets the exchange rate for the calculator.
     * 
     * @param { number } exchangeRate - The exchange rate to be set.
     * @throws { Error } - If the exchange rate expression is not a number.
     */
    setExchangeRate(exchangeRate) {
        if (isNaN(exchangeRate)) {
            throw new Error("Invalid exchange rate expression (NaN)!");
        }

        this.exchangeRate = exchangeRate;
    }

    /**
     * Returns the current exchange rate.
     * @returns { number } - The current exchange rate.
     */
    getExchangeRate() {
        return this.exchangeRate;
    }
}

module.exports = Calculator;