# Remitly Internship 2023 - Currency Conversion

### Getting Started

To get started with this project, follow the steps below:
1. Clone the project to your local machine
2. Navigate to the project directory
3. Run `npm install` to install all of the dependencies
4. Run `npm start` to start the web server
5. Open a web browser and go to [http://localhost:3000](http://localhost:3000)

### Testing

To run tests for this application run `npm test`.

### Technology Stack

The application is built using:
- HTML/CSS - For building the UI components.
- Express.js - For building the server.
- Mocha - For testing.
- Sinon - For mocking/stubbing external dependencies in tests.

### Expansion

This application can be expanded by adding support for additional currencies. To do this, follow the steps below:
1. Create a new flag image file and save it in the `./public/images` directory.
2. Open the Connector.js file and add the new flag filename to the currenciesToFlags array. The array maps currency abbreviations to flag image filenames. For example, when you want to add 'eur':
```
    const currenciesToFlags = {
        PLN: "images/pl-flag.svg",
        GBP: "images/gb-flag.svg",
        USD: "images/us-flag.svg",
        EUR: "images/eu-flag.svg",
    }
```
3. Open the index.html file in the `./public` directory and add a new option element to the select element with id 'currency-from-abbreviation'. The text content should be the currency name.

```
    <select id="currency-from-abbreviation" class="currency-abbreviation">
        <option value="GBP">GBP</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
    </select>
```

Save all changes and restart the server. The new currency should now be available for conversion.