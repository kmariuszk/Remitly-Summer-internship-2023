// Retrieve html elements
const currencyFromValueElement = document.getElementById("currency-from-value");
const currencyToValueElement = document.getElementById("currency-to-value");
const currencyFromAbbreviationElement = document.getElementById("currency-from-abbreviation");
const currencyToAbbreviationElement = document.getElementById("currency-to-abbreviation");
const descriptionFromAbbreviationElement = document.getElementById("description-exchange-from-abbreviation")
const descriptionToAbbreviationElement = document.getElementById("description-exchange-to-abbreviation")
const flagFromElement = document.getElementById("calculator-flag-from-icon");
const flagToElement = document.getElementById("calculator-flag-to-icon");
const exchangeRateElement = document.getElementById("exchange-rate-value");

// Map currency abbreviations to flag images
const currenciesToFlags = {
    PLN: "images/pl-flag.svg",
    GBP: "images/gb-flag.svg",
    USD: "images/us-flag.svg"
}

/**
 * Function initializing the application (creating instance of calculator, adding event listeners enabling dynamic changes).
 */
async function initialize() {
    const calculator = new Calculator();

    try {
        await calculator.init("GBP");
    } catch (error) {
        console.log(error);
    }

    /**
     * Updates interface value with a rounded value to two decimal points.
     * 
     * @param { HTMLElement } element - HTML element to be updated.
     * @param { number } number - Value to be rounded and inserted.
     */
    function updateInterfaceValue(element, number) {
        const roundedValue = (Math.round(number * 100) / 100).toFixed(2)

        element.value = roundedValue;
    }

    /**
     * Updates exchange rate information in interface with a rounded value to two decimal points.
     * 
     * @param { HTMLElement } element - HTML element to be updated.
     * @param { number } number - Value to be rounded and inserted.
     */
    function updateInterfaceExchangeRate(element, number) {
        const roundedValue = (Math.round(number * 100) / 100).toFixed(2)

        element.innerText = roundedValue;
    }

    // Listeners for calculator value inputs (automatically updates respective value in the interface)
    currencyFromValueElement.addEventListener("keyup", () => {
        try {
            const calculatedValue = calculator.calculateFrom(currencyFromValueElement.value);
            updateInterfaceValue(currencyToValueElement, calculatedValue);
        } catch (error) {
            console.log(error);
        }
    });

    currencyToValueElement.addEventListener("keyup", () => {
        try {
            const calculatedValue = calculator.calculateTo(currencyToValueElement.value);
            updateInterfaceValue(currencyFromValueElement, calculatedValue);
        } catch (error) {
            console.log(error);
        }
    });

    // Listeners for change of currencies (automatically updates respective calue and information about the exchange rate in the interface)
    currencyFromAbbreviationElement.addEventListener("input", async () => {
        let exchangeRate = 0.0;

        try {
            exchangeRate = await calculator.fetchExchangeRate(currencyFromAbbreviationElement.value);
        } catch (error) {
            console.log(error);
        }

        // Update calculator's exchange rate and update it in the interface
        calculator.setExchangeRate(exchangeRate);
        updateInterfaceExchangeRate(exchangeRateElement, calculator.exchangeRate);

        // Recalculate value of the target currency and update it in the interface
        const calculatedValue = calculator.calculateFrom(currencyFromValueElement.value);
        updateInterfaceValue(currencyToValueElement, calculatedValue);

        // Update the flag of the source currency and the description of the calculator
        flagFromElement.src = currenciesToFlags[currencyFromAbbreviationElement.value];
        descriptionFromAbbreviationElement.textContent = currencyFromAbbreviationElement.value;
    })

    updateInterfaceExchangeRate(exchangeRateElement, calculator.getExchangeRate());
}

initialize();